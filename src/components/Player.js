import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import SongBlock from "./SongBlock";
import PlayerBlock from "./PlayerBlock";

class Player extends Component {
  constructor() {
    super();
    this.state = {
      isPlayListOpen: false
    };
  }

  toggleOpenPlayList = () => {
    this.setState({
      isPlayListOpen: !this.state.isPlayListOpen
    });
  };

  render() {
    const { songList } = this.props;
    if (!songList.length) return <Redirect to="/upload" />;

    return (
      <>
        <button className="toggle-list" onClick={this.toggleOpenPlayList}>
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwBAMAAAClLOS0AAAAG1BMVEVHcEz///////////////////////////////8W/R0OAAAACHRSTlMA3+RJ3uJKSCwm5ugAAAAmSURBVDjLY2AYwSCxAwMIgyUiMCWa8EuYYEq4j4bVaFiNhhV1AQCLvXqqaLagFAAAAABJRU5ErkJggg=="
            alt="Toggle Play List"
          />
        </button>
        <div className="player set-bg">
          <div
            className={`songs-list ${
              this.state.isPlayListOpen ? "open" : "close"
            }`}>
            <div className="header-container">
              <h1 className="song-list-header center">Song List</h1>
            </div>
            {songList &&
              songList.map((song, index) => (
                <SongBlock key={song.src} song={song} index={index} />
              ))}
          </div>
          <PlayerBlock />
        </div>
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    songList: state.musicList,
    currentSong: state.currentSong
  };
}

export default connect(mapStateToProps)(Player);
