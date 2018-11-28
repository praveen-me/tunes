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

      const set = new Set([...state.musicList, ...action.data]);
      console.log(set);

      return {
        ...state,
        musicList : obj.musicList,
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
      const songs = [...state.musicList];
      const id = action.id;
      let previousSong;
      
      if(id === 0) {
        previousSong = songs[songs.length - 1]
      } else {
        previousSong = songs[id - 1];
      }


      return {
        ...state,
        currentSong : previousSong, 
        isPlaying : true
      }
    }
    case "SET_NEXT_TO_CURRENT" : {
      const songs = [...state.musicList];
      const id = action.id;
      
      let previousSong;
      if(id === songs.length - 1) {
        previousSong = songs[0]
      } else {
        previousSong = songs[id + 1];
      }


      return {
        ...state,
        currentSong : previousSong, 
        isPlaying : true
      }
    }
    default : return state;
  }
}

export default rootReducer;