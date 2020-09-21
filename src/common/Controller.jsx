import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "../screens/login/Login";
import Home from "../screens/home/Home";
import Profile from "../screens/profile/Profile";
import NotFound from "./NotFound";

// Main router component to handle all page redirects
export default function Controller() {
  const isLoggedIn = () =>
    window.sessionStorage.getItem("access-token") != null &&
    window.sessionStorage.getItem("access-token") !== "";

  const apiDetails = {
    baseUrl: "https://graph.instagram.com/",
    mediaList:
      "https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,username,timestamp&access_token=",
  };

  return (
    <Switch>
      {/* if path is /profile and user is logged in then load Profile component with apiDetials props */}
      <Route
        path="/profile"
        render={() =>
          isLoggedIn() ? (
            <Profile apiDetails={apiDetails} />
          ) : (
            <Redirect to="/login" />
          )
        }
      />

      {/* if path is /home and user is logged in then load Home component with apiDetials props */}
      <Route
        path="/home"
        render={() =>
          isLoggedIn() ? (
            <Home apiDetails={apiDetails} />
          ) : (
            <Redirect to="/login" />
          )
        }
      />

      {/* if path is /login and user is logged in then redirect user to the home */}
      <Route
        path="/login"
        exact
        render={() => (isLoggedIn() ? <Redirect to="/home" /> : <Login />)}
      />

      {/* if path is /not-found then route to the 404 not found component  */}
      <Route path="/not-found" component={NotFound} />

      {/* if path is / and user is not logged in then load login component  */}
      <Route
        path="/"
        exact
        render={() => (isLoggedIn() ? <Redirect to="/home" /> : <Login />)}
      />

      {/* if path does not exist then redirect user to /not-found */}
      <Redirect to="/not-found" />
    </Switch>
  );
}
