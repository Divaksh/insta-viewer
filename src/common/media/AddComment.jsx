import React from "react";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";

/*
This stateless functional component is responsible for the add new comment functionlity
*/
const AddComment = ({ media, onComment, onCommentChange }) => {
  return (
    <>
      <div className="new-comment">
        <FormControl style={{ flexGrow: 1 }} key={media.id}>
          <InputLabel htmlFor="comment">Add Comment</InputLabel>
          <Input
            name={media.id}
            id={"comment-" + media.id}
            value={media.comment}
            onChange={(e) => onCommentChange(e)}
          />
        </FormControl>
        <div className="add-comment-btn">
          {media.commentRequired ? (
            <FormHelperText>
              <span style={{ color: "red" }}>required</span>
            </FormHelperText>
          ) : null}
          <FormControl>
            <Button
              key={media.id}
              onClick={onComment.bind(this, media)}
              variant="contained"
              color="primary"
            >
              ADD
            </Button>
          </FormControl>
        </div>
      </div>
    </>
  );
};

export default AddComment;
