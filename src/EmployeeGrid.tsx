import * as React from "react";
import * as ReactDOM from "react-dom";
import * as ReactDataGrid from "react-data-grid";
import { Grid } from "./Grid";
import { RequestFactory } from "./RequestFactory";

type EmployeeGridProps = {
    backendBaseUrl: string
}

export class EmployeeGrid extends React.Component<EmployeeGridProps> {
    private columns: ReactDataGrid.Column[];
    public constructor(props: EmployeeGridProps) {
        super(props);
        this.columns = [
            {
                key: "id",
                name: "ID",
                width: 50,
            },
            {
                key: "firstName",
                name: "First Name",
                editable: true,
            },
            {
                key: "lastName",
                name: "Last Name",
                editable: true,
            },
            {
                key: "departmentId",
                name: "Department ID",
                editable: true,
                width: 150,
                // TODO: Provide a selector with options from departments table
            },
        ];
    }
    public render() {
        return <Grid
            columns={this.columns}
            itemFactory={() => this.createItem()}
            requestFactory={new RequestFactory(`${this.props.backendBaseUrl}/employees`)}
        />
    }
    private createItem() {
        return {
            id : 0,
            firstName : '',
            lastName: '',
            departmentId: 0,
        }
    }
}
