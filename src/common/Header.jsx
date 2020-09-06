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
  grow: {
    flexGrow: 1,
  },
  search: {
    position: "relative",
    borderRadius: "4px",
    backgroundColor: "#c0c0c0",
    marginLeft: 0,
    width: "300px",
  },
  searchIcon: {
    width: theme.spacing(4),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#000000",
  },
  inputInput: {
    paddingTop: theme.spacing(1),
    paddingRight: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    paddingLeft: theme.spacing(4),
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: 120,
      "&:focus": {
        width: 200,
      },
    },
  },
  avatar: {
    width: 40,
    height: 40,
  },
  header: {
    backgroundColor: "#263238",
  },
  hr: {
    height: "1.5px",
    backgroundColor: "#f2f2f2",
    marginLeft: "5px",
    marginRight: "5px",
  },
}));

const Header = ({ state }) => {
  //store custom Styles in classes
  const classes = useStyles();
  const [setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleAccount = () => {
    handleAccount();
    handleClose();
  };

  const handleLogout = () => {
    handleLogout();
    handleClose();
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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
          <div className={classes.grow} />
          {state.isHome && (
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                onChange={(e) => {
                  state.searchHandler(e.target.value);
                }}
                placeholder="Search…"
                classes={{
                  input: classes.inputInput,
                }}
              />
            </div>
          )}
          {(state.isHome || state.isProfile) && (
            <div>
              <IconButton onClick={handleClick}>
                <Avatar
                  alt="Profile Pic"
                  src={state.userProfileUrl}
                  className={classes.avatar}
                  style={{ border: "1px solid #fff" }}
                />
              </IconButton>
              <Popover
                id="simple-menu"
                anchorEl={state.anchorEl}
                open={Boolean(state.anchorEl)}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
              >
                <div style={{ padding: "5px" }}>
                  {state.isHome && (
                    <div>
                      <MenuItem onClick={handleAccount}>My Account</MenuItem>
                      <div className={classes.hr} />
                    </div>
                  )}
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </div>
              </Popover>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
