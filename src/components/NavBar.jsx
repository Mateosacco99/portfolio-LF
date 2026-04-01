import React from 'react'
import styles from '../styles/navbar.module.scss'
import logo from '/img/logo.png'
import HamburgerMenu from './HamburgerMenu'

const NavBar = () => {
  const menuItems = [
    { label: 'Bio', href: '#biografia' },
    { label: 'Proyectos', href: '#projects' },
    { label: 'Contacto', href: '#contact' }
  ]

  return (
    <div className={styles.navbar}>
      <a href="#home" className={styles.nameLink}>
        <div className={styles.nameSection}>
          <span className={styles.name}>LUCAS FERNANDEZ</span>
        </div>
      </a>

      <a href="#home" className={styles.logoLink}>
        <img src={logo} alt="Logo" className={styles.navbarLogo} />
      </a>

      <nav className={styles.navMenu}>
        {menuItems.map((item, index) => (
          <a key={index} href={item.href}>
            {item.label}
          </a>
        ))}
      </nav>

      <HamburgerMenu menuItems={menuItems} />
    </div>
  )
}

export default NavBar
