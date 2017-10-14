import * as React from "react";
import * as ReactDOM from "react-dom";
import * as ReactDataGrid from "react-data-grid";
import * as update from "immutability-helper";

type Department = {
    id: number;
    name: string;
}

type DepartmentGridProps = {
    backendBaseUrl: string
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
        window.fetch(`${this.props.backendBaseUrl}/departments`)
            .then(response => response.json())
            .then(items => this.setState({ items }))
        ;
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
        if (i < this.state.items.length) {
            return this.state.items[i];
        }
        // Placeholder for a new item.
        return {
            id: null,
            name: '',
        }
    }
    private onGridRowsUpdated(
        { fromRow, toRow, updated }: ReactDataGrid.GridRowsUpdatedEvent
    ) {
        let items = this.state.items.slice();
        for (let i = fromRow; i <= toRow; i++) {
            let rowToUpdate = items[i];
            let updatedRow = update(rowToUpdate, {$merge: updated});
            items[i] = updatedRow;
        }
        this.setState({ items });
    }
}
