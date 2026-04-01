import React from 'react'
import styles from '../styles/baseSection.module.scss'

const BaseSection = ({ id, children, className }) => {
  return (
    <section id={id} className={`${styles.section} ${className || ''}`}>
      <div className={styles.container}>
        {children}
      </div>
    </section>
  )
}

export default BaseSection
