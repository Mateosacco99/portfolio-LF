import React, { useContext } from 'react'
import styles from '../styles/projectCard.module.scss'
import { MusicContext } from '../context/MusicContext'
import { FaSpotify } from 'react-icons/fa'

const ProjectCard = ({ playlist, trackIndex, title, artist, image, spotifyUrl }) => {
  const { playPlaylist, currentTrackIndex, isPlaying } = useContext(MusicContext)

  const handleCardClick = () => {
    playPlaylist(playlist, trackIndex)
  }

  const isCurrentTrack = currentTrackIndex === trackIndex && isPlaying

  return (
    <div className={`${styles.projectCard} ${isCurrentTrack ? styles.active : ''}`} onClick={handleCardClick}>
      <div className={styles.imageContainer}>
        <img src={image} alt={title} className={styles.projectImage} />
        {isCurrentTrack && <div className={styles.playingIndicator}><FaPlay /></div>}
      </div>

      <div className={styles.infoContainer}>
        <div className={styles.headerSection}>
          <div className={styles.textInfo}>
            <h3 className={styles.title}>{title}</h3>
            <p className={styles.artist}>{artist}</p>
          </div>
          {spotifyUrl && (
            <a href={spotifyUrl} target="_blank" rel="noopener noreferrer" className={styles.spotifyButton} onClick={(e) => e.stopPropagation()}>
              <FaSpotify size={20} />
            </a>
          )}
        </div>

        <p className={styles.clickHint}>Click to play</p>
      </div>
    </div>
  )
}

export default ProjectCard
