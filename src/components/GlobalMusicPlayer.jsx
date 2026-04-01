import React, { useContext } from 'react'
import styles from '../styles/globalMusicPlayer.module.scss'
import { MusicContext } from '../context/MusicContext'
import { FaPlay, FaPause, FaStepForward, FaStepBackward } from 'react-icons/fa'

const GlobalMusicPlayer = () => {
  const {
    currentTrack,
    isPlaying,
    currentTime,
    duration,
    audioRef,
    togglePlayPause,
    nextTrack,
    previousTrack,
    handleProgressChange,
    playlist,
    currentTrackIndex
  } = useContext(MusicContext)

  if (!currentTrack || playlist.length === 0) {
    return null
  }

  const formatTime = (time) => {
    if (!time || isNaN(time)) return '00:00'
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  }

  const progressPercent = duration ? (currentTime / duration) * 100 : 0

  return (
    <div className={styles.globalPlayer}>
      <audio
        ref={audioRef}
        onTimeUpdate={() => {
          setCurrentTime(audioRef.current.currentTime)
        }}
        onLoadedMetadata={() => {
          setDuration(audioRef.current.duration)
        }}
        onEnded={nextTrack}
        src={currentTrack.audioUrl}
      />

      <div className={styles.playerContent}>
        <div className={styles.trackInfo}>
          <img src={currentTrack.image} alt={currentTrack.title} className={styles.thumbnail} />
          <div className={styles.textInfo}>
            <h4 className={styles.trackTitle}>{currentTrack.title}</h4>
            <p className={styles.artist}>{currentTrack.artist}</p>
          </div>
        </div>

        <div className={styles.controls}>
          <button 
            className={styles.controlBtn} 
            onClick={previousTrack}
            disabled={currentTrackIndex === 0}
          >
            <FaStepBackward size={16} />
          </button>

          <button className={styles.playButton} onClick={togglePlayPause}>
            {isPlaying ? <FaPause size={20} /> : <FaPlay size={20} />}
          </button>

          <button 
            className={styles.controlBtn} 
            onClick={nextTrack}
            disabled={currentTrackIndex === playlist.length - 1}
          >
            <FaStepForward size={16} />
          </button>
        </div>

        <div className={styles.progressSection}>
          <span className={styles.time}>{formatTime(currentTime)}</span>
          <input
            type="range"
            min="0"
            max="100"
            value={progressPercent}
            onChange={handleProgressChange}
            className={styles.progressBar}
          />
          <span className={styles.time}>{formatTime(duration)}</span>
        </div>
      </div>
    </div>
  )
}

export default GlobalMusicPlayer
