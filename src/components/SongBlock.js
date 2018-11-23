import React, { Component } from 'react';

class SongBlock extends Component {
  handleClick = (e) => {
    e.preventDefault();
    console.log(this.props.song, "song")
  }

  render() {
    const {song} = this.props;
    console.log(this.props.song);
    return (
      <div className="song-block">
        <div song="song-title-container">
          <h3>
            <a href="#" onClick={this.handleClick}>{song.file.name}</a>
          </h3>
        </div>
      </div>
    );
  }
}

export default SongBlock;