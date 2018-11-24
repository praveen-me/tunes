import React, { Component } from 'react';
import { addCurrentSong } from '../store/actions/action';
import {connect} from 'react-redux'

class SongBlock extends Component {
  handleClick = (e) => {
    e.preventDefault();
    this.props.dispatch(addCurrentSong(this.props.song))
  }

  render() {
    const {song} = this.props;
    return (
      <div className="song-block">
        <div song="song-title-container">
          <h3>
            <a href="/" onClick={this.handleClick}>{song.file.name}</a>
          </h3>
        </div>
      </div>
    );
  }
}


export default connect()(SongBlock);