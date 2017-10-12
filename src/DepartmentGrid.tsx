import * as React from "react";
import * as ReactDOM from "react-dom";

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
    public constructor(props: DepartmentGridProps) {
        super(props);
        this.state = {
            items: null
        };
    }
    public init(): void {
        if (!this.state.items) {
            window.fetch(`${this.props.backendBaseUrl}/departments`)
                .then(response => response.json())
                .then(items => this.setState({ items }))
            ;
        }
    }
    public render() {
        if (!this.state.items) {
            return null;
        }
        return <table>
            {this.state.items.map(department => <DepartmentRow item={department}/>)}
        </table>;
    }
}
