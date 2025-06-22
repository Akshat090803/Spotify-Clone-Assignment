import { useSelector, useDispatch } from 'react-redux';
import { Play, Clock } from 'lucide-react';
import { playSong, setQueue } from '../../store/slices/playerSlice';
import { addToRecent } from '../../store/slices/playlistSlice';
import { setCurrentGenre } from '../../store/slices/musicSlice';
import SongItem from '../Common/SongItem';

const Home = () => {
  const dispatch = useDispatch();
  const { songs, genres, currentGenre } = useSelector(state => state.music);
  const { recentlyPlayed } = useSelector(state => state.playlist);

  const recentSongs = recentlyPlayed.map(id => songs.find(song => song.id === id)).filter(Boolean);
  
  const filteredSongs = currentGenre === 'All' 
    ? songs 
    : songs.filter(song => song.genre === currentGenre);

  const featuredSongs = filteredSongs.slice(0, 8);
  const popularSongs = [...filteredSongs].sort(() => Math.random() - 0.5).slice(0, 8);

  const handlePlaySong = (song, songsArray) => {
    const songIndex = songsArray.findIndex(s => s.id === song.id);
    dispatch(setQueue({ songs: songsArray, startIndex: songIndex }));
    dispatch(playSong(song));
    dispatch(addToRecent(song.id));
  };

  const handleGenreFilter = (genre) => {
    dispatch(setCurrentGenre(genre));
  };

  return (
    <div className="home-view">
      <div className="home-header">
        <h1 className="home-title">Good evening</h1>
      </div>

      {/* Genre Filter */}
      <div className="genre-filter">
        <div className="genre-pills">
          {genres.map(genre => (
            <button
              key={genre}
              className={`genre-pill ${currentGenre === genre ? 'active' : ''}`}
              onClick={() => handleGenreFilter(genre)}
            >
              {genre}
            </button>
          ))}
        </div>
      </div>

      {/* Recently Played */}
      {recentSongs.length > 0 && (
        <section className="home-section">
          <h2 className="section-title">Recently Played</h2>
          <div className="featured-grid">
            {recentSongs.slice(0, 6).map(song => (
              <div 
                key={song.id} 
                className="featured-item"
                onClick={() => handlePlaySong(song, recentSongs)}
              >
                <img src={song.cover} alt={song.title} className="featured-cover" />
                <span className="featured-title">{song.title}</span>
                <div className="play-overlay">
                  <Play className="play-icon" />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Featured Music */}
      <section className="home-section">
        <h2 className="section-title">Made for you</h2>
        <div className="card-grid">
          {featuredSongs.map(song => (
            <div 
              key={song.id} 
              className="music-card"
              onClick={() => handlePlaySong(song, featuredSongs)}
            >
              <div className="card-image-container">
                <img src={song.cover} alt={song.title} className="card-image" />
                <button className="card-play-button">
                  <Play className="play-icon" />
                </button>
              </div>
              <div className="card-content">
                <h3 className="card-title">{song.title}</h3>
                <p className="card-subtitle">{song.artist}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Popular Songs */}
      <section className="home-section">
        <div className="section-header">
          <h2 className="section-title">Popular right now</h2>
          <Clock className="section-icon" />
        </div>
        <div className="song-list">
          {popularSongs.map((song, index) => (
            <SongItem
              key={song.id}
              song={song}
              index={index + 1}
              onPlay={() => handlePlaySong(song, popularSongs)}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;