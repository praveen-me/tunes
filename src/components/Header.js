import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux'

class Header extends Component {
  render() {
    const {data} = this.props;
    console.log(data, "data");
    return (
      <div className="header color-white">
        <h1 className="logo center" >Tunes</h1>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    data : state.musicList
  }
}

export default connect(mapStateToProps)(Header);