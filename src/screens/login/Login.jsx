import React, { Component } from "react";
import { withRouter } from "react-router";

//local resources
import "./Login.css";
import Header from "../../common/header/Header";

//Other resources
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";

const customStyles = {
  loginContainer: {
    justifyContent: "center",
    display: "flex",
  },
  loginCard: {
    width: "325px",
    display: "flex",
    marginTop: "80px",
    justifyContent: "center",
    padding: "20px",
  },
  loginForm: {
    minWidth: "100%",
  },
  loginTitle: {
    fontSize: 22,
  },
};

const userPassport = {
  username: "admin",
  password: "admin",
  accessToken:
    "IGQVJYZAkN1T0FCbUYxYjlRYUlBVmVWYXdGZAW94QUU0dndFTTB3aW5PVUIyeVhBdHJudjJ5TXBwX29iTHZAGcmVNdzAybGRlNUV5QlB3VHpnWlo4LXFYcVNEZAXJWZAENqbEVrRjVqQ3ZAn",
};

class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      requiredUsernameText: "display-none",
      requiredPasswordText: "display-none",
      incorrectCredentialsText: "display-none",
      isLogin: true,
    };
  }

  render() {
    return (
      <>
        <Header state={this.state} />
        <div style={customStyles.loginContainer}>
          <Card style={customStyles.loginCard} variant="outlined">
            <CardContent style={{ width: "100%" }}>
              <Typography style={customStyles.loginTitle}> LOGIN </Typography>
              <br />
              <FormControl required style={customStyles.loginForm}>
                <InputLabel htmlFor="username"> Username </InputLabel>
                <Input
                  id="username"
                  type="text"
                  name="username"
                  onChange={this.inputBoxChangeHandler}
                />
                <FormHelperText className={this.state.requiredUsernameText}>
                  <span className="red">required</span>
                </FormHelperText>
              </FormControl>
              <br />
              <br />
              <FormControl required style={customStyles.loginForm}>
                <InputLabel htmlFor="password"> Password </InputLabel>
                <Input
                  id="password"
                  type="password"
                  name="password"
                  onChange={this.inputBoxChangeHandler}
                />
                <FormHelperText className={this.state.requiredPasswordText}>
                  <span className="red">required</span>
                </FormHelperText>
              </FormControl>
              <br />
              <br />
              <div className={this.state.incorrectCredentialsText}>
                <span className="red">
                  {" "}
                  Incorrect username and/or password{" "}
                </span>
              </div>
              <br />
              <Button
                variant="contained"
                color="primary"
                onClick={this.loginButtonHandler}
              >
                {" "}
                LOGIN{" "}
              </Button>
            </CardContent>
          </Card>
        </div>
      </>
    );
  }

  // Reacts on the input box changes
  inputBoxChangeHandler = (e) => {
    if (e.target.name === "username") {
      //check the event's input field name
      this.setState({ username: e.target.value });
      e.target.value === ""
        ? this.setState({
            requiredUsernameText: "display-block",
            incorrectCredentialText: "display-none",
          })
        : this.setState({
            requiredUsernameText: "display-none",
          });
    } else {
      this.setState({ password: e.target.value });
      e.target.value === ""
        ? this.setState({
            requiredPasswordText: "display-block",
            incorrectCredentialText: "display-none",
          })
        : this.setState({
            requiredPasswordText: "display-none",
          });
    }
  }; // End inputBoxChangeHandler

  //Handles the login button
  loginButtonHandler = () => {
    const username = this.state.username;
    const password = this.state.password;

    // Show required text if submit empty form
    if (this.state.username === "") {
      this.setState({ requiredUsernameText: "display-block" });
    }
    if (this.state.password === "") {
      this.setState({ requiredPasswordText: "display-block" });
    }

    if (this.state.incorrectCredentialsText === "display-block") {
      this.setState({ incorrectCredentialsText: "display-none" });
    }

    //if username and passwords are not blank validate the user
    if (username !== "" && password !== "") {
      this.validateUser(username, password);
    }
  };

  //Validate the username and password and create session
  validateUser = (username, password) => {
    if (
      username === userPassport.username &&
      password === userPassport.password
    ) {
      sessionStorage.setItem("access-token", userPassport.accessToken);
      this.setState({
        incorrectCredentialsText: "display-none",
      });
      this.navigateToHome();
    } else {
      this.setState({
        incorrectCredentialsText: "display-block",
      });
    }
  };

  // Redirect User to Home Page on Successful Login
  navigateToHome = () => {
    //No going back once user is logged in
    this.props.history.replace("/home");
  };
}

export default withRouter(Login);
