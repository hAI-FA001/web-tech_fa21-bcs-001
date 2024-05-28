import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

// note/reminder: components folder must be inside src
import SingleStudent from "./components/SingleStudent";
import Counter from "./components/Counter";
import Todos from "./components/Todos";

import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root")); // can use/possible to use any tag
root.render(
  // <BrowserRouter>
  <React.StrictMode>
    {/* <h1>ABC</h1>, can put any tag here */}
    <SingleStudent name="XYZ" address="LDA Lahore" onRegisterInCourse="" />
    <SingleStudent name="ABC" address="DHA Lahore" />
    <Counter />
    <Todos />
    <App />
  </React.StrictMode>
  // </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
