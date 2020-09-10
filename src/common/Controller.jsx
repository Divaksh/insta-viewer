import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "../screens/login/Login";
import Home from "../screens/home/Home";

// Main router component to handle all page redirects
export default function Controller() {
  const isLoggedIn = () =>
    window.sessionStorage.getItem("access-token") != null &&
    window.sessionStorage.getItem("access-token") !== "";

  return (
    <Switch>
      <Route
        path="/home"
        render={() => (isLoggedIn() ? <Home /> : <Redirect to="/login" />)}
      />

      <Route
        path="/"
        render={() => (isLoggedIn() ? <Redirect to="/home" /> : <Login />)}
      />
    </Switch>
  );
}
