import React, { Component, Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./scss/App.scss";
import Header from "./components/Header";
import UploadFiles from "./components/UploadFiles";
const Player = lazy(() => import("./components/Player"));
// import Player from "./components/Player";

class App extends Component {
  render() {
    return (
      <Router>
        <>
          <Header />
          <Switch>
            <Suspense fallback={"Loading..."}>
              <Route path="/upload" component={UploadFiles} />
              <Route path="/" exact component={Player} />
            </Suspense>
          </Switch>
        </>
      </Router>
    );
  }
}

export default App;
