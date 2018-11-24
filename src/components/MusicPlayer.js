import React, { Component } from 'react';

class MusicPlayer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isPlaying : true
    }
  }
  
  handlePlay = e => {
    e.preventDefault();
    const song = document.querySelector('.audio');
    song.play();
    this.setState({
      isPlaying : true
    })
  }

  handlePause = e => {
    e.preventDefault();
    const song = document.querySelector('.audio');
    this.setState({
      isPlaying : false
    })
    song.pause();
  }
  
  handlePrevious = (e,id) => {
    e.preventDefault();
    console.log(id);
  }

  render() {
    const {currentSong} = this.props;
    
    const {isPlaying} = this.state;
    console.log(currentSong)

    return (
      <div className="player-block">
        <audio src={currentSong.src} controls="controls" autoPlay className="audio"/>
        <div>{currentSong.file.name}</div>
        <div className="music-player">
          <div className="player-function">
            <a href="#" className="player-link" id={currentSong.id} onClick={(e, id) => {this.handlePrevious(e, e.target.id)}}><i class="fas fa-backward"></i></a>
          </div>
          {
            isPlaying ? 
              <div className="player-function">
                <a href="#" className="player-link" onClick={this.handlePause}><i class="fas fa-pause"></i></a>
              </div>
               : 
              <div className="player-function">
                <a href="#" className="player-link" onClick={this.handlePlay}><i class="fas fa-play"></i></a>
              </div>
                  
          }
          <div className="player-function">
            <a href="#" className="player-link"><i class="fas fa-forward"></i></a>
          </div>
        </div>
      </div>
    );
  }
}

export default MusicPlayer;