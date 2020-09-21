import React from "react";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIconBorder from "@material-ui/icons/FavoriteBorder";
import FavoriteIconFill from "@material-ui/icons/Favorite";

/*
This stateless functional component is responsible for the like related functionlity
*/
const Caption = ({ media, onLike }) => {
  return (
    <div className="row">
      <IconButton
        aria-label="Add to favorites"
        onClick={onLike.bind(this, media)}
        style={{ padding: 2 }}
      >
        {media.isLiked && <FavoriteIconFill style={{ color: "#F44336" }} />}
        {!media.isLiked && <FavoriteIconBorder />}
      </IconButton>
      <Typography component="p">
        {media.likeCount}
        {media.likeCount <= 1 ? " Like" : " Likes"}
      </Typography>
    </div>
  );
};

export default Caption;
