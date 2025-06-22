import { useSelector } from 'react-redux';
import { Music, Heart, Clock, User } from 'lucide-react';

const Library = () => {
  const { playlists } = useSelector(state => state.playlist);
  const { songs, albums } = useSelector(state => state.music);

  const libraryItems = [
    {
      type: 'Recently Played',
      icon: Clock,
      count: 'Your recent tracks',
      gradient: 'from-purple-600 to-blue-600'
    },
    {
      type: 'Liked Songs',
      icon: Heart,
      count: `${playlists.find(p => p.isLiked)?.songs.length || 0} songs`,
      gradient: 'from-green-600 to-emerald-600'
    },
    {
      type: 'Made for You',
      icon: User,
      count: 'Your personalized playlists',
      gradient: 'from-orange-600 to-red-600'
    },
  ];

  return (
    <div className="library-view">
      <div className="library-header">
        <h1 className="library-title">Your Library</h1>
        <div className="library-stats">
          <span className="stat-item">{playlists.length} playlists</span>
          <span className="stat-item">{albums.length} albums</span>
          <span className="stat-item">{songs.length} songs</span>
        </div>
      </div>

      <div className="library-grid">
        {libraryItems.map(item => (
          <div key={item.type} className="library-card">
            <div className={`library-card-icon bg-gradient-to-br ${item.gradient}`}>
              <item.icon className="icon" />
            </div>
            <div className="library-card-content">
              <h3 className="library-card-title">{item.type}</h3>
              <p className="library-card-subtitle">{item.count}</p>
            </div>
          </div>
        ))}
      </div>

      <section className="library-section">
        <h2 className="section-title">Recently created</h2>
        <div className="playlist-grid">
          {playlists.map(playlist => (
            <div key={playlist.id} className="playlist-card">
              <div className="playlist-card-image">
                {playlist.isLiked ? (
                  <div className="liked-songs-cover">
                    <Heart className="heart-icon" />
                  </div>
                ) : (
                  <img src={playlist.cover} alt={playlist.name} />
                )}
              </div>
              <div className="playlist-card-content">
                <h3 className="playlist-card-title">{playlist.name}</h3>
                <p className="playlist-card-subtitle">
                  {playlist.songs.length} songs • {playlist.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="library-section">
        <h2 className="section-title">Made for you</h2>
        <div className="card-grid">
          {albums.map(album => (
            <div key={album.id} className="music-card">
              <div className="card-image-container">
                <img src={album.cover} alt={album.title} className="card-image" />
                <button className="card-play-button">
                  <Music className="play-icon" />
                </button>
              </div>
              <div className="card-content">
                <h3 className="card-title">{album.title}</h3>
                <p className="card-subtitle">{album.artist} • {album.year}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Library;