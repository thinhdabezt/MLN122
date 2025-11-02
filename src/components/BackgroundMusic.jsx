import { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import './BackgroundMusic.css';

/**
 * Component âm thanh nền cho website
 * 
 * Hướng dẫn sử dụng:
 * 1. Tải file nhạc nền (MP3) vào thư mục public/audio/
 * 2. Đặt tên file: background-music.mp3
 * 3. Import component này vào App.jsx
 * 
 * Gợi ý nhạc:
 * - Piano trầm, triết học
 * - Classical music (Beethoven, Mozart)
 * - Ambient music nhẹ nhàng
 * 
 * Nguồn miễn phí:
 * - YouTube Audio Library
 * - Free Music Archive: https://freemusicarchive.org/
 * - Incompetech: https://incompetech.com/music/
 */

const BackgroundMusic = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.3); // Volume mặc định 30%
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const toggleMusic = async () => {
    if (!audioRef.current) return;

    try {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        await audioRef.current.play();
        setIsPlaying(true);
      }
    } catch (error) {
      console.log('Audio playback error:', error);
      // Trình duyệt có thể chặn autoplay
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
  };

  return (
    <div className="music-controller">
      {/* 
        PLACEHOLDER: Thay thế đường dẫn nhạc nền
        File mẫu: public/audio/background-music.mp3
      */}
      <audio 
        ref={audioRef} 
        loop
        preload="metadata"
      >
        <source src="/audio/background-music.mp3" type="audio/mpeg" />
        <source src="/audio/background-music.ogg" type="audio/ogg" />
        Trình duyệt của bạn không hỗ trợ audio.
      </audio>

      {/* Volume Slider */}
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

      {/* Control Button */}
      <button
        onClick={toggleMusic}
        onMouseEnter={() => setShowVolumeSlider(true)}
        onMouseLeave={() => setShowVolumeSlider(false)}
        className="music-button group"
        aria-label={isPlaying ? 'Tắt nhạc nền' : 'Bật nhạc nền'}
        title={isPlaying ? 'Tắt nhạc nền' : 'Bật nhạc nền'}
      >
        {isPlaying ? (
          <Volume2 className="w-6 h-6 text-white animate-pulse" />
        ) : (
          <VolumeX className="w-6 h-6 text-white" />
        )}
        
        {/* Ripple effect */}
        {isPlaying && (
          <div className="music-ripple"></div>
        )}
      </button>

      {/* Music info tooltip */}
      <div className="music-tooltip">
        {isPlaying ? '🎵 Đang phát' : '🔇 Nhấn để phát nhạc'}
      </div>
    </div>
  );
};

export default BackgroundMusic;
