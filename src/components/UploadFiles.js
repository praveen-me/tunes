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
    this.props.history.push('/');
  }
  
  render() {
    return (
      <div className="upload-files set-bg">
        <form onSubmit={this.handleSubmit} className="upload-files-form middle center">
          <div className="input-container btn">
            Click to upload files
            <input type="file" className="select-files" accept="audio/*" multiple/>
          </div>
          <input type="submit" className="btn submit-btn" value="Submit"/>
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