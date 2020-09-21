import React from "react";
import Typography from "@material-ui/core/Typography";

const Caption = ({ media }) => {
  return (
    <Typography component="p">
      <span className="post-caption">{media.caption.split("\n")[0]}</span>
    </Typography>
  );
};

export default Caption;
