import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { StoreProvider } from "easy-peasy";
import store from "./store";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import "react-toastify/dist/ReactToastify.css";

import './style.css'

ReactDOM.createRoot(document.getElementById("root")).render(
    <StoreProvider store={store}>
        <App />
    </StoreProvider>
);

// ReactDOM.createRoot(document.getElementById("root")).render(
//     <StoreProvider store={store}>
//         <React.StrictMode>
//             <App />
//         </React.StrictMode>
//     </StoreProvider>
// );

