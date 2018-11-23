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
    default : return state;
  }
}

export default rootReducer;