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
      response: [],
    };
  }

  async componentDidMount() {
    const accessToken = this.props.apiDetails.accessToken;
    const endPoint = this.props.apiDetails.mediaList + accessToken;
    const { data: response } = await axios.get(endPoint);
    console.log(response.data);
    this.setState({ response: response.data });
    console.table(this.state.response[1]);
  }

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
              {this.state.response.map((data) => (
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
                    title={data.username}
                    subheader={data.timestamp}
                  />
                  <CardMedia
                    style={customStyles.media}
                    image={data.media_url}
                    title={data.caption}
                  />
                  <CardContent>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      {data.caption}
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
