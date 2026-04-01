import React, { useState, useRef, useEffect } from 'react'
import styles from '../styles/proyectos.module.scss'
import BaseSection from './BaseSection'
import ProjectCard from './ProjectCard'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

const Proyectos = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [itemsPerView, setItemsPerView] = useState(4)
  const carouselRef = useRef(null)

  const projectsData = [
    {
      id: 1,
      title: 'El Arengador',
      artist: 'Jammin',
      duration: 255,
      image: 'https://i.scdn.co/image/ab67616d0000b273c95bda47389d92be0b851b78',
      audioUrl: 'https://res.cloudinary.com/dji5xjerg/video/upload/v1775072213/Arengador_wsndg3.mp4',
      spotifyUrl: 'https://open.spotify.com/track/0TgEWfrVfXx463kSuw5aNu'
    },
    {
      id: 2,
      title: 'El Arengador',
      artist: 'Jammin',
      duration: 255,
      image: 'https://i.scdn.co/image/ab67616d0000b273c95bda47389d92be0b851b78',
      audioUrl: 'https://res.cloudinary.com/dji5xjerg/video/upload/v1775072213/Arengador_wsndg3.mp4',
      spotifyUrl: 'https://open.spotify.com/track/0TgEWfrVfXx463kSuw5aNu'
    },
    {
      id: 3,
      title: 'El Arengador',
      artist: 'Jammin',
      duration: 255,
      image: 'https://i.scdn.co/image/ab67616d0000b273c95bda47389d92be0b851b78',
      audioUrl: 'https://res.cloudinary.com/dji5xjerg/video/upload/v1775072213/Arengador_wsndg3.mp4',
      spotifyUrl: 'https://open.spotify.com/track/0TgEWfrVfXx463kSuw5aNu'
    },
    {
      id: 4,
      title: 'El Arengador',
      artist: 'Jammin',
      duration: 255,
      image: 'https://i.scdn.co/image/ab67616d0000b273c95bda47389d92be0b851b78',
      audioUrl: 'https://res.cloudinary.com/dji5xjerg/video/upload/v1775072213/Arengador_wsndg3.mp4',
      spotifyUrl: 'https://open.spotify.com/track/0TgEWfrVfXx463kSuw5aNu'
    },
    {
      id: 5,
      title: 'El Arengador',
      artist: 'Jammin',
      duration: 255,
      image: 'https://i.scdn.co/image/ab67616d0000b273c95bda47389d92be0b851b78',
      audioUrl: 'https://res.cloudinary.com/dji5xjerg/video/upload/v1775072213/Arengador_wsndg3.mp4',
      spotifyUrl: 'https://open.spotify.com/track/0TgEWfrVfXx463kSuw5aNu'
    },
  ]

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      if (width <= 500) {
        setItemsPerView(2)
      } else {
        setItemsPerView(4)
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const maxIndex = Math.max(0, projectsData.length - itemsPerView)

  const handlePrev = () => {
    setCurrentIndex(prev => Math.max(0, prev - 1))
  }

  const handleNext = () => {
    setCurrentIndex(prev => Math.min(maxIndex, prev + 1))
  }

  return (
    <BaseSection id="proyectos" className={styles.proyectosSection}>
      <h2 className={styles.title}>PROYECTOS</h2>
      
      <div className={styles.carouselContainer}>
        <button 
          className={styles.carouselBtn}
          onClick={handlePrev}
          disabled={currentIndex === 0}
          aria-label="Previous projects"
        >
          <FaChevronLeft size={20} />
        </button>

        <div className={styles.carouselWrapper}>
          <div 
            className={styles.projectsCarousel}
            style={{ transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` }}
          >
            {projectsData.map((project, index) => (
              <div key={project.id} className={styles.carouselItem}>
                <ProjectCard 
                  playlist={projectsData}
                  trackIndex={index}
                  {...project} 
                />
              </div>
            ))}
          </div>
        </div>

        <button 
          className={styles.carouselBtn}
          onClick={handleNext}
          disabled={currentIndex === maxIndex}
          aria-label="Next projects"
        >
          <FaChevronRight size={20} />
        </button>
      </div>
    </BaseSection>
  )
}

export default Proyectos
