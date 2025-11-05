import { useState, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import './BackgroundMusic.css';

/**
 * Background Music Component - Simplified Version
 * File nhạc: public/audio/background-music.mp3
 */

const BackgroundMusic = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.05);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const audioRef = useRef(null);
  const hideTimerRef = useRef(null);

  const handleMouseEnter = () => {
    if (hideTimerRef.current) {
      clearTimeout(hideTimerRef.current);
    }
    setShowVolumeSlider(true);
  };

  const handleMouseLeave = () => {
    hideTimerRef.current = setTimeout(() => {
      setShowVolumeSlider(false);
    }, 200); // 200ms delay
  };

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      audio.volume = volume;
      audio.play()
        .then(() => setIsPlaying(true))
        .catch(err => {
          console.error('Playback failed:', err);
          setIsPlaying(false);
        });
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  return (
    <div 
      className="music-controller"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <audio 
        ref={audioRef}
        loop
        preload="auto"
      >
        <source src="/audio/background-music.mp3" type="audio/mpeg" />
      </audio>

      {showVolumeSlider && (
        <div className="volume-slider-container">
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={volume}
            onChange={handleVolumeChange}
            className="volume-slider"
            aria-label="Điều chỉnh âm lượng"
          />
          <span className="volume-label">{Math.round(volume * 100)}%</span>
        </div>
      )}

      {!showVolumeSlider && (
        <div className="music-tooltip">
          {isPlaying ? '🎵 Đang phát' : '🔇 Nhấn để phát nhạc'}
        </div>
      )}

      <button
        onClick={toggleMusic}
        className="music-button group"
        aria-label={isPlaying ? 'Tắt nhạc nền' : 'Bật nhạc nền'}
        title=""
      >
        {isPlaying ? (
          <Volume2 className="w-6 h-6 text-white animate-pulse" />
        ) : (
          <VolumeX className="w-6 h-6 text-white" />
        )}
        
        {isPlaying && (
          <div className="music-ripple"></div>
        )}
      </button>
    </div>
  );
};

export default BackgroundMusic;
