import React from 'react'
import { FaLinkedin, FaInstagram } from 'react-icons/fa'
import styles from '../styles/footer.module.scss'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const socialLinks = {
    linkedin: 'https://linkedin.com/in/',
    instagram: 'https://instagram.com/pibo.fdez'
  }

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.socialLinks}>
          <a
            href={socialLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
            aria-label="LinkedIn"
            title="LinkedIn"
          >
            <FaLinkedin size={20} />
          </a>

          <a
            href={socialLinks.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
            aria-label="Instagram"
            title="Instagram"
          >
            <FaInstagram size={20} />
          </a>
        </div>

        <p className={styles.copyright}>
          © {currentYear} Lucas Fernández. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  )
}

export default Footer
