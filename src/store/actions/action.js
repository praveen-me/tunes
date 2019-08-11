export function addList(data) {
  return {
    type: "ADD_LIST",
    data
  };
}

export function addCurrentSong(song) {
  return {
    type: "CURRENT_SONG",
    song
  };
}

export const changeNextandPrevSong = (id, isNext) => ({
  type: "CHANGE_CURRENT_SONG",
  payload: {
    id,
    isNext
  }
});
