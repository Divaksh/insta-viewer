import React, { Component } from "react";
import "./Home.css";
import Header from "../../common/Header";
import "../../common/Common.css";
import axios from "axios";

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

import ProfilePic from "../../assets/ProfilePic.jpg";

import Grid from "@material-ui/core/Grid";

const customStyles = {
  root: {
    maxWidth: 345,
  },
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
  mainContainer: {
    marginTop: 100,
  },
};

class Home extends Component {
  constructor() {
    super();
    this.state = {
      isHome: true,
      mediaData: [],
      likes: [],
    };
  }

  async componentDidMount() {
    const accessToken = this.props.apiDetails.accessToken;
    const endPoint = this.props.apiDetails.mediaList + accessToken;
    const { data: response } = await axios.get(endPoint);
    //Set mediaData state with api response
    this.setState({ mediaData: response.data });

    //Set likes count for each media in the state
    this.state.mediaData.map((media) =>
      this.setState({
        likes: [
          ...this.state.likes,
          { id: media.id, count: Math.floor(Math.random() * 20) },
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

  render() {
    return (
      <>
        <Header state={this.state} />
        <div className="mainContainer">
          <Grid
            container
            spacing={2}
            alignContent="center"
            justify="flex-start"
            direction="row"
          >
            <Grid item xs={6}>
              {this.state.mediaData.map((media) => (
                <Card style={customStyles.root}>
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
                  <CardContent>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      {media.caption}
                    </Typography>
                  </CardContent>
                  <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites">
                      <FavoriteIcon />
                    </IconButton>
                  </CardActions>
                </Card>
              ))}
            </Grid>
          </Grid>
        </div>
      </>
    );
  }
}

export default Home;
