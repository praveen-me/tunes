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

    this.handleVisualizer()
  }

  handleNext = e => {
    e.preventDefault();
    console.log(this.state.musicId)
    this.props.dispatch(setNextToCurrent(this.props.currentSong.id))

    this.setState({
      isPlaying : true
    })

    this.handleVisualizer()
  }

  handleVisualizer() {    
    console.log('visualize');
    const context = new AudioContext();
    const audio = document.querySelector('.audio');
    console.log(audio)
    if(audio) {
      const analyser = context.createAnalyser();
      let src = context.createMediaElementSource(audio);
      const canvas = document.getElementById("canvas");
      if(canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        const ctx = canvas.getContext("2d");

        src.connect(analyser);
        analyser.connect(context.destination);

        analyser.fftSize = 512;

        let bufferLength = analyser.frequencyBinCount;
        console.log(bufferLength);
        let dataArray = new Uint8Array(bufferLength);

        const WIDTH = canvas.width;
        const HEIGHT = canvas.height;

        let barWidth = (WIDTH / bufferLength) * 2.5;
        let barHeight;
        let x = 0;

        function renderFrame() {
          requestAnimationFrame(renderFrame);

          x = 0;

          analyser.getByteFrequencyData(dataArray);

          ctx.fillStyle = '#2C3A47';
          ctx.fillRect(0, 0, WIDTH, HEIGHT);

          for (let i = 0; i < bufferLength; i++) {
            barHeight = dataArray[i];
            
            let r = barHeight + (25 * (i/bufferLength));
            let g = 250 * (i/bufferLength);
            let b = 50;

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
          {
            currentSong.src ? (
              <div className="song-animation">
                {
                  isPlaying ?  <img src='https://image.flaticon.com/icons/png/128/26/26805.png' className="rotate"/> :
                  <img src='https://image.flaticon.com/icons/png/128/26/26805.png' className="rotate rotate-stop"/> 
                }
                <canvas id="canvas"></canvas>
              </div>
            )
             : '' 
          }
        
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
                    {this.handleVisualizer()}
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