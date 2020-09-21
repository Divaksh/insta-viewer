import React, { Component } from "react";
import { withRouter } from "react-router";

// Local resources
import Header from "../../common/header/Header";
import Caption from "../../common/media/Caption";
import Hashtags from "../../common/media/Hashtags";
import Like from "../../common/media/Like";
import Comments from "../../common/media/Comments";
import AddComment from "../../common/media/AddComment";
import ProfilePic from "../../assets/ProfilePic.jpg";
import "../../common/Common.css";
import "./Profile.css";

//External resources
import axios from "axios";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Container from "@material-ui/core/Container";
import Fab from "@material-ui/core/Fab";
import FormHelperText from "@material-ui/core/FormHelperText";
import Modal from "@material-ui/core/Modal";
import Grid from "@material-ui/core/Grid";
import EditIcon from "@material-ui/icons/Edit";
import CardMedia from "@material-ui/core/CardMedia";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import CardActions from "@material-ui/core/CardActions";

const styles = {
  paper: {
    position: "relative",
    width: "150px",
    backgroundColor: "#fff",
    top: "30%",
    margin: "0 auto",
    boxShadow: "2px 2px #888888",
    padding: "20px",
  },
  media: {
    height: "150px",
    paddingTop: "56.25%", // 16:9
  },
  imageModal: {
    backgroundColor: "#fff",
    margin: "0 auto",
    boxShadow: "2px 2px #888888",
    padding: "10px",
  },
};

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isProfile: true,
      mediaData: [],
      username: "",
      posts: "",
      follows: "1",
      followedby: "10M",
      name: "Divaksh Jain",
      openNameEditModal: false,
      closeNameEditModal: true,
      newName: "",
      nameRequired: false,
      imageModalOpen: false,
      currentMedia: null,
    };
  }

  //Calls the API and sets the state based on response and local storage
  async componentDidMount() {
    const accessToken = window.sessionStorage.getItem("access-token");
    const endPoint = this.props.apiDetails.mediaList + accessToken;
    const { data: response } = await axios.get(endPoint);
    //Set api response in const for creating mediaData
    const apiResponse = response.data;

    if (
      localStorage.getItem("homeMediaData") !== "" ||
      localStorage.getItem("homeMediaData") !== undefined
    ) {
      const homeMediaData = JSON.parse(localStorage.getItem("homeMediaData"));
      //    Set likes and comments data for each media in the state
      apiResponse.map((media) =>
        this.setState({
          mediaData: [
            ...this.state.mediaData,
            {
              ...media,
              likeCount:
                homeMediaData !== null &&
                homeMediaData.find((homeMedia) => {
                  return homeMedia.id === media.id && homeMedia;
                }).likeCount,
              isLiked:
                homeMediaData !== null &&
                homeMediaData.find((homeMedia) => {
                  return homeMedia.id === media.id && homeMedia;
                }).isLiked,
              comments:
                homeMediaData !== null &&
                homeMediaData.find((homeMedia) => {
                  return homeMedia.id === media.id && homeMedia;
                }).comments,
              comment: "",
            },
          ],
        })
      );
    }
    //Set posts counts and username in state
    this.setState({
      posts: this.state.mediaData.length,
      username: this.state.mediaData[0].username,
    });
  }

  render() {
    return (
      <>
        <Header state={this.state} />
        <div className="mainContainer">
          <Container>
            <Grid container spacing={3} justify="flex-start">
              <Grid item xs={2} />
              <Grid item xs={2}>
                {ProfilePic ? (
                  <Avatar
                    alt="profile_pic"
                    id="profile-pic"
                    variant="circle"
                    src={ProfilePic}
                  />
                ) : null}
              </Grid>
              <Grid item xs={5} id="user_name">
                <Typography
                  variant="h4"
                  component="h1"
                  style={{ marginBottom: 5 }}
                >
                  {this.state.mediaData ? this.state.username : null}
                </Typography>
                <Grid container spacing={3} justify="center">
                  <Grid item xs={4}>
                    Posts: {this.state.posts && this.state.posts}
                  </Grid>
                  <Grid item xs={4}>
                    Follows: {this.state.follows && this.state.follows}
                  </Grid>
                  <Grid item xs={4}>
                    Followed By:{" "}
                    {this.state.followedby && this.state.followedby}
                  </Grid>
                </Grid>
                <Typography
                  variant="h6"
                  component="h2"
                  style={{ marginTop: 10 }}
                >
                  {this.state.name ? this.state.name : null}
                  {this.state.mediaData && !this.state.name
                    ? this.state.mediaData.name
                    : null}
                  <Fab
                    color="secondary"
                    id="edit-profile"
                    aria-label="edit"
                    onClick={this.openEditNameModal}
                  >
                    <EditIcon fontSize="small" />
                  </Fab>
                </Typography>

                <Modal
                  open={this.state.openNameEditModal}
                  onClose={this.closeEditNameModal}
                >
                  <div className="edit-modal-div">
                    <h2>Edit</h2>
                    <FormControl required>
                      <InputLabel htmlFor="Name">Full Name</InputLabel>
                      <Input
                        id="fullName"
                        type="text"
                        onChange={this.onChangeEditName}
                      />
                      {this.state.nameRequired ? (
                        <FormHelperText>
                          <span style={{ color: "red" }}>required</span>
                        </FormHelperText>
                      ) : null}
                    </FormControl>
                    <div style={{ marginTop: 15 }}>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={this.handleUpdateName}
                      >
                        UPDATE
                      </Button>
                    </div>
                  </div>
                </Modal>
              </Grid>
              <Grid item xs={4} />
            </Grid>
          </Container>

          {/* displaying all posts */}
          <Container>
            {this.state.mediaData !== null && (
              <GridList
                cellHeight={"auto"}
                cols={3}
                style={{ padding: "40px" }}
              >
                {this.state.mediaData.map((media) => (
                  <GridListTile key={media.id}>
                    <CardMedia
                      id={media.id}
                      style={styles.media}
                      image={media.media_url}
                      title={media.caption != null ? media.caption.text : ""}
                      onClick={this.handleOpenImageModal.bind(this, media)}
                    />
                  </GridListTile>
                ))}
              </GridList>
            )}

            {this.state.currentMedia != null && (
              <Modal
                aria-labelledby="image-modal"
                aria-describedby="modal to show image details"
                open={this.state.imageModalOpen}
                onClose={this.handleCloseImageModal}
                className="media-modal"
              >
                <div className="media-modal-container">
                  <div className="media-modal-image">
                    <img
                      className="media-modal-img"
                      src={this.state.currentMedia.media_url}
                      alt={
                        this.state.currentMedia.caption != null
                          ? this.state.currentMedia.caption.text
                          : ""
                      }
                    />
                  </div>

                  <div className="media-modal-content">
                    <div className="media-modal-avatar-area">
                      <Avatar
                        alt="User Image"
                        src={ProfilePic}
                        className="media-modal-avatar"
                      />
                      <Typography component="p">
                        {this.state.username}
                      </Typography>
                    </div>
                    <div className="media-modal-details">
                      {/* Show media caption*/}
                      <Caption media={this.state.currentMedia} />

                      {/* Show all media hashtags*/}
                      <Hashtags media={this.state.currentMedia} />

                      {/* Show all comments*/}
                      <Comments media={this.state.currentMedia} />
                      <CardActions>
                        {/* Show like buttons with like counts */}
                        <div className="modal-footer">
                          <div className="like-bottom">
                            <Like
                              media={this.state.currentMedia}
                              onLike={this.handleLike}
                            />
                          </div>

                          {/*Add new comment */}
                          <AddComment
                            media={this.state.currentMedia}
                            onComment={this.handleComment}
                            onCommentChange={this.commentChangeHandler}
                          />
                        </div>
                      </CardActions>
                    </div>
                  </div>
                </div>
              </Modal>
            )}
          </Container>
        </div>
      </>
    );
  }

  //Modal open handler
  openEditNameModal = () => {
    this.setState({
      openNameEditModal: true,
      closeNameEditModal: false,
    });
  };

  //Modal close handler
  closeEditNameModal = () => {
    this.setState({
      openNameEditModal: false,
      closeNameEditModal: true,
    });
  };

  //Tracks the name change and handles the validation for the same
  onChangeEditName = (e) => {
    if (e.target.value === "") {
      this.setState({ newName: e.target.value, nameRequired: true });
    } else {
      this.setState({ newName: e.target.value, nameRequired: false });
    }
  };

  //Updates the name into state when submits the button
  handleUpdateName = () => {
    if (this.state.newName.trim() === "") {
      this.setState({
        nameRequired: true,
      });
    } else {
      this.setState({
        name: this.state.newName,
        nameRequired: false,
        newName: "",
      });
      this.closeEditNameModal();
    }
  };

  //Open name modal handeler
  openEditNameModal = () => {
    this.setState({
      openNameEditModal: true,
      closeNameEditModal: false,
    });
  };

  //Sets the openNameEditModal state to false and closeNameEditModal to true
  closeEditNameModal = () => {
    this.setState({
      openNameEditModal: false,
      closeNameEditModal: true,
    });
  };

  // Sets the imageModalOpen state to true and sets the current media with the media
  handleOpenImageModal = (media) => {
    this.setState({ imageModalOpen: true, currentMedia: media });
  };

  // Sets the imageModalOpen state to false
  handleCloseImageModal = () => {
    this.setState({ imageModalOpen: false });
  };

  //Handles comment state for the individual comment
  commentChangeHandler = (e) => {
    const mediaData = [...this.state.mediaData];
    const media = mediaData.find((element) => {
      return element.id === e.target.name && element;
    });
    const index = mediaData.indexOf(media);
    mediaData[index] = { ...media };
    mediaData[index].comment = e.target.value;
    mediaData[index].commentRequired = false;
    //Set currentMedia state so change can reflect in the input box
    this.setState({ currentMedia: mediaData[index] });
    //Set the mediaData state
    this.setState({ mediaData });
  };

  // Adds new comment and update the state with new comments
  handleComment = (media) => {
    const mediaData = [...this.state.mediaData];
    const index = mediaData.indexOf(media);
    mediaData[index] = { ...media };
    if (media.comment === "" || media.comment === undefined) {
      mediaData[index].commentRequired = true;
      this.setState({ mediaData });
      //sets comment state back to the empty when comment is posted
      this.setState({ currentMedia: mediaData[index] });
    } else {
      const comment = media.comment;
      mediaData[index].comments.push(comment);
      mediaData[index].comment = ""; //set current back to empty
      this.setState({ mediaData });

      //sets comment state back to the empty when comment is posted
      this.setState({ currentMedia: mediaData[index] });

      //sets comments state in browser storage for futher use
      localStorage.setItem("homeMediaData", JSON.stringify(mediaData));
    }
  };

  // Like handler, increase and decrease the like count and set like status
  handleLike = (media) => {
    const mediaData = [...this.state.mediaData];
    const index = mediaData.indexOf(media);
    mediaData[index] = { ...media };

    //do action based on isLiked state
    if (mediaData[index].isLiked) {
      mediaData[index].likeCount--;
      mediaData[index].isLiked = false;

      //for selected media state like in modals
      media.isLiked = false;
      media.likeCount--;
    } else {
      mediaData[index].likeCount++;
      mediaData[index].isLiked = true;

      //for selected media state like in modals
      media.isLiked = true;
      media.likeCount++;
    }
    this.setState({ mediaData });
    //sets like state in browser storage for futher use
    localStorage.setItem("homeMediaData", JSON.stringify(mediaData));
  };
}

export default withRouter(Profile);
