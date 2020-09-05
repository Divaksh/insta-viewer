import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Header from "./common/Header";
import Login from "./screens/login/Login";

ReactDOM.render(
  <span>
    <Header />
    <Login />
  </span>,
  document.getElementById("root")
);
