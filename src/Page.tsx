import * as React from "react";
import * as ReactDOM from "react-dom";
import * as classNames from "classnames";
import { DepartmentGrid } from "./DepartmentGrid";
import { EmployeeGrid } from "./EmployeeGrid";
import { RequestFactory } from "./RequestFactory";

type EditorTab = 'DEPARTMENTS' | 'EMPLOYEES';

type PageProps = {
    backendBaseUrl: string
}

type PageState = {
    selectedTab: EditorTab
}

export class Page extends React.Component<PageProps, PageState> {
    public constructor(props: PageProps) {
        super(props);
        this.state = {
            selectedTab: 'DEPARTMENTS',
        }
    }
    public render() {
        return <div>
            <div>
                {this.renderTab('DEPARTMENTS')}
                {this.renderTab('EMPLOYEES')}
            </div>
            <div>
                {this.renderCurrentGrid()}
            </div>
        </div>;
    }
    private renderTab(tab: EditorTab): JSX.Element {
        return <span
            className={classNames({
                active: this.state.selectedTab === tab
            })}
            onClick={() => this.selectTab(tab)}
        >
            {tab}
        </span>;
    }
    private renderCurrentGrid(): JSX.Element {
        switch (this.state.selectedTab) {
            case 'DEPARTMENTS': return <DepartmentGrid
                requestFactory={new RequestFactory(`${this.props.backendBaseUrl}/departments`)}
            />;
            case 'EMPLOYEES': return <EmployeeGrid/>;
        }
    }
    private selectTab(selectedTab: EditorTab): void {
        this.setState({ selectedTab });
    }
}
