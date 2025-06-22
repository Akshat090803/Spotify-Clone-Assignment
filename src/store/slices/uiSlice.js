import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentView: 'home',
  searchQuery: '',
  isSidebarCollapsed: false,
  showCreatePlaylist: false,
  selectedPlaylist: null,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setCurrentView: (state, action) => {
      state.currentView = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    toggleSidebar: (state) => {
      state.isSidebarCollapsed = !state.isSidebarCollapsed;
    },
    setShowCreatePlaylist: (state, action) => {
      state.showCreatePlaylist = action.payload;
    },
    setSelectedPlaylist: (state, action) => {
      state.selectedPlaylist = action.payload;
    },
  },
});

export const {
  setCurrentView,
  setSearchQuery,
  toggleSidebar,
  setShowCreatePlaylist,
  setSelectedPlaylist,
} = uiSlice.actions;

export default uiSlice.reducer;