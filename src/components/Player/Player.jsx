import { useSelector, useDispatch } from 'react-redux';
import { useRef, useEffect, useState } from 'react';
import song5 from "../../assets/song5.mp3"
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  VolumeX,
  Volume1,
  Shuffle, 
  Repeat,
  Heart
} from 'lucide-react';
import { 
  togglePlay, 
  nextSong, 
  previousSong, 
  setVolume, 
  setProgress,
  toggleShuffle,
  toggleRepeat,
  pausePlay,
  setDuration
} from '../../store/slices/playerSlice';
import { toggleLike } from '../../store/slices/playlistSlice';

const Player = () => {
  const dispatch = useDispatch();
  const audioRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [audioError, setAudioError] = useState(false);
  
  const { 
    currentSong, 
    isPlaying, 
    volume, 
    progress, 
    isShuffled, 
    isRepeating,
    queue,
    currentIndex
  } = useSelector(state => state.player);
  const { likedSongs } = useSelector(state => state.playlist);

  const formatTime = (seconds) => {
    if (isNaN(seconds) || !isFinite(seconds)) return '0:00';
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const handleProgressChange = (e) => {
    const newProgress = parseFloat(e.target.value);
    dispatch(setProgress(newProgress));
    if (audioRef.current && !isNaN(newProgress)) {
      audioRef.current.currentTime = newProgress;
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    dispatch(setVolume(newVolume));
    if (audioRef.current) {
      audioRef.current.volume = newVolume / 100;
    }
  };

  const handleToggleLike = () => {
    if (currentSong) {
      dispatch(toggleLike(currentSong.id));
    }
  };

  const handlePlayPause = () => {
    if (audioError) {
      setAudioError(false);
      if (audioRef.current && currentSong) {
        audioRef.current.src = currentSong.audioUrl || song5;
        audioRef.current.load();
        
      }
    }
    dispatch(togglePlay());
  };

  const handleNext = () => {
    if (queue.length > 0) {
      if (isShuffled) {
        const randomIndex = Math.floor(Math.random() * queue.length);
        dispatch(nextSong(randomIndex));
      } else {
        dispatch(nextSong());
      }
    }
  };

  const handlePrevious = () => {
    if (progress > 3) {
      // If more than 3 seconds played, restart current song
      dispatch(setProgress(0));
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
      }
    } else {
      dispatch(previousSong());
    }
  };

  const getVolumeIcon = () => {
    if (volume === 0) return VolumeX;
    if (volume < 50) return Volume1;
    return Volume2;
  };

  // Handle audio element events
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      if (!isNaN(audio.currentTime)) {
        dispatch(setProgress(audio.currentTime));
      }
    };

    const handleDurationChange = () => {
      if (!isNaN(audio.duration) && isFinite(audio.duration)) {
        dispatch(setDuration(audio.duration));
      }
    };

    const handleEnded = () => {
      if (isRepeating) {
        audio.currentTime = 0;
        audio.play().catch(() => {
          dispatch(pausePlay());
        });
      } else if (currentIndex < queue.length - 1 || isShuffled) {
        handleNext();
      } else {
        dispatch(pausePlay());
      }
    };

    const handleLoadStart = () => {
      setIsLoading(true);
      setAudioError(false);
    };

    const handleCanPlay = () => {
      setIsLoading(false);
      audio.volume = volume / 100;
    };

    const handleError = (e) => {
      console.warn('Audio error:', e);
      setIsLoading(false);
      setAudioError(true);
      dispatch(pausePlay());
    };

    const handleLoadedMetadata = () => {
      if (!isNaN(audio.duration) && isFinite(audio.duration)) {
        dispatch(setDuration(audio.duration));
      }
      audio.volume = volume / 100;
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('durationchange', handleDurationChange);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('loadstart', handleLoadStart);
    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('error', handleError);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('durationchange', handleDurationChange);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('loadstart', handleLoadStart);
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('error', handleError);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, [dispatch, volume, isRepeating, currentIndex, queue.length, isShuffled]);

  // Handle play/pause state changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentSong || audioError) return;

    if (isPlaying) {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.warn('Audio play failed:', error);
          setAudioError(true);
          dispatch(pausePlay());
        });
      }
    } else {
      audio.pause();
    }
  }, [isPlaying, currentSong, dispatch, audioError]);

  // Load new song when currentSong changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentSong) return;

    setIsLoading(true);
    setAudioError(false);
    
    const audioUrl = currentSong.audioUrl || song5
    audio.src = audioUrl;
    audio.load();
    dispatch(setProgress(0));
  }, [currentSong, dispatch]);

  if (!currentSong) {
    return (
      <div className="player">
        <div className="player-empty">
          <span>Select a song to start playing</span>
        </div>
      </div>
    );
  }

  const isLiked = likedSongs.includes(currentSong.id);
  const VolumeIcon = getVolumeIcon();

  return (
    <div className="player">
      <audio 
        ref={audioRef} 
        preload="metadata"
        crossOrigin="anonymous"
        
      />
      
      <div className="player-left">
        <img 
          src={currentSong.cover} 
          alt={currentSong.title} 
          className="current-song-cover"
          onError={(e) => {
            e.target.src = 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=300';
          }}
        />
        <div className="current-song-info">
          <span className="current-song-title">{currentSong.title}</span>
          <span className="current-song-artist">{currentSong.artist}</span>
        </div>
        <button 
          className={`like-button ${isLiked ? 'liked' : 'notLiked'}`}
          onClick={handleToggleLike}
          title={isLiked ? 'Remove from Liked Songs' : 'Add to Liked Songs'}
        >
          <Heart className="heart-icon" />
        </button>
      </div>

      <div className="player-center">
        <div className="player-controls">
          <button 
            className={`control-button ${isShuffled ? 'active' : ''}`}
            onClick={() => dispatch(toggleShuffle())}
            title={isShuffled ? 'Disable shuffle' : 'Enable shuffle'}
          >
            <Shuffle className="control-icon" />
          </button>
          <button 
            className="control-button"
            onClick={handlePrevious}
            title="Previous song"
            disabled={queue.length === 0}
          >
            <SkipBack className="control-icon" />
          </button>
          <button 
            className={` ${isLoading ? 'loading' : ''} ${audioError ? 'error' : ''}`}
            onClick={handlePlayPause}
            title={audioError ? 'Retry' : isPlaying ? 'Pause' : 'Play'}
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="loading-spinner"></div>
            ) : audioError ? (
              <Play className="play-pause-icon" size={20} />
            ) : isPlaying ? (
              <Pause className="play-pause-icon" size={20} />
            ) : (
              <Play className="play-pause-icon" />
            )}
          </button>
          <button 
            className="control-button"
            onClick={handleNext}
            disabled={!isShuffled && queue.length <= 1}
            title="Next song"
          >
            <SkipForward className="control-icon" />
          </button>
          <button 
            className={`control-button ${isRepeating ? 'active' : ''}`}
            onClick={() => dispatch(toggleRepeat())}
            title={isRepeating ? 'Disable repeat' : 'Enable repeat'}
          >
            <Repeat className="control-icon" />
          </button>
        </div>

        <div className="progress-container">
          <span className="time-text">{formatTime(progress)}</span>
          <input
            type="range"
            min="0"
            max={currentSong.duration || 0}
            value={progress || 0}
            onChange={handleProgressChange}
            className="progress-slider"
            title="Seek"
            disabled={audioError}
          />
          <span className="time-text">{formatTime(currentSong.duration)}</span>
        </div>
      </div>

      <div className="player-right">
        <div className="volume-container">
          <button 
            className="volume-button"
            onClick={() => dispatch(setVolume(volume === 0 ? 50 : 0))}
            title={volume === 0 ? 'Unmute' : 'Mute'}
          >
            <VolumeIcon className="volume-icon" />
          </button>
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={handleVolumeChange}
            className="volume-slider"
            title="Volume"
          />
        </div>
      </div>
    </div>
  );
};

export default Player;