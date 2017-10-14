import * as React from "react";
import * as ReactDOM from "react-dom";
import * as ReactDataGrid from "react-data-grid";
import * as update from "immutability-helper";
import { RequestFactory } from "./RequestFactory";

type Department = {
    id: number;
    name: string;
}

type DepartmentGridProps = {
    requestFactory: RequestFactory
}

type DepartmentGridState = {
    items: Department[]
}

export class DepartmentGrid extends React.Component<DepartmentGridProps, DepartmentGridState> {
    private columns: ReactDataGrid.Column[];
    public constructor(props: DepartmentGridProps) {
        super(props);
        this.columns = [
            {
                key: "id",
                name: "ID",
                width: 50,
            },
            {
                key: "name",
                name: "Name",
                editable: true,
            },
        ];
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
            columns={this.columns}
            enableCellSelect={true}
            onGridRowsUpdated={e => this.onGridRowsUpdated(e)}
            rowGetter={i => this.rowGetter(i)}
            rowsCount={this.state.items.length}
        />;
    }
    private rowGetter(i: number): Department {
        return this.state.items[i];
    }
    private onGridRowsUpdated(
        { fromRow, toRow, updated }: ReactDataGrid.GridRowsUpdatedEvent
    ) {
        let items = this.state.items.slice();
        let requests: Request[] = [];
        for (let i = fromRow; i <= toRow; i++) {
            let rowToUpdate = items[i];
            let updatedRow = update(rowToUpdate, {$merge: updated});
            items[i] = updatedRow;
            if (updatedRow.id) {
                requests.push(
                    this.props.requestFactory.createRequest<Department>('REPLACE', updatedRow)
                );
            } else {
                requests.push(
                    this.props.requestFactory.createRequest<Department>('INSERT', updatedRow)
                );
            }
        }
        this.setState(
            { items },
            () => Promise
                .all(requests.map(request => window.fetch(request)))
                .then(() => this.reload())
        );
    }
    private reload() {
        window.fetch(this.props.requestFactory.createRequest('SELECT'))
            .then(response => response.json())
            .then(items => {
                // Placeholder for the new item.
                items.push({
                    id: 0,
                    name: '',
                });
                this.setState({ items });
            })
        ;
    }
}
