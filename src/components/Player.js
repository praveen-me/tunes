import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom'
import SongBlock from './SongBlock';
import MusicPlayer from './MusicPlayer';
import PlayerBlock from './PlayerBlock';


class Player extends Component {

  handleClick = e => {
    // e.preventDefault();
    const audio = document.querySelector('.audio');
    console.log('clicked')
    console.log(audio)
    audio.play();
  }

  // handleVisualizer() {      
  //   var context = new AudioContext();
  //   const audio = document.querySelector('.audio');
  //   if(audio) {
  //     var src = context.createMediaElementSource(audio);
  //     var analyser = context.createAnalyser();

  //     var canvas = document.getElementById("canvas");
  //   if(canvas) {
  //     canvas.width = window.innerWidth;
  //     canvas.height = window.innerHeight;
  //     var ctx = canvas.getContext("2d");

  //     src.connect(analyser);
  //     analyser.connect(context.destination);

  //     analyser.fftSize = 256;

  //     var bufferLength = analyser.frequencyBinCount;
  //     console.log(bufferLength);

  //     var dataArray = new Uint8Array(bufferLength);

  //     var WIDTH = canvas.width;
  //     var HEIGHT = canvas.height;

  //     var barWidth = (WIDTH / bufferLength) * 2.5;
  //     var barHeight;
  //     var x = 0;

  //     function renderFrame() {
  //       requestAnimationFrame(renderFrame);

  //       x = 0;

  //       analyser.getByteFrequencyData(dataArray);

  //       ctx.fillStyle = "#000";
  //       ctx.fillRect(0, 0, WIDTH, HEIGHT);

  //       for (var i = 0; i < bufferLength; i++) {
  //         barHeight = dataArray[i];
          
  //         var r = barHeight + (25 * (i/bufferLength));
  //         var g = 250 * (i/bufferLength);
  //         var b = 50;

  //         ctx.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
  //         ctx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);

  //         x += barWidth + 1;
  //       }
  //     }
  //     renderFrame();
  //   }
  //   }
   

    
  // }
  
  render() {
    const {songList, currentSong} = this.props;
    console.log(currentSong)
    if(!songList.length) return <Redirect to="/upload"/>
    
    return (
      <div className="player set-bg">
        <div className="songs-list">
          <div className="header-container">
            <h1 className="song-list-header center">
              Song List
            </h1>
          </div>
          {
            songList && songList.map(song => (
              <SongBlock key={song.src} song={song}/>      
            ))
          } 
        </div>
        {/* <div className="song-player">
          <div className="song-animation">
            <audio src={currentSong.src} className="audio" controls="controls" autoPlay></audio>
            <canvas id="canvas"></canvas>
            {this.handleVisualizer()}
          </div>
          <div className="player-info">
              {
                currentSong.src ?  <MusicPlayer currentSong={currentSong}/> : ''
              }
          </div>
        </div> */}
        <PlayerBlock />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    songList : state.musicList,
    currentSong : state.currentSong
  }
}

export default connect(mapStateToProps)(Player);