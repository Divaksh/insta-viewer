import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import Controller from "./common/Controller";

/*
This is the starting point of the application
*/
ReactDOM.render(
  <BrowserRouter>
    <Controller />
  </BrowserRouter>,
  document.getElementById("root")
);
