import * as React from "react";
import * as ReactDOM from "react-dom";
import * as ReactDataGrid from "react-data-grid";
import * as update from "immutability-helper";
import { RequestFactory, Verb } from "./RequestFactory";

type Item = {
    id: number
}

interface GridProps {
    columns: ReactDataGrid.Column[];
    itemFactory: () => Item;
    requestFactory: RequestFactory;
}

interface GridState {
    items: Item[]
}

export class Grid extends React.Component<GridProps, GridState> {
    public constructor(props: GridProps) {
        super(props);
        this.state = {
            items: null
        };
    }
    public componentDidMount(): void {
        this.reload();
    }
    public render() {
        if (!this.state.items) {
            return null;
        }
        return <ReactDataGrid
            columns={this.props.columns}
            enableCellSelect={true}
            onGridRowsUpdated={e => this.onGridRowsUpdated(e)}
            rowGetter={i => this.rowGetter(i)}
            rowsCount={this.state.items.length}
        />;
    }
    private getColumns() {
        let actionsColumn: ReactDataGrid.Column = {
            name: 'Actions',
            key: '$delete',
            getRowMetaData: (row: Item) => row,
            formatter: ({ dependentValues }) => (
                <span>
                    <button onClick={() => this.deleteRow(dependentValues.id)}>Delete</button>
                </span>
            ),
        };
        return update(this.props.columns, { $push : [actionsColumn]});
    }
    private rowGetter(i: number): Item {
        return this.state.items[i];
    }
    private onGridRowsUpdated(
        { fromRow, toRow, updated }: ReactDataGrid.GridRowsUpdatedEvent
    ) {
        let items: Item[] = this.state.items.slice();
        let requests: Request[] = [];
        for (let i = fromRow; i <= toRow; i++) {
            let rowToUpdate: Item = items[i];
            let updatedRow: Item = update(rowToUpdate, {$merge: updated});
            items[i] = updatedRow;
            let verb: Verb = updatedRow.id ? 'REPLACE' : 'INSERT';
            requests.push(
                this.props.requestFactory.createRequest<Item>(verb, updatedRow)
            );
        }
        this.setState(
            { items },
            () => Promise
                .all(requests.map(request => window.fetch(request)))
                .then(() => this.reload())
        );
    }
    private deleteRow(id: number) {
        let items: Item[] = this.state.items.filter(item => item.id !== id);
        let [deletedItem]: Item[] = this.state.items.filter(item => item.id === id);
        this.setState(
            { items },
            () => window
                .fetch(this.createRequest('DELETE', deletedItem))
                .then(() => this.reload())
        );
    }
    private reload() {
        window.fetch(this.props.requestFactory.createRequest('SELECT'))
            .then(response => response.json())
            .then(items => {
                // Placeholder for the new item.
                items.push(this.props.itemFactory());
                this.setState({ items });
            })
        ;
    }
    private createRequest(verb: Verb, item?: Item): Request {
        return this.props.requestFactory.createRequest<Item>(verb, item);
    }
}
