import React, { Component } from "react";
import "./Home.css";
import Header from "../../common/Header";
import axios from "axios";

class Home extends Component {
  constructor() {
    super();
    this.state = {
      isHome: true,
    };
  }

  async componentDidMount() {
    const accessToken = this.props.apiDetails.accessToken;
    const endPoint = this.props.apiDetails.mediaList + accessToken;
    const data = await axios.get(endPoint);
    console.log(data);
  }
  z;
  render() {
    return (
      <>
        <Header state={this.state} />
      </>
    );
  }
}

export default Home;
