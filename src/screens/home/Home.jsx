import React, { Component } from "react";
import "./Home.css";
import Header from "../../common/Header";
import "../../common/Common.css";
import axios from "axios";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import FavoriteIconBorder from "@material-ui/icons/FavoriteBorder";
import FavoriteIconFill from "@material-ui/icons/Favorite";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Divider from "@material-ui/core/Divider";

import ProfilePic from "../../assets/ProfilePic.jpg";

import Grid from "@material-ui/core/Grid";

const customStyles = {
  fullHeight: { height: "100%" },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    // transition: theme.transitions.create("transform", {
    //   duration: theme.transitions.duration.shortest,
    // }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
  mainContainer: {},
};

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isHome: true,
      mediaData: [],
    };
  }

  async componentDidMount() {
    const accessToken = window.sessionStorage.getItem("access-token");
    const endPoint = this.props.apiDetails.mediaList + accessToken;
    const { data: response } = await axios.get(endPoint);
    //Set api response in const for creating mediaData
    const apiResponse = response.data;

    //Set likes data for each media in the state
    apiResponse.map((media) =>
      this.setState({
        mediaData: [
          ...this.state.mediaData,
          {
            ...media,
            likeCount: Math.floor(Math.random() * 20),
            isLiked: false,
            comments: [],
            comment: "",
            keyword: "",
          },
        ],
      })
    );
  }

  // Convert post date to DD/MM/YYYY HH:MM:SS format
  covertDateTime = (x) => {
    let date = new Date(x);
    let dd = date.getDate();
    let mm = date.getMonth() + 1;
    dd = dd < 10 ? "0" + dd : dd;
    mm = mm < 10 ? "0" + mm : mm;
    return (
      dd +
      "/" +
      mm +
      "/" +
      date.getFullYear() +
      " " +
      date.getHours() +
      ":" +
      date.getMinutes() +
      ":" +
      date.getSeconds()
    );
  };

  // Search handler, sets the search keyword in the state
  handleSearch = (e) => {
    this.setState({ keyword: e.target.value });
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
    } else {
      mediaData[index].likeCount++;
      mediaData[index].isLiked = true;
    }
    this.setState({ mediaData });

    //sets like state in browser storage for futher use
    localStorage.setItem("homeMediaData", JSON.stringify(mediaData));
  };

  commentChangeHandler = (e) => {
    this.setState({ comment: e.target.value });
  };

  // adds new comment and update the state with new comments
  handleComment = (media) => {
    if (this.state.comment === "" || typeof this.state.comment === undefined) {
      return;
    }
    const comment = this.state.comment;
    const mediaData = [...this.state.mediaData];
    const index = mediaData.indexOf(media);
    mediaData[index] = { ...media };
    mediaData[index].comments.push(comment);
    this.setState({ mediaData });

    //sets comment state back to the empty when comment is posted
    this.setState({ comment: "" });

    //sets comments state in browser storage for futher use
    localStorage.setItem("homeMediaData", JSON.stringify(mediaData));
  };

  render() {
    return (
      <>
        <Header state={this.state} onSearch={this.handleSearch} />
        <Container maxWidth="lg" id="mainContainer">
          <Grid
            container
            spacing={2}
            alignContent="center"
            justify="flex-start"
            direction="row"
          >
            {this.state.mediaData.map((media) =>
              /* Show results only if, keyword is undefined, empty or contain perticular text */
              this.state.keyword === undefined ||
              this.state.keyword === "" ||
              media.caption.split("\n")[0].includes(this.state.keyword) ? (
                <Grid item xs={12} md={6} lg={6}>
                  <Card style={customStyles.fullHeight}>
                    <CardHeader
                      avatar={
                        <Avatar
                          aria-label="recipe"
                          style={customStyles.avatar}
                          src={ProfilePic}
                        >
                          R
                        </Avatar>
                      }
                      action={
                        <IconButton aria-label="settings">
                          <MoreVertIcon />
                        </IconButton>
                      }
                      title={media.username}
                      subheader={this.covertDateTime(media.timestamp)}
                    />
                    <CardMedia
                      style={customStyles.media}
                      image={media.media_url}
                      title={media.caption}
                    />

                    <Divider variant="middle" className="divider" />
                    <CardContent>
                      <br />

                      <Typography component="p">
                        <div className="post-caption">
                          {media.caption.split("\n")[0]}
                        </div>
                      </Typography>
                      <Typography component="p">
                        <div className="post-tags">
                          {media.caption
                            .split(" ")
                            .filter((v) => v.startsWith("#"))
                            .map((tag, index) => (
                              <span key={index}>{tag + " "}</span>
                            ))}
                        </div>
                      </Typography>
                    </CardContent>
                    <CardActions>
                      {/* Show like buttons with like counts */}
                      <IconButton
                        aria-label="Add to favorites"
                        onClick={this.handleLike.bind(this, media)}
                      >
                        {media.isLiked && (
                          <FavoriteIconFill style={{ color: "#F44336" }} />
                        )}
                        {!media.isLiked && <FavoriteIconBorder />}
                      </IconButton>
                      <Typography component="p">
                        {media.likeCount}
                        {media.likeCount <= 1 ? " Like" : " Likes"}
                      </Typography>
                    </CardActions>

                    {/* Show all comments*/}
                    <CardContent>
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

                      {/*Add new comment */}
                      <div className="new-comment">
                        <FormControl style={{ flexGrow: 1 }}>
                          <InputLabel htmlFor="comment">Add Comment</InputLabel>
                          <Input
                            id={"comment" + media.id}
                            value={this.state.comment}
                            onChange={this.commentChangeHandler}
                          />
                        </FormControl>
                        <div className="add-comment-btn">
                          <FormControl>
                            <Button
                              onClick={this.handleComment.bind(this, media)}
                              variant="contained"
                              color="primary"
                            >
                              ADD
                            </Button>
                          </FormControl>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Grid>
              ) : null
            )}
          </Grid>
        </Container>
      </>
    );
  }
}

export default Home;
