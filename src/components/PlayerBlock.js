import React, { Component } from "react";
import { connect } from "react-redux";
import { changeNextandPrevSong } from "../store/actions/action";

class PlayerBlock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPlaying: true
    };
    this.data = {
      context: "",
      src: ""
    };
  }

  componentDidMount() {
    this.setState({
      isPlaying: true
    });
    this.initializeVisualizer();
  }

  handlePlay = e => {
    e.preventDefault();
    const song = document.querySelector(".audio");
    song.play();
    this.setState({
      isPlaying: true
    });
  };

  handlePause = e => {
    e.preventDefault();
    const song = document.querySelector(".audio");
    this.setState({
      isPlaying: false
    });
    song.pause();
  };

  handleSongChange = (e, isNext = true) => {
    e.preventDefault();
    this.props.dispatch(
      changeNextandPrevSong(this.props.currentSong.id, isNext)
    );

    this.setState({
      isPlaying: true
    });
  };

  initializeVisualizer() {
    let context;
    if (this.data.context) {
      context = this.data.context;
    } else {
      this.data.context = new AudioContext();
      context = this.data.context;
    }

    const audio = document.querySelector(".audio");

    if (audio) {
      const analyser = context.createAnalyser();
      let src;

      if (this.data.src) {
        src = this.data.src;
      } else {
        this.data.src = context.createMediaElementSource(audio);
        src = this.data.src;
      }

      const canvas = document.getElementById("canvas");
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        const ctx = canvas.getContext("2d");

        src.connect(analyser);

        analyser.connect(context.destination);

        analyser.fftSize = 512;

        let bufferLength = analyser.frequencyBinCount;
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

          ctx.fillStyle = "#2C3A47";
          ctx.fillRect(0, 0, WIDTH, HEIGHT);

          for (let i = 0; i < bufferLength; i++) {
            barHeight = dataArray[i];

            let r = barHeight + 25 * (i / bufferLength);
            let g = 250 * (i / bufferLength);
            let b = 50;

            ctx.fillStyle = `rgb(${r},${g},${b})`;
            ctx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);

            x += barWidth + 1;
          }
        }
        renderFrame();
      }
    }
  }

  render() {
    const { currentSong } = this.props;
    let { isPlaying } = this.state;

    return (
      <div className="song-player">
        {currentSong.src && (
          <div className="song-animation">
            <img
              src="https://image.flaticon.com/icons/png/128/26/26805.png"
              className={`rotate middle ${!isPlaying && "rotate-stop"}`}
              alt="disc"
            />
            <canvas id="canvas" />
          </div>
        )}
        <div className="player-info">
          {currentSong.src && (
            <div className="player-block">
              <audio
                src={currentSong.src}
                controls="controls"
                autoPlay
                className="audio"
              />
              <div className="song-title">{currentSong.file.name}</div>
              <div className="music-player" id={currentSong.id}>
                <div className="player-function">
                  <button
                    href="#"
                    className="player-link"
                    id={currentSong.id}
                    onClick={e => this.handleSongChange(e, false)}>
                    <i className="fas fa-backward" />
                  </button>
                </div>
                <div className="player-function">
                  <button
                    href="#"
                    className="player-link"
                    onClick={isPlaying ? this.handlePause : this.handlePlay}>
                    <i
                      className={`fas ${isPlaying ? "fa-pause" : "fa-play"}`}
                    />
                  </button>
                </div>
                <div className="player-function">
                  <button
                    href="#"
                    className="player-link"
                    id={currentSong.id}
                    onClick={this.handleSongChange}>
                    <i className="fas fa-forward" />
                  </button>
                </div>
              </div>
              {this.initializeVisualizer()}
            </div>
          )}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentSong: state.currentSong,
    isPlaying: state.isPlaying
  };
}

export default connect(mapStateToProps)(PlayerBlock);
