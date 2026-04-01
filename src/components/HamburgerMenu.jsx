import React, { useState } from 'react'
import styles from '../styles/hamburgerMenu.module.scss'
import { FaBars, FaTimes } from 'react-icons/fa'

const HamburgerMenu = ({ menuItems }) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const closeMenu = () => {
    setIsOpen(false)
  }

  return (
    <div className={styles.hamburgerContainer}>
      <button className={styles.hamburgerButton} onClick={toggleMenu}>
        {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>

      <nav className={`${styles.mobileMenu} ${isOpen ? styles.active : ''}`}>
        {menuItems.map((item, index) => (
          <a key={index} href={item.href} onClick={closeMenu}>
            {item.label}
          </a>
        ))}
      </nav>
    </div>
  )
}

export default HamburgerMenu
