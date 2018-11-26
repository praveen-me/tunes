const initState = {
  musicList : [],
  currentSong : {}, 
  isPlaying : false
}

const rootReducer = (state = initState, action) => {
  switch(action.type) {
    case "ADD_LIST" : {
      var obj = {
        musicList : action.data
      }

      let firstItem = action.data[0]

      return {
        ...state,
        ...obj,
        currentSong : firstItem
      };
    }
    case "CURRENT_SONG" : {
      console.log(action.song)
      return {
        ...state, 
        currentSong : action.song, 
        isPlaying : true
      }
    }
    case "SET_PREVIOUS_TO_CURRENT" : {
      const previousSong = [...state.musicList];
      const id = action.id - 1;

      return {
        ...state,
        currentSong : previousSong[id], 
        isPlaying : true
      }
    }
    case "SET_NEXT_TO_CURRENT" : {
      const nextSong = [...state.musicList];
      const id = action.id + 1;
      console.log(action.id)

      return {
        ...state,
        currentSong : nextSong[id], 
        isPlaying : true
      }
    }
    default : return state;
  }
}

export default rootReducer;