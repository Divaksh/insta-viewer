import React, { Component } from "react";
import Header from "../../common/Header";
import "../../common/Common.css";
import "./Profile.css";
import { withRouter } from "react-router";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isProfile: true,
      mediaData: [],
      username: "",
      posts: "",
      follows: "10M",
      followedby: "1",
      name: "",
    };
  }

  componentDidMount() {
    localStorage.setItem("homeMediaData", this.props.location.mediaData);
  }

  render() {
    return (
      <>
        <Header state={this.state} />
        <div className="mainContainer"></div>
      </>
    );
  }
}

export default withRouter(Profile);
