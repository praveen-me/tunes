import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom'
import SongBlock from './SongBlock';
import MusicPlayer from './MusicPlayer';
import PlayerBlock from './PlayerBlock';


class Player extends Component {  
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