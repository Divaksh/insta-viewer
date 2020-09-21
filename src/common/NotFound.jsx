import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Header from "./header/Header";

const useStyles = makeStyles({
  root: {
    width: "100%",
    marginTop: 100,
  },
});

const NotFound = () => {
  const classes = useStyles();
  const state = { isError: true };
  return (
    <>
      <Header state={state} />
      <div className={classes.root}>
        <Typography variant="h2" component="h2" gutterBottom>
          Congratulations, you broke the internet!!
        </Typography>
      </div>
    </>
  );
};

export default NotFound;
