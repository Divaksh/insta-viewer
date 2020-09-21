import React, { Component } from "react";

//Local resources
import "./Home.css";
import Header from "../../common/header/Header";
import Caption from "../../common/media/Caption";
import Hashtags from "../../common/media/Hashtags";
import Like from "../../common/media/Like";
import Comments from "../../common/media/Comments";
import AddComment from "../../common/media/AddComment";
import ProfilePic from "../../assets/ProfilePic.jpg";
import "../../common/Common.css";

//lib resources
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
  avatar: {
    backgroundColor: red[500],
  },
};

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isHome: true,
      mediaData: [],
    };
  }

  //Get data from the API and set it to state
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
            commentRequired: false,
          },
        ],
      })
    );
    //sets like state in browser storage for futher use
    localStorage.setItem("homeMediaData", JSON.stringify(this.state.mediaData));
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
    } else {
      const comment = media.comment;
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
                media.caption
                  .split("\n")[0]
                  .toLowerCase()
                  .includes(this.state.keyword.toLowerCase()) ? (
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
                      {/* Show media*/}
                      <CardMedia
                        style={customStyles.media}
                        image={media.media_url}
                        title={media.caption}
                      />

                      <Divider variant="middle" className="divider" />
                      <CardContent>
                        {/* Show media caption */}
                        <Caption media={media} />
                        {/* Show media hashtags */}
                        <Hashtags media={media} />

                        {/* Show like buttons with like counts */}
                        <Like media={media} onLike={this.handleLike}></Like>
                        {/* Show all comments*/}
                        <Comments media={media} />
                      </CardContent>
                      <CardActions style={{ padding: "15px" }}>
                        {/*Add new comment */}
                        <AddComment
                          media={media}
                          onComment={this.handleComment}
                          onCommentChange={this.commentChangeHandler}
                        ></AddComment>
                      </CardActions>
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
