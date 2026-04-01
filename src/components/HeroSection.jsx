import React from 'react'
import styles from '../styles/heroSection.module.scss'
import BaseSection from './BaseSection'

const HeroSection = () => {
  const heroData = {
    image: '/img/pibo.jpeg',
    name: 'LUCAS FERNANDEZ',
    profession: 'PRODUCTOR, COMPOSITOR'
  }

  return (
    <BaseSection id="home" className={styles.heroSection}>
      <div className={styles.heroContent}>
        <div className={styles.textContent}>
          <h1 className={styles.name}>{heroData.name}</h1>
          <p className={styles.profession}>{heroData.profession}</p>
        </div>
        <img src={heroData.image} alt={heroData.name} className={styles.heroImage} />
      </div>
    </BaseSection>
  )
}

export default HeroSection
