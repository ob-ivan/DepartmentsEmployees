import * as React from "react";
import * as ReactDOM from "react-dom";
import * as ReactDataGrid from "react-data-grid";

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
            rowGetter={(i: number) => this.state.items[i]}
            rowsCount={this.state.items.length}
        />;
    }
}
