import React, { Component } from "react";
import "./Home.css";
import { Redirect } from "react-router-dom";
import Header from "../../common/Header";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isHome: true,
    };
  }

  render() {
    return (
      <>
        <Header state={this.state} />
      </>
    );
  }
}

export default Home;
