import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Header from "./common/Header";
import Login from "./screens/login/Login";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <BrowserRouter>
    <Header />
    <Login />
  </BrowserRouter>,
  document.getElementById("root")
);
