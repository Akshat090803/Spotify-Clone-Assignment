import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentSong: null,
  isPlaying: false,
  volume: 50,
  progress: 0,
  duration: 0,
  isShuffled: false,
  isRepeating: false,
  queue: [],
  currentIndex: 0,
};

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    playSong: (state, action) => {
      state.currentSong = action.payload;
      state.isPlaying = true;
      state.progress = 0;
    },
    togglePlay: (state) => {
      state.isPlaying = !state.isPlaying;
    },
    pausePlay: (state) => {
      state.isPlaying = false;
    },
    setVolume: (state, action) => {
      state.volume = Math.max(0, Math.min(100, action.payload));
    },
    setProgress: (state, action) => {
      state.progress = Math.max(0, action.payload);
    },
    setDuration: (state, action) => {
      state.duration = action.payload;
    },
    nextSong: (state, action) => {
      if (state.queue.length > 0) {
        let nextIndex;
        if (typeof action.payload === 'number') {
          // Shuffle mode with specific index
          nextIndex = action.payload;
        } else if (state.currentIndex < state.queue.length - 1) {
          nextIndex = state.currentIndex + 1;
        } else {
          nextIndex = 0; // Loop back to start
        }
        
        state.currentIndex = nextIndex;
        state.currentSong = state.queue[nextIndex];
        state.progress = 0;
      }
    },
    previousSong: (state) => {
      if (state.queue.length > 0) {
        const prevIndex = state.currentIndex > 0 
          ? state.currentIndex - 1 
          : state.queue.length - 1;
        
        state.currentIndex = prevIndex;
        state.currentSong = state.queue[prevIndex];
        state.progress = 0;
      }
    },
    toggleShuffle: (state) => {
      state.isShuffled = !state.isShuffled;
    },
    toggleRepeat: (state) => {
      state.isRepeating = !state.isRepeating;
    },
    setQueue: (state, action) => {
      const { songs, startIndex = 0 } = action.payload;
      state.queue = songs;
      state.currentIndex = Math.max(0, Math.min(startIndex, songs.length - 1));
      if (songs.length > 0) {
        state.currentSong = songs[state.currentIndex];
      }
    },
  },
});

export const {
  playSong,
  togglePlay,
  pausePlay,
  setVolume,
  setProgress,
  setDuration,
  nextSong,
  previousSong,
  toggleShuffle,
  toggleRepeat,
  setQueue,
} = playerSlice.actions;

export default playerSlice.reducer;