const initState = {
  musicList : [],
  currentSong : {}
}

const rootReducer = (state = initState, action) => {
  switch(action.type) {
    case "ADD_LIST" : {
      var obj = {
        musicList : action.data
      }

      return {
        ...state,
        ...obj
      };
    }
    case "CURRENT_SONG" : {
      return {
        ...state, 
        currentSong : action.song
      }
    }
    default : return state;
  }
}

export default rootReducer;