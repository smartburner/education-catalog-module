import React from "react";
import ReactDOM from "react-dom/client";
import ECModuleApp from "./ECModuleApp";
import {Provider} from "react-redux";
import ECModuleStore from "./store";
import {BrowserRouter} from "react-router-dom";

const catalogAppRootEl = document.querySelector(".aj-education-catalog-app");
if (catalogAppRootEl) {
    const catalogAppRoot = ReactDOM.createRoot(catalogAppRootEl);

    catalogAppRoot.render(
        <Provider store={ECModuleStore}>
            <BrowserRouter>
                <ECModuleApp/>
            </BrowserRouter>
        </Provider>
    );
}