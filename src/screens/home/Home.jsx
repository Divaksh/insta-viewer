import React, { Component } from "react";

import "./Home.css";
import Header from "../../common/header/Header";
import Caption from "../../common/media/Caption";
import Hashtags from "../../common/media/Hashtags";
import Like from "../../common/media/Like";
import Comments from "../../common/media/Comments";
import AddComment from "../../common/media/AddComment";
import ProfilePic from "../../assets/ProfilePic.jpg";
import "../../common/Common.css";

import axios from "axios";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import { red } from "@material-ui/core/colors";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";

const customStyles = {
  fullHeight: { height: "100%" },
  media: {
    height: 0,
    marginRight: 10,
    marginLeft: 10,
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
      commentRequired: false,
      comment: "",
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
    this.setState({
      comment: e.target.value,
      commentRequired: false,
    });
    const mediaData = [...this.state.mediaData];
    const media = mediaData.find((element) => {
      return element.id === e.target.name && element;
    });
    const index = mediaData.indexOf(media);
    mediaData[index] = { ...media };
    mediaData[index].comment = e.target.value;
    this.setState({ mediaData });
  };

  // adds new comment and update the state with new comments
  handleComment = (media) => {
    if (this.state.comment === "" || this.state.comment === undefined) {
      this.setState({
        commentRequired: true,
        comment: "",
      });
    } else {
      const comment = this.state.comment;
      const mediaData = [...this.state.mediaData];
      const index = mediaData.indexOf(media);
      mediaData[index] = { ...media };
      mediaData[index].comments.push(comment);
      mediaData[index].comment = ""; //set current back to empty
      this.setState({ mediaData });

      //sets comment state back to the empty when comment is posted
      this.setState({ comment: "" });

      //sets comments state in browser storage for futher use
      localStorage.setItem("homeMediaData", JSON.stringify(mediaData));
    }
  };

  render() {
    return (
      <>
        <Header state={this.state} onSearch={this.handleSearch} />
        <div className="mainContainer">
          <Container maxWidth="lg">
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
                  <Grid item xs={12} md={6} lg={6} key={media.id}>
                    <Card style={customStyles.fullHeight}>
                      <CardHeader
                        avatar={
                          <Avatar
                            aria-label="recipe"
                            style={customStyles.avatar}
                            src={ProfilePic}
                          >
                            D
                          </Avatar>
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

                        <Caption media={media} />

                        <Hashtags media={media} />
                      </CardContent>
                      <CardActions>
                        {/* Show like buttons with like counts */}
                        <Like media={media} onLike={this.handleLike}></Like>
                      </CardActions>

                      {/* Show all comments*/}
                      <CardContent>
                        <Comments media={media} />

                        {/*Add new comment */}
                        <AddComment
                          media={media}
                          onComment={this.handleComment}
                          state={this.state}
                          onCommentChange={this.commentChangeHandler}
                        ></AddComment>
                      </CardContent>
                    </Card>
                  </Grid>
                ) : null
              )}
            </Grid>
          </Container>
        </div>
      </>
    );
  }
}

export default Home;
