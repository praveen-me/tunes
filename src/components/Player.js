import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom'
import SongBlock from './SongBlock';
import MusicPlayer from './MusicPlayer';


class Player extends Component {

  handleClick = e => {
    // e.preventDefault();
    const audio = document.querySelector('.audio');
    console.log('clicked')
    console.log(audio)
    audio.play();
  }


  
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
        <div className="song-player">
          <div className="song-animation">

          </div>
          <div className="player-info">
              {
                currentSong.src ?  <MusicPlayer currentSong={currentSong}/> : ''

              }
          </div>
        </div>
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