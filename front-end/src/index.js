import React from "react";
import ReactDom from "react-dom/client";
import App from "./components/App";
import Context from "./Context";

const root = ReactDom.createRoot(document.querySelector("#root"));
root.render(
    <Context>
        <App />
    </Context>
);
