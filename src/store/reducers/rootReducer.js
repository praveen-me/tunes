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
      console.log(action.song)
      return {
        ...state, 
        currentSong : action.song
      }
    }
    case "SET_PREVIOUS_TO_CURRENT" : {
      const previousSong = [...state.musicList];
      const id = action.id - 1;

      return {
        ...state,
        currentSong : previousSong[id]
      }
    }
    case "SET_NEXT_TO_CURRENT" : {
      const nextSong = [...state.musicList];
      const id = action.id + 1;
      console.log(action.id)

      return {
        ...state,
        // currentSong : previousSong[id]
      }
    }
    default : return state;
  }
}

export default rootReducer;