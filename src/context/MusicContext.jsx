import React, { createContext, useState, useRef, useEffect } from 'react'

export const MusicContext = createContext()

export const MusicProvider = ({ children }) => {
  const [playlist, setPlaylist] = useState([])
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const audioRef = useRef(null)

  const currentTrack = playlist[currentTrackIndex]

  // Use track's duration if available, otherwise wait for metadata
  useEffect(() => {
    if (currentTrack?.duration) {
      setDuration(currentTrack.duration)
    } else {
      setDuration(0)
    }
    setCurrentTime(0)
  }, [currentTrack])

  // Handle autoplay when track changes
  useEffect(() => {
    if (audioRef.current && isPlaying && currentTrack) {
      audioRef.current.play().catch(() => {
        // Playback might be blocked, ignore
      })
    }
  }, [currentTrack, isPlaying])

  const playTrack = (track, trackIndex = 0) => {
    if (Array.isArray(track)) {
      setPlaylist(track)
      setCurrentTrackIndex(0)
    } else {
      setPlaylist([track])
      setCurrentTrackIndex(0)
    }
    setIsPlaying(true)
  }

  const playPlaylist = (tracks, startIndex = 0) => {
    setPlaylist(tracks)
    setCurrentTrackIndex(startIndex)
    setIsPlaying(true)
    
    // Start playing when track is ready
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.play().catch(() => {
          // Playback might be blocked, just continue
        })
      }
    }, 100)
  }

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const nextTrack = () => {
    if (currentTrackIndex < playlist.length - 1) {
      setCurrentTrackIndex(currentTrackIndex + 1)
      setIsPlaying(true)
    }
  }

  const previousTrack = () => {
    if (currentTrackIndex > 0) {
      setCurrentTrackIndex(currentTrackIndex - 1)
      setIsPlaying(true)
    }
  }

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime)
    }
  }

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      // Use track's duration if available, otherwise use audio element's duration
      const trackDuration = currentTrack?.duration || audioRef.current.duration
      setDuration(trackDuration)
    }
  }

  const handleEnded = () => {
    nextTrack()
  }

  const handleProgressChange = (e) => {
    const newTime = (e.target.value / 100) * duration
    if (audioRef.current) {
      audioRef.current.currentTime = newTime
    }
    setCurrentTime(newTime)
  }

  const value = {
    playlist,
    currentTrack,
    currentTrackIndex,
    isPlaying,
    currentTime,
    duration,
    audioRef,
    playTrack,
    playPlaylist,
    togglePlayPause,
    nextTrack,
    previousTrack,
    handleTimeUpdate,
    handleLoadedMetadata,
    handleEnded,
    handleProgressChange,
    setCurrentTime,
    setDuration
  }

  return (
    <MusicContext.Provider value={value}>
      {children}
    </MusicContext.Provider>
  )
}
