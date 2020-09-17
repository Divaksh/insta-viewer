import React, { Component } from "react";
import Header from "../../common/Header";
import "../../common/Common.css";
import "./Profile.css";

class Profile extends Component {
  state = {
    isProfile: true,
  };
  render() {
    return (
      <>
        <Header state={this.state} />
      </>
    );
  }
}

export default Profile;
