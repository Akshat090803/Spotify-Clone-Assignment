import { configureStore } from '@reduxjs/toolkit';
import playerReducer from './slices/playerSlice';
import playlistReducer from './slices/playlistSlice';
import musicReducer from './slices/musicSlice';
import uiReducer from './slices/uiSlice';

export const store = configureStore({
  reducer: {
    player: playerReducer,
    playlist: playlistReducer,
    music: musicReducer,
    ui: uiReducer,
  },
});