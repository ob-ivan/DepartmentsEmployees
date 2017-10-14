import * as React from "react";
import * as ReactDOM from "react-dom";
import * as ReactDataGrid from "react-data-grid";
import { Grid } from "./Grid";
import { RequestFactory } from "./RequestFactory";

type DepartmentGridProps = {
    backendBaseUrl: string
}

export class DepartmentGrid extends React.Component<DepartmentGridProps> {
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
    }
    public render() {
        return <Grid
            columns={this.columns}
            itemFactory={() => ({ id : 0, name : '' })}
            requestFactory={new RequestFactory(`${this.props.backendBaseUrl}/departments`)}
        />
    }
}
