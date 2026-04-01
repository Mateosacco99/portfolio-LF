import React from 'react'
import styles from '../styles/proyectos.module.scss'
import BaseSection from './BaseSection'
import ProjectCard from './ProjectCard'

const Proyectos = () => {
  const projectsData = [
    {
      id: 1,
      title: 'El Arengador',
      artist: 'Jammin',
      image: 'https://via.placeholder.com/180x180?text=SUPERSTRELLA',
      audioUrl: 'https://res.cloudinary.com/dji5xjerg/video/upload/v1775072213/Arengador_wsndg3.mp4',
      spotifyUrl: 'https://open.spotify.com/track/0TgEWfrVfXx463kSuw5aNu'
    },
  ]

  return (
    <BaseSection id="proyectos" className={styles.proyectosSection}>
      <h2 className={styles.title}>PROYECTOS</h2>
      <div className={styles.projectsGrid}>
        {projectsData.map((project, index) => (
          <ProjectCard 
            key={project.id} 
            playlist={projectsData}
            trackIndex={index}
            {...project} 
          />
        ))}
      </div>
    </BaseSection>
  )
}

export default Proyectos
