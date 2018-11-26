import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import './scss/App.scss';
import Header from './components/Header';
import UploadFiles from './components/UploadFiles';
import Player from './components/Player';
class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Header />
          <Switch>
            <Route path="/upload" component={UploadFiles}/>
            <Route path="/" exact component={Player}/>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
