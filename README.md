# Tunes

It's a simple music player where you can add your music from storage and play them. It also contains a analyzer that analyzes the current song.<br>
This app uses [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API) for playing song and analyzing the frequency of songs.
Live Demo - https://meri-tunes.herokuapp.com/upload

![]('./app-pic1.png')

![]('./src/images/app-pic2.png')

### Start Development Server
* First clone the repo by running `git clone https://github.com/praveen-me/meri-tunes.git`.
* Then go the that directory by running `cd meri-tunes`.
* Run the server by running `npm start`.

## Problem
This music has some issues that make this for incompitable in chrome.

```
InvalidStateError: Failed to execute 'createMediaElementSource' on 'BaseAudioContext': HTMLMediaElement already connected previously to a different MediaElementSourceNode.
```
So, this problem is with chrome that it binds the audio with **createMediaElementSource** and we can't change.
So, if someone have fallback for it then they can check issue and contribute in it.

### Tech Stack Used
* React
* Redux
