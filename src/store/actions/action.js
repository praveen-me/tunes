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

export function setPreviousToCurrent(id) {
  console.log('previous called');
  return {
    type : 'SET_PREVIOUS_TO_CURRENT', 
    id
  }
}
 
export function setNextToCurrent(id) {
  console.log('next called', id);
  return {
    type : 'SET_NEXT_TO_CURRENT', 
    id
  }
}
 