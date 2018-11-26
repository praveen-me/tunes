import React, { Component } from 'react';
import {connect} from 'react-redux';
import { setPreviousToCurrent, setNextToCurrent } from '../store/actions/action';


class PlayerBlock extends Component {
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

  handleVisualizer() {      
    var context = new AudioContext();
    const audio = document.querySelector('.audio');
    if(audio) {
      var src = context.createMediaElementSource(audio);
      var analyser = context.createAnalyser();

      var canvas = document.getElementById("canvas");
    if(canvas) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      var ctx = canvas.getContext("2d");

      src.connect(analyser);
      analyser.connect(context.destination);

      analyser.fftSize = 256;

      var bufferLength = analyser.frequencyBinCount;
      console.log(bufferLength);
      var dataArray = new Uint8Array(bufferLength);

      var WIDTH = canvas.width;
      var HEIGHT = canvas.height;

      var barWidth = (WIDTH / bufferLength) * 2.5;
      var barHeight;
      var x = 0;

      function renderFrame() {
        requestAnimationFrame(renderFrame);

        x = 0;

        analyser.getByteFrequencyData(dataArray);

        ctx.fillStyle = "#000";
        ctx.fillRect(0, 0, WIDTH, HEIGHT);

        for (var i = 0; i < bufferLength; i++) {
          barHeight = dataArray[i];
          
          var r = barHeight + (25 * (i/bufferLength));
          var g = 250 * (i/bufferLength);
          var b = 50;

          ctx.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
          ctx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);

          x += barWidth + 1;
        }
      }
      renderFrame();
      }
    }
  }

  render() {
    const {currentSong} = this.props;
    const {isPlaying} = this.state;

    return (
      <div className="song-player">
        <div className="song-animation">
          {
            currentSong.src ? <canvas id="canvas">{this.handleVisualizer()}</canvas>
             : ''
          }
        </div>
        <div className="player-info">
            {
              currentSong.src ?  (
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
              ) : ''
            }
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentSong : state.currentSong,
    isPlaying : state.isPlaying
  }
}

export default connect(mapStateToProps)(PlayerBlock);