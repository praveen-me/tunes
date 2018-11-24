export function addList (data) {
  return {
    type : "ADD_LIST",
    data 
  }
}

export function addCurrentSong(song) {
  console.log('song changed')
  return {
    type : "CURRENT_SONG",
    song
  }
}
 