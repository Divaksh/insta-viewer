import React from "react";
import "./Header.css";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import InputBase from "@material-ui/core/InputBase";
import { makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import Popover from "@material-ui/core/Popover";
import { Link } from "react-router-dom";

// Custom Styles to over ride material ui default styles

const useStyles = makeStyles((theme) => ({
  header: {
    backgroundColor: "#263238",
  },
}));

const Header = ({ state }) => {
  //store custom Styles in classes
  const classes = useStyles();

  return (
    <div>
      <AppBar className={classes.header}>
        <Toolbar>
          {(state.isLogin || state.isHome) && (
            <span className="logoTitle">Image Viewer</span>
          )}
          {state.isProfile && (
            <Link style={{ textDecoration: "none", color: "white" }} to="/home">
              <span className="logoTitle">Image Viewer</span>
            </Link>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
