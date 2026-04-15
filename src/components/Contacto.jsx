import React from 'react'
import BaseSection from './BaseSection'
import ContactForm from './ContactForm'
import Footer from './Footer'
import styles from '../styles/contacto.module.scss'

const Contacto = () => {
  return (
    <>
      <BaseSection id="contacto" className={styles.contactoSection}>
        <div className={styles.contactoContent}>
          <h2 className={styles.title}>CONTACTO</h2>
          <p className={styles.subtitle}>
            ¿Tenés una pregunta o proyecto? Me encantaría escucharte.
          </p>
          <ContactForm />
        </div>
      </BaseSection>
      <Footer />
    </>
  )
}

export default Contacto
