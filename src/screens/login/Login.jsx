import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import "./Login.css";
import { Container } from "@material-ui/core";

const useStyles = makeStyles({
  container: { justifyContent: "center", display: "flex" },
  loginCard: {
    marginTop: "20px",
    justifyContent: "center",
    display: "flex",
    width: "325px",
  },
  loginForm: {
    width: "100%",
  },
  loginTitle: {
    fontSize: 20,
  },
});

const Login = () => {
  const classes = useStyles();

  return (
    <Container className={classes.container}>
      <Card className={classes.loginCard} variant="outlined">
        <CardContent>
          <Typography className={classes.loginTitle}> LOGIN </Typography>
          <br />
          <FormControl required className={classes.loginForm}>
            <InputLabel htmlFor="username"> Username </InputLabel>
            <Input id="username" type="text" username={""} onChange={""} />
            <FormHelperText className={""}>
              <span className="red">required</span>
            </FormHelperText>
          </FormControl>
          <br />
          <br />
          <FormControl required className={classes.loginForm}>
            <InputLabel htmlFor="password"> Password </InputLabel>
            <Input id="password" type="password" onChange={""} />
            <FormHelperText className={""}>
              <span className="red">required</span>
            </FormHelperText>
          </FormControl>
          <br />
          <br />
          <div className={""}>
            <span className="red"> Incorrect username and/or password </span>
          </div>
          <br />
          <Button variant="contained" color="primary" onClick={""}>
            {" "}
            LOGIN{" "}
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Login;
