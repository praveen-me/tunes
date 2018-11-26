import React, { Component } from 'react';
import { setPreviousToCurrent, setNextToCurrent } from '../store/actions/action';
import {connect} from 'react-redux';

class MusicPlayer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isPlaying : this.props.isPlaying, 
      musicId : this.props.currentSong.id
    }
  }

  componentDidMount() {
    this.setState({
      isPlaying : true
    })
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
  
  handlePrevious = e => {
    e.preventDefault();
    this.props.dispatch(setPreviousToCurrent(this.props.currentSong.id))

    this.setState({
      isPlaying : true
    })
  }

  handleNext = e => {
    e.preventDefault();
    console.log(this.state.musicId)
    this.props.dispatch(setNextToCurrent(this.props.currentSong.id))

    this.setState({
      isPlaying : true
    })
  }

  render() {
    const {currentSong} = this.props;
    const {isPlaying} = this.state;
    console.log(isPlaying)
    // currentSong = true;

    return (
      <div className="player-block">
        <audio src={currentSong.src} controls="controls" autoPlay className="audio"/>
        <div className="song-title">{currentSong.file.name}</div>
        <div className="music-player" id={currentSong.id}>
          <div className="player-function">
            <a href="#" className="player-link" 
            id={currentSong.id} 
            onClick={this.handlePrevious}>
              <i className="fas fa-backward"></i>
            </a>
          </div>
          {
            isPlaying ? 
              <div className="player-function">
                <a href="#" className="player-link" onClick={this.handlePause}><i className="fas fa-pause"></i></a>
              </div>
               : 
              <div className="player-function">
                <a href="#" className="player-link" onClick={this.handlePlay}><i className="fas fa-play"></i></a>
              </div>
                  
          }
          <div className="player-function">
            <a href="#" className="player-link" id={currentSong.id} onClick={this.handleNext}><i className="fas fa-forward"></i></a>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isPlaying : state.isPlaying
  }
}

export default connect(mapStateToProps)(MusicPlayer);