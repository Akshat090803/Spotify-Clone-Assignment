import { createSlice } from '@reduxjs/toolkit';

const initialState = {
playlists: [
  {
    id: 1,
    name: 'Liked Songs',
    description: 'Your favorite tracks',
    cover: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=300',
    songs: [], 
    isLiked: true,
  },
  {
    id: 2,
    name: 'Bollywood Chill',
    description: 'Relaxing Hindi melodies for a serene mood',
    cover: 'https://yt3.googleusercontent.com/YqR7e9IYCcItVEEtywfHZn9T18BUZXL9S_IESmlCwOyV9CrC7O9-KOvhajXrFL0FxYA1Nk0kjts=s1200', 
    songs: [3, 5, 7, 8, 9], // Kesariya, Malang, Tere Bin Nahi Laage, Dil Bechara, Channa Mereya
  },
  {
    id: 3,
    name: 'Punjabi Bhangra Bash',
    description: 'High-energy Punjabi hits to get you dancing',
    cover: 'https://mir-s3-cdn-cf.behance.net/projects/max_808/b1d9a4117524241.Y3JvcCw4MDgsNjMyLDAsMA.jpg',
    songs: [2, 4, 6, 12, 13, 14], // Levels, Brown Munde, Excuses, Lamberghini, Kala Chashma, Bijlee Bijlee
  },
  {
    id: 4,
    name: 'Workout Bollywood',
    description: 'Upbeat Hindi tracks for your workout session',
    cover: 'https://i.ytimg.com/vi/9WXsdApQIY4/maxresdefault.jpg', 
    songs: [10, 17, 13], // Ghungroo, Jai Jai Shivshankar, Kala Chashma 
  },
  {
    id: 5,
    name: 'Romantic Punjabi',
    description: 'Soulful Punjabi love songs',
    cover: 'https://i.scdn.co/image/ab67706f00000002b21b11a1dbd566bc02607e46', 
    songs: [1, 11, 15], // With You, Obsessed, Pasoori
  },
],
  likedSongs: [1, 3, 7],
  recentlyPlayed: [],
};

const playlistSlice = createSlice({
  name: 'playlist',
  initialState,
  reducers: {
    createPlaylist: (state, action) => {
      const newPlaylist = {
        id: Date.now(),
        name: action.payload.name,
        description: action.payload.description || '',
        cover: action.payload.cover || 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=300',
        songs: [],
      };
      state.playlists.push(newPlaylist);
    },
    addToPlaylist: (state, action) => {
      const { playlistId, songId } = action.payload;
      const playlist = state.playlists.find(p => p.id === playlistId);
      if (playlist && !playlist.songs.includes(songId)) {
        playlist.songs.push(songId);
      }
    },
    removeFromPlaylist: (state, action) => {
      const { playlistId, songId } = action.payload;
      const playlist = state.playlists.find(p => p.id === playlistId);
      if (playlist) {
        playlist.songs = playlist.songs.filter(id => id !== songId);
      }
    },
    toggleLike: (state, action) => {
      const songId = action.payload;
      const isLiked = state.likedSongs.includes(songId);
      if (isLiked) {
        state.likedSongs = state.likedSongs.filter(id => id !== songId);
        const likedPlaylist = state.playlists.find(p => p.isLiked);
        if (likedPlaylist) {
          likedPlaylist.songs = likedPlaylist.songs.filter(id => id !== songId);
        }
      } else {
        state.likedSongs.push(songId);
        const likedPlaylist = state.playlists.find(p => p.isLiked);
        if (likedPlaylist) {
          likedPlaylist.songs.push(songId);
        }
      }
    },
    addToRecent: (state, action) => {
      const songId = action.payload;
      state.recentlyPlayed = state.recentlyPlayed.filter(id => id !== songId);
      state.recentlyPlayed.unshift(songId);
      if (state.recentlyPlayed.length > 20) {
        state.recentlyPlayed = state.recentlyPlayed.slice(0, 20);
      }
    },
  },
});

export const {
  createPlaylist,
  addToPlaylist,
  removeFromPlaylist,
  toggleLike,
  addToRecent,
} = playlistSlice.actions;

export default playlistSlice.reducer;