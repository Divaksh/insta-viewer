import React from "react";
import Typography from "@material-ui/core/Typography";

/*
This stateless functional component is responsible for displaying all comments
*/
const Comments = ({ media }) => {
  return (
    <div className="comments">
      {media.comments.length > 0 &&
        media.comments.map((comment, index) => {
          return (
            <div key={index} className="row">
              <Typography
                component="p"
                style={{
                  fontWeight: "bold",
                  paddingRight: "5px",
                }}
              >
                {media.username}:
              </Typography>
              <Typography component="p">{comment}</Typography>
            </div>
          );
        })}
    </div>
  );
};

export default Comments;
