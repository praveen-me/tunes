import React, { Component } from "react";
import "./../scss/loader.scss";

class Loader extends Component {
  render() {
    return (
      <div className="lds-css ng-scope">
        <div className="lds-double-ring">
          <div />
          <div />
        </div>
      </div>
    );
  }
}

export default Loader;
