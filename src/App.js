import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import './App.css';
import Nav from './components/Nav';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Nav />
        </div>
      </Router>
    );
  }
}

export default App;
