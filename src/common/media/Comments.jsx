import React from "react";
import Typography from "@material-ui/core/Typography";

const Comments = ({ media }) => {
  return (
    <>
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
    </>
  );
};

export default Comments;
