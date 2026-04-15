import React, { useState, useEffect } from 'react'
import styles from '../styles/proyectos.module.scss'
import BaseSection from './BaseSection'
import ProjectCard from './ProjectCard'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { getFirestore, collection, getDocs } from 'firebase/firestore'
import { initializeApp } from 'firebase/app'

const Proyectos = () => {
  const [currentPage, setCurrentPage] = useState(0)
  const [itemsPerPage, setItemsPerPage] = useState(4)
  const [isAnimating, setIsAnimating] = useState(false)
  const [projectsData, setProjectsData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true)
        const firebaseConfig = {
          apiKey: import.meta.env.VITE_API_KEY,
          authDomain: import.meta.env.VITE_AUTH_DOMAIN,
          projectId: import.meta.env.VITE_PROJECT_ID,
          storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
          messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
          appId: import.meta.env.VITE_APP_ID
        }
        
        const app = initializeApp(firebaseConfig)
        const db = getFirestore(app)
        
        const querySnapshot = await getDocs(collection(db, 'Proyectos'))
        const projects = []
        
        querySnapshot.forEach((doc) => {
          projects.push({
            id: doc.id,
            ...doc.data()
          })
        })
        
        setProjectsData(projects)
        setError(null)
      } catch (err) {
        console.error('Error fetching projects:', err)
        setError('Error loading projects')
        setProjectsData([])
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

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
      
      {loading && <p>Cargando proyectos...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!loading && !error && projectsData.length === 0 && <p>No hay proyectos disponibles</p>}
      
      {!loading && !error && projectsData.length > 0 && (
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
      )}
    </BaseSection>
  )
}

export default Proyectos
