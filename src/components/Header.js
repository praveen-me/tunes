import React, { Component } from "react";
import { connect } from "react-redux";

class Header extends Component {
  render() {
    return (
      <div className="header color-white">
        <h1 className="logo center">Tunes</h1>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    data: state.musicList
  };
}

export default connect(mapStateToProps)(Header);
