import React, { useState, useEffect } from 'react'
import styles from '../styles/proyectos.module.scss'
import BaseSection from './BaseSection'
import ProjectCard from './ProjectCard'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

const Proyectos = () => {
  const [currentPage, setCurrentPage] = useState(0)
  const [itemsPerPage, setItemsPerPage] = useState(4)
  const [isAnimating, setIsAnimating] = useState(false)

  const handlePageChange = (newPage) => {
    setIsAnimating(true)
    setTimeout(() => {
      setCurrentPage(newPage)
      setIsAnimating(false)
    }, 150)
  }

  const handlePrev = () => {
    if (!isAnimating) {
      handlePageChange(Math.max(0, currentPage - 1))
    }
  }

  const handleNext = () => {
    if (!isAnimating) {
      handlePageChange(Math.min(maxPage, currentPage + 1))
    }
  }

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
        setItemsPerPage(1)
      } else {
        setItemsPerPage(3)
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const totalPages = Math.ceil(projectsData.length / itemsPerPage)
  const maxPage = Math.max(0, totalPages - 1)

  const startIndex = currentPage * itemsPerPage
  const visibleItems = projectsData.slice(startIndex, startIndex + itemsPerPage)

  return (
    <BaseSection id="proyectos" className={styles.proyectosSection}>
      <h2 className={styles.title}>PROYECTOS</h2>
      
      <div className={styles.carouselContainer}>
        <button 
          className={styles.carouselBtn}
          onClick={handlePrev}
          disabled={currentPage === 0}
          aria-label="Previous projects"
        >
          <FaChevronLeft size={20} />
        </button>

<div className={styles.carouselWrapper}>
          <div className={`${styles.projectsCarousel} ${isAnimating ? styles.animating : ''}`}>
            {visibleItems.map((project, index) => (
              <div key={project.id} className={styles.carouselItem}>
                <ProjectCard 
                  playlist={projectsData}
                  trackIndex={startIndex + index}
                  {...project} 
                />
              </div>
            ))}
          </div>
        </div>

        <button 
          className={styles.carouselBtn}
          onClick={handleNext}
          disabled={currentPage === maxPage}
          aria-label="Next projects"
        >
          <FaChevronRight size={20} />
        </button>
      </div>
    </BaseSection>
  )
}

export default Proyectos
