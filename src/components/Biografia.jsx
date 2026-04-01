import React from 'react'
import styles from '../styles/biografia.module.scss'
import BaseSection from './BaseSection'

const Biografia = () => {
  const heroData = {
    title: 'BIOGRAFIA',
    paragraphs: [
      'Soy Lucas Fernández, también conocido como "Pibo". Soy técnico en sonido y grabación, productor musical, guitarrista, sonidista y compositor argentino.',
      'Actualmente estoy enfocado en seguir creciendo profesionalmente, ampliando mi experiencia y generando nuevas colaboraciones con artistas.',
      'Ofrezco servicios de producción artística, composición y postproducción de audio.'
    ]
  }

  return (
    <BaseSection id="biografia" className={styles.biografiaSection}>
      <div className={styles.bioContent}>
        <h2 className={styles.title}>{heroData.title}</h2>
        <div className={styles.bioText}>
          {heroData.paragraphs.map((paragraph, index) => (
            <p key={index} className={styles.bio}>{paragraph}</p>
          ))}
        </div>
      </div>
    </BaseSection>
  )
}

export default Biografia
