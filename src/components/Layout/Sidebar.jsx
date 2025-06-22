import { useSelector, useDispatch } from 'react-redux';
import { Home, Search, Library, Plus, Heart, Music, User } from 'lucide-react';
import { setCurrentView, setShowCreatePlaylist } from '../../store/slices/uiSlice';

const Sidebar = () => {
  const dispatch = useDispatch();
  const { currentView } = useSelector(state => state.ui);
  const { playlists } = useSelector(state => state.playlist);

  const navigationItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'search', label: 'Search', icon: Search },
    { id: 'library', label: 'Your Library', icon: Library },
  ];

  const handleNavigation = (view) => {
    dispatch(setCurrentView(view));
  };

  const handleCreatePlaylist = () => {
    dispatch(setShowCreatePlaylist(true));
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="logo">
          <Music className="logo-icon" />
          <span className="logo-text">Spotify Clone</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        <ul className="nav-list">
          {navigationItems.map(item => (
            <li key={item.id} className="nav-item">
              <button
                className={`nav-button ${currentView === item.id ? 'active' : ''}`}
                onClick={() => handleNavigation(item.id)}
              >
                <item.icon className="nav-icon" />
                <span className="nav-text">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="sidebar-section">
        <div className="section-header">
          <button
            className="create-playlist-btn"
            onClick={handleCreatePlaylist}
          >
            <Plus className="plus-icon" />
            <span>Create Playlist</span>
          </button>
        </div>

        <div className="playlist-list">
          {playlists.map(playlist => (
            <button
              key={playlist.id}
              className="playlist-item"
              onClick={() => handleNavigation(`playlist-${playlist.id}`)}
            >
              {playlist.isLiked ? (
                <div className="liked-songs-icon">
                  <Heart className="heart-icon" />
                </div>
              ) : (
                <img src={playlist.cover} alt={playlist.name} className="playlist-cover" />
              )}
              <div className="playlist-info">
                <span className="playlist-name">{playlist.name}</span>
                <span className="playlist-description">{playlist.description}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;