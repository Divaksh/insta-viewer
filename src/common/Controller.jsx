import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "../screens/login/Login";
import Home from "../screens/home/Home";
import NotFound from "./NotFound";

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
        path="/login"
        exact
        render={() => (isLoggedIn() ? <Redirect to="/home" /> : <Login />)}
      />

      <Route path="/not-found" component={NotFound} />

      <Route
        path="/"
        exact
        render={() => (isLoggedIn() ? <Redirect to="/home" /> : <Login />)}
      />

      <Redirect to="/not-found" />
    </Switch>
  );
}
