import * as React from "react";
import * as ReactDOM from "react-dom";
import * as classNames from "classnames";
import { DepartmentGrid } from "./DepartmentGrid";
import { EmployeeGrid } from "./EmployeeGrid";

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
            <div className="left">
                <ul>
                    {this.renderTab('DEPARTMENTS')}
                    {this.renderTab('EMPLOYEES')}
                </ul>
            </div>
            <div className="right">
                {this.renderCurrentGrid()}
            </div>
        </div>;
    }
    private renderTab(tab: EditorTab): JSX.Element {
        return <li
            className={classNames({
                active: this.state.selectedTab === tab
            })}
            onClick={() => this.selectTab(tab)}
        >
            {tab}
        </li>;
    }
    private renderCurrentGrid(): JSX.Element {
        switch (this.state.selectedTab) {
            case 'DEPARTMENTS':
                return <DepartmentGrid
                    backendBaseUrl={this.props.backendBaseUrl}
                />;
            case 'EMPLOYEES':
                return <EmployeeGrid
                    backendBaseUrl={this.props.backendBaseUrl}
                />;
        }
    }
    private selectTab(selectedTab: EditorTab): void {
        this.setState({ selectedTab });
    }
}
