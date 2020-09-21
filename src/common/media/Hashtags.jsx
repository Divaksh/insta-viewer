import React from "react";
import Typography from "@material-ui/core/Typography";

/*
This stateless functional component is responsible for the hashtag related functionlity
*/
const Hashtags = ({ media }) => {
  return (
    <Typography component="p">
      <span className="post-tags">
        {media.caption
          .split(" ")
          .filter((v) => v.startsWith("#"))
          .map((tag, index) => (
            <span key={index}>{tag + " "}</span>
          ))}
      </span>
    </Typography>
  );
};

export default Hashtags;
