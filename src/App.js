import React, { Component, Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./scss/App.scss";
import Header from "./components/Header";
import UploadFiles from "./components/UploadFiles";
import Loader from "./components/Loader";
const Player = lazy(() => import("./components/Player"));

class App extends Component {
  render() {
    return (
      <Router>
        <>
          <Header />
          <Switch>
            <Suspense fallback={<Loader />}>
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
