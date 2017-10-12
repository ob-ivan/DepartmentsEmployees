import * as React from "react";
import * as ReactDOM from "react-dom";
import classNames from "classnames";

type DepartmentTab = 'DEPARTMENTS';
type EmployeeTab = 'EMPLOYEES';
type EditorTab = DeparmentTab | EmployeTab;

type PageProps = {
    backendBaseUrl: string
}

type PageState = {
    selectedTab: EditorTab
}

class Page extends React.Component<PageProps, PageState> {
    public constructor(props: PageProps) {
        super(props);
        this.state = {
            selectedTab: DepartmentTab,
        }
    }
    public render() {
        return <div>
            <div>
                <span onClick={() => this.selectTab(DepartmentTab)}>Departments</span>
                <span onClick={() => this.selectTab(EmployeeTab)}>Employees</span>
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
            Departments
        </span>;
    }
    private selectTab(selectedTab: EditorTab): void {
        this.setState({ selectedTab });
    }
}
