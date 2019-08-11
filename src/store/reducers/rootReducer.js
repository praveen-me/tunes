const initState = {
  musicList: [],
  currentSong: {},
  isPlaying: false
};

const rootReducer = (state = initState, action) => {
  switch (action.type) {
    case "ADD_LIST": {
      const obj = {
        musicList: action.data
      };
      return {
        ...state,
        musicList: obj.musicList,
        currentSong: action.data[0]
      };
    }
    case "CURRENT_SONG": {
      return {
        ...state,
        currentSong: action.song,
        isPlaying: true
      };
    }
    case "CHANGE_CURRENT_SONG": {
      const songs = state.musicList;
      const { id, isNext } = action.payload;

      let currentSong;

      if (isNext) {
        if (id === songs.length - 1) {
          currentSong = songs[0];
        } else {
          currentSong = songs[id + 1];
        }
      } else {
        if (id === 0) {
          currentSong = songs[songs.length - 1];
        } else {
          currentSong = songs[id - 1];
        }
      }

      return {
        ...state,
        currentSong: currentSong,
        isPlaying: true
      };
    }
    default:
      return state;
  }
};

export default rootReducer;
