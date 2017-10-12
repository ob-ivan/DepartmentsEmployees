import * as React from "react";
import * as ReactDOM from "react-dom";
import { Page } from "./Page";

ReactDOM.render(
    <Page
        backendBaseUrl="http://localhost:3000"
    />,
    document.getElementById('root')
);
