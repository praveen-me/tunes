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

      currentSong = isNext
        ? id === songs.length - 1
          ? songs[0]
          : songs[id + 1]
        : id === 0
        ? songs[songs.length - 1]
        : songs[id - 1];

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
