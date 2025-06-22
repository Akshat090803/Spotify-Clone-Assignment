import { useSelector, useDispatch } from 'react-redux';
import { Music, Album } from 'lucide-react';
import { playSong, setQueue } from '../../store/slices/playerSlice';
import { addToRecent } from '../../store/slices/playlistSlice';
import SongItem from '../Common/SongItem';

const Search = () => {
  const dispatch = useDispatch();
  const { searchQuery } = useSelector(state => state.ui);
  const { searchResults, genres } = useSelector(state => state.music);

  const handlePlaySong = (song, songsArray) => {
    const songIndex = songsArray.findIndex(s => s.id === song.id);
    dispatch(setQueue({ songs: songsArray, startIndex: songIndex }));
    dispatch(playSong(song));
    dispatch(addToRecent(song.id));
  };

  if (!searchQuery) {
    return (
      <div className="search-view">
        <h1 className="search-title">Browse all</h1>
        <div className="genre-browse-grid">
          {genres.slice(1).map((genre, index) => (
            <div 
              key={genre} 
              className={`genre-card genre-color-${(index % 6) + 1}`}
            >
              <h3 className="genre-card-title">{genre}</h3>
              <Music className="genre-card-icon" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  const { songs = [], albums = [] } = searchResults;

  return (
    <div className="search-view">
      <h1 className="search-title">Search results for "{searchQuery}"</h1>

      {songs.length === 0 && albums.length === 0 && (
        <div className="no-results">
          <Music className="no-results-icon" />
          <p className="no-results-text">No results found for "{searchQuery}"</p>
          <p className="no-results-subtitle">Please make sure your words are spelled correctly or use less or different keywords.</p>
        </div>
      )}

      {songs.length > 0 && (
        <section className="search-section">
          <h2 className="section-title">Songs</h2>
          <div className="song-list">
            {songs.map((song, index) => (
              <SongItem
                key={song.id}
                song={song}
                index={index + 1}
                onPlay={() => handlePlaySong(song, songs)}
              />
            ))}
          </div>
        </section>
      )}

      {albums.length > 0 && (
        <section className="search-section">
          <h2 className="section-title">Albums</h2>
          <div className="card-grid">
            {albums.map(album => (
              <div key={album.id} className="music-card">
                <div className="card-image-container">
                  <img src={album.cover} alt={album.title} className="card-image" />
                  <button className="card-play-button">
                    <Album className="play-icon" />
                  </button>
                </div>
                <div className="card-content">
                  <h3 className="card-title">{album.title}</h3>
                  <p className="card-subtitle">{album.artist}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default Search;