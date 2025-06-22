import { useSelector, useDispatch } from 'react-redux';
import { Play, Heart, MoreHorizontal, Clock } from 'lucide-react';
import { playSong, setQueue } from '../../store/slices/playerSlice';
import { addToRecent } from '../../store/slices/playlistSlice';
import SongItem from '../Common/SongItem';

const PlaylistView = ({ playlistId }) => {
  const dispatch = useDispatch();
  const { playlists } = useSelector(state => state.playlist);
  const { songs } = useSelector(state => state.music);
  
  const playlist = playlists.find(p => p.id === playlistId);
  
  if (!playlist) {
    return <div className="playlist-view">Playlist not found</div>;
  }

  const playlistSongs = playlist.songs.map(songId => 
    songs.find(song => song.id === songId)
  ).filter(Boolean);

  const totalDuration = playlistSongs.reduce((acc, song) => acc + song.duration, 0);
  const formatDuration = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    if (hours > 0) {
      return `${hours} hr ${minutes} min`;
    }
    return `${minutes} min`;
  };

  const handlePlayPlaylist = () => {
    if (playlistSongs.length > 0) {
      dispatch(setQueue({ songs: playlistSongs, startIndex: 0 }));
      dispatch(playSong(playlistSongs[0]));
      dispatch(addToRecent(playlistSongs[0].id));
    }
  };

  const handlePlaySong = (song) => {
    const songIndex = playlistSongs.findIndex(s => s.id === song.id);
    dispatch(setQueue({ songs: playlistSongs, startIndex: songIndex }));
    dispatch(playSong(song));
    dispatch(addToRecent(song.id));
  };

  return (
    <div className="playlist-view">
      <div className="playlist-header">
        <div className="playlist-cover">
          {playlist.isLiked ? (
            <div className="liked-songs-large">
              <Heart className="heart-icon-large" />
            </div>
          ) : (
            <img src={playlist.cover} alt={playlist.name} />
          )}
        </div>
        <div className="playlist-info">
          <span className="playlist-type">PLAYLIST</span>
          <h1 className="playlist-title">{playlist.name}</h1>
          <p className="playlist-description">{playlist.description}</p>
          <div className="playlist-meta">
            <span className="playlist-stats">
              {playlistSongs.length} songs • {formatDuration(totalDuration)}
            </span>
          </div>
        </div>
      </div>

      <div className="playlist-actions">
        <button 
          className="play-button-large"
          onClick={handlePlayPlaylist}
          disabled={playlistSongs.length === 0}
        >
          <Play className="play-icon" />
        </button>
        <button className="action-button">
          <Heart className="action-icon" />
        </button>
        <button className="action-button">
          <MoreHorizontal className="action-icon" />
        </button>
      </div>

      {playlistSongs.length === 0 ? (
        <div className="empty-playlist">
          <h3>Start building your playlist</h3>
          <p>Search for songs and add them to this playlist.</p>
        </div>
      ) : (
        <div className="playlist-tracks">
          <div className="tracks-header">
            <div className="track-number">#</div>
            <div className="track-title">TITLE</div>
            <div className="track-album">ALBUM</div>
            <div className="track-duration">
              <Clock className="clock-icon" />
            </div>
          </div>
          <div className="tracks-list">
            {playlistSongs.map((song, index) => (
              <SongItem
                key={song.id}
                song={song}
                index={index + 1}
                onPlay={() => handlePlaySong(song)}
                showAlbum={true}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PlaylistView;