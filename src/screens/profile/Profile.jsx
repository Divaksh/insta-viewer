import React, { Component } from "react";
import Header from "../../common/Header";
import "../../common/Common.css";
import "./Profile.css";
import { withRouter } from "react-router";
import axios from "axios";
import ProfilePic from "../../assets/ProfilePic.jpg";

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
              likeCount: homeMediaData.find((homeMedia) => {
                if (homeMedia.id === media.id) return homeMedia;
              }).likeCount,
              isLiked: homeMediaData.find((homeMedia) => {
                if (homeMedia.id === media.id) return homeMedia;
              }).isLiked,
              comments: homeMediaData.find((homeMedia) => {
                if (homeMedia.id === media.id) return homeMedia;
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
                    Posts: {this.state.posts ? this.state.posts : null}
                  </Grid>
                  <Grid item xs={4}>
                    Follows: {this.state.follows ? this.state.follows : null}
                  </Grid>
                  <Grid item xs={4}>
                    Followed By:{" "}
                    {this.state.followedby ? this.state.followedby : null}
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
                        onClick={this.onUpdateName}
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
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    backgroundColor: "#fff",
                    width: "70%",
                    height: "70%",
                  }}
                >
                  <div style={{ width: "50%", padding: 10 }}>
                    <img
                      style={{ height: "100%", width: "100%" }}
                      src={this.state.currentMedia.media_url}
                      alt={
                        this.state.currentMedia.caption != null
                          ? this.state.currentMedia.caption.text
                          : ""
                      }
                    />
                  </div>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      width: "50%",
                      padding: 10,
                    }}
                  >
                    <div
                      style={{
                        borderBottom: "2px solid #f2f2f2",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "flex-start",
                        alignItems: "center",
                      }}
                    >
                      <Avatar
                        alt="User Image"
                        src={ProfilePic}
                        style={{
                          width: "50px",
                          height: "50px",
                          margin: "10px",
                        }}
                      />
                      <Typography component="p">
                        {this.state.username}
                      </Typography>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        height: "100%",
                        flexDirection: "column",
                        justifyContent: "space-between",
                      }}
                    >
                      <div>
                        <Typography component="p">
                          <div className="post-caption">
                            {this.state.currentMedia.caption.split("\n")[0]}
                          </div>
                        </Typography>
                        <Typography component="p">
                          <div className="post-tags">
                            {this.state.currentMedia.caption
                              .split(" ")
                              .filter((v) => v.startsWith("#"))
                              .map((tag, index) => (
                                <span key={index}>{tag + " "}</span>
                              ))}
                          </div>
                        </Typography>
                      </div>
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

  openEditNameModal = () => {
    this.setState({
      openNameEditModal: true,
      closeNameEditModal: false,
    });
  };

  closeEditNameModal = () => {
    this.setState({
      openNameEditModal: false,
      closeNameEditModal: true,
    });
  };

  onChangeEditName = (e) => {
    if (e.target.value === "") {
      this.setState({ newName: e.target.value, nameRequired: true });
    } else {
      this.setState({ newName: e.target.value, nameRequired: false });
    }
  };

  onUpdateName = () => {
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

  openEditNameModal = () => {
    this.setState({
      openNameEditModal: true,
      closeNameEditModal: false,
    });
  };

  closeEditNameModal = () => {
    this.setState({
      openNameEditModal: false,
      closeNameEditModal: true,
    });
  };

  handleOpenImageModal = (media) => {
    this.setState({ imageModalOpen: true, currentMedia: media });
  };

  handleCloseImageModal = () => {
    this.setState({ imageModalOpen: false });
  };
}

export default withRouter(Profile);
