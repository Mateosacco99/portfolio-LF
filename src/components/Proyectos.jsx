import React from 'react'
import styles from '../styles/proyectos.module.scss'
import BaseSection from './BaseSection'

const Proyectos = () => {
  const proyectosData = {
    title: 'PROYECTOS',
  }

  return (
    <BaseSection id="proyectos" className={styles.proyectosSection}>
      <div className={styles.proyectosContent}>
        <h2 className={styles.title}>{proyectosData.title}</h2>
      </div>
    </BaseSection>
  )
}

export default Proyectos
