import React, { Component } from 'react';
import {connect} from 'react-redux';
import {addList} from '../store/actions/action'

class UploadFiles extends Component {
  handleSubmit = e => {
    e.preventDefault();
    const input =  document.querySelector('input');

    let musicArray = []
      for(let i = 0; i < input.files.length; i++ ) {
        musicArray.push({
          file : input.files[i],
          src : window.URL.createObjectURL(input.files[i])
        })
      }
    
    this.props.dispatch(addList(musicArray));
    
  }
  
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input type="file" multiple accept="audio/*"/>
          <input type="submit" value="Submit"/>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    musics : state.musicList
  }
}

export default connect(mapStateToProps)(UploadFiles);