import { useSelector, useDispatch } from 'react-redux';
import { Search, ChevronLeft, ChevronRight, User } from 'lucide-react';
import { setSearchQuery, setCurrentView } from '../../store/slices/uiSlice';
import { setSearchResults, clearSearch } from '../../store/slices/musicSlice';

const Header = () => {
  const dispatch = useDispatch();
  const { searchQuery, currentView } = useSelector(state => state.ui);
  const { songs, albums } = useSelector(state => state.music);

  const handleSearch = (query) => {
    dispatch(setSearchQuery(query));
    
    if (query.trim() === '') {
      dispatch(clearSearch());
      return;
    }

    const searchLower = query.toLowerCase();
    const filteredSongs = songs.filter(song =>
      song.title.toLowerCase().includes(searchLower) ||
      song.artist.toLowerCase().includes(searchLower) ||
      song.album.toLowerCase().includes(searchLower) ||
      song.genre.toLowerCase().includes(searchLower)
    );

    const filteredAlbums = albums.filter(album =>
      album.title.toLowerCase().includes(searchLower) ||
      album.artist.toLowerCase().includes(searchLower) ||
      album.genre.toLowerCase().includes(searchLower)
    );

    dispatch(setSearchResults({ songs: filteredSongs, albums: filteredAlbums }));
    
    if (currentView !== 'search') {
      dispatch(setCurrentView('search'));
    }
  };

  return (
    <header className="header">
      <div className="header-left">
        <div className="navigation-buttons">
          <button className="nav-btn" disabled>
            <ChevronLeft className="nav-icon" />
          </button>
          <button className="nav-btn" disabled>
            <ChevronRight className="nav-icon" />
          </button>
        </div>

        <div className="search-container">
          <Search className="search-icon" />
          <input
            type="text"
            placeholder="What do you want to listen to?"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      <div className="header-right">
        <div className="user-menu">
          <button className="user-button">
            <User className="user-icon" />
            <span>Profile</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;