import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import "./Login.css";

const customStyles = {
  loginContainer: {
    justifyContent: "center",
    display: "flex",
  },
  loginCard: {
    width: "325px",
    display: "flex",
    marginTop: "20px",
    justifyContent: "center",
  },
  loginForm: {
    width: "100%",
  },
  loginTitle: {
    fontSize: 20,
  },
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
    };
  }

  render() {
    return (
      <div style={customStyles.loginContainer}>
        <Card style={customStyles.loginCard} variant="outlined">
          <CardContent>
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
              <span className="red"> Incorrect username and/or password </span>
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
    );
  }

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

  loginButtonHandler = () => {
    if (this.state.username === "") {
      this.setState({ requiredUsernameText: "display-block" });
    }
    if (this.state.password === "") {
      this.setState({ requiredPasswordText: "display-block" });
    }
  };
}

export default Login;
