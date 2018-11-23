import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import './scss/App.scss';
import Nav from './components/Nav';
import UploadFiles from './components/UploadFiles';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Nav />
          <Switch>
            <UploadFiles />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
