// import { useSelector, useDispatch } from 'react-redux';
// import { Play, Heart, MoreHorizontal } from 'lucide-react';
// import { toggleLike } from '../../store/slices/playlistSlice';

// const SongItem = ({ song, index, onPlay, showAlbum = false }) => {
//   const dispatch = useDispatch();
//   const { likedSongs } = useSelector(state => state.playlist);
//   const { currentSong, isPlaying } = useSelector(state => state.player);
  
//   const isLiked = likedSongs.includes(song.id);
//   const isCurrentSong = currentSong?.id === song.id;
  
//   const formatDuration = (seconds) => {
//     const minutes = Math.floor(seconds / 60);
//     const secs = Math.floor(seconds % 60);
//     return `${minutes}:${secs.toString().padStart(2, '0')}`;
//   };

//   const handleToggleLike = (e) => {
//     e.stopPropagation();
//     dispatch(toggleLike(song.id));
//   };

//   return (
//     <div 
//       className={`song-item ${isCurrentSong ? 'playing' : ''}`}
//       onClick={onPlay}
//     >
//       <div className="song-index">
//         {isCurrentSong && isPlaying ? (
//           <div className="playing-indicator">
//             <div className="bar"></div>
//             <div className="bar"></div>
//             <div className="bar"></div>
//             <div className="bar"></div>
//           </div>
//         ) : (
//           <span className="index-number">{index}</span>
//         )}
//         <button className="song-play-button">
//           <Play className="play-icon" />
//         </button>
//       </div>

//       <div className="song-info">
//         <img src={song.cover} alt={song.title} className="song-cover" />
//         <div className="song-details">
//           <span className={`song-title ${isCurrentSong ? 'current' : ''}`}>
//             {song.title}
//           </span>
//           <span className="song-artist">{song.artist}</span>
//         </div>
//       </div>

//       {showAlbum && (
//         <div className="song-album">
//           <span>{song.album}</span>
//         </div>
//       )}

//       <div className="song-actions">
//         <button 
//           className={`like-button ${isLiked ? 'liked' : ''}`}
//           onClick={handleToggleLike}
//         >
//           <Heart className="heart-icon" />
//         </button>
//         <span className="song-duration">{formatDuration(song.duration)}</span>
//         <button className="more-button">
//           <MoreHorizontal className="more-icon" />
//         </button>
//       </div>
//     </div>
//   );
// };

// export default SongItem;

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Play, Pause, Heart, MoreHorizontal, Loader } from 'lucide-react'; // Added Pause and Loader
import { toggleLike } from '../../store/slices/playlistSlice'; // Keeping for now, but remember discussion
import { playSong, togglePlay } from '../../store/slices/playerSlice'; // Import playSong and togglePlay

const SongItem = ({ song, index, onPlay, showAlbum = false }) => {
  const dispatch = useDispatch();
  // Using likedSongs from playlistSlice as per your initial setup
  const { likedSongs } = useSelector(state => state.playlist);
  const { currentSong, isPlaying, progress } = useSelector(state => state.player); // Added progress for potential visual
  const { songs: allSongs } = useSelector(state => state.music); // Assuming all songs are in musicSlice

  const isLiked = likedSongs.includes(song.id);
  const isCurrentSong = currentSong?.id === song.id;

  // You might need a loading state for when a song is buffering/fetching
  // For simplicity, we'll assume isPlaying also covers a 'ready to play' state.
  // const isLoading = currentSong?.id === song.id && playerStatus === 'loading';

  const formatDuration = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const handleToggleLike = (e) => {
    e.stopPropagation(); // Prevent playing the song when clicking like
    dispatch(toggleLike(song.id));
  };

  const handlePlayButtonClick = (e) => {
    e.stopPropagation(); // Prevent the song item's onClick from firing

    if (isCurrentSong) {
      // If it's the current song, just toggle play/pause
      dispatch(togglePlay());
    } else {
      // If it's a new song, play it.
      // The onPlay prop from parent might be more sophisticated,
      // e.g., setting the queue first, then playing.
      // For now, we'll assume onPlay correctly handles playing this song.
      onPlay(song);
    }
  };

  // Determine if the song is currently playing and its index is hidden
  const showPlayButtonOnHover = !(isCurrentSong && isPlaying);

  return (
    <div
      className={`song-item ${isCurrentSong ? 'playing' : ''}`}
      onClick={() => {
        // If clicking the song item itself
        if (isCurrentSong) {
          dispatch(togglePlay()); // If it's the current song, toggle play/pause
        } else {
          onPlay(song); // Otherwise, play the clicked song
        }
      }}
    >
      <div className="song-index">
        {isCurrentSong && isPlaying ? (
          <div className="playing-indicator">
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
          </div>
        ) : (
          <span className="index-number">{index + 1}</span> // Display 1-based index
        )}
        {/* Play/Pause button that shows on hover */}
        <button
          className="song-play-button"
          onClick={handlePlayButtonClick}
          aria-label={isCurrentSong && isPlaying ? "Pause song" : "Play song"}
        >
          {isCurrentSong && isPlaying ? (
            <Pause className="play-icon" />
          ) : (
            <Play className="play-icon" />
          )}
        </button>
      </div>

      <div className="song-info">
        <img src={song.cover} alt={song.title} className="song-cover" />
        <div className="song-details">
          <span className={`song-title ${isCurrentSong ? 'current' : ''}`}>
            {song.title}
          </span>
          <span className="song-artist">{song.artist}</span>
        </div>
      </div>

      {showAlbum && song.album && ( // Only show if showAlbum is true and song has an album
        <div className="song-album">
          <span>{song.album}</span>
        </div>
      )}

      <div className="song-actions">
        <button
          className={`like-button ${isLiked ? 'liked' : ''}`}
          onClick={handleToggleLike}
          aria-label={isLiked ? "Unlike song" : "Like song"}
        >
          <Heart className="heart-icon" fill={isLiked ? "#1db954" : "none"} /> {/* Fill heart if liked */}
        </button>
        <span className="song-duration">{formatDuration(song.duration)}</span>
        <button className="more-button" aria-label="More options">
          <MoreHorizontal className="more-icon" />
        </button>
      </div>
    </div>
  );
};

export default SongItem;