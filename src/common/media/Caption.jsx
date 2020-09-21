import React from "react";
import Typography from "@material-ui/core/Typography";

/*
This stateless functional component is responsible for displaying the caption
*/
const Caption = ({ media }) => {
  return (
    <Typography component="p" className="post-caption">
      <span className="post-caption">{media.caption.split("\n")[0]}</span>
    </Typography>
  );
};

export default Caption;
