import { useSelector } from 'react-redux';
import Home from '../Views/Home';
import Search from '../Views/Search';
import Library from '../Views/Library';
import PlaylistView from '../Views/PlaylistView';

const MainContent = () => {
  const { currentView } = useSelector(state => state.ui);

  const renderView = () => {
    if (currentView.startsWith('playlist-')) {
      const playlistId = parseInt(currentView.split('-')[1]);
      return <PlaylistView playlistId={playlistId} />;
    }

    switch (currentView) {
      case 'home':
        return <Home />;
      case 'search':
        return <Search />;
      case 'library':
        return <Library />;
      default:
        return <Home />;
    }
  };

  return (
    <main className="main-content">
      {renderView()}
    </main>
  );
};

export default MainContent;