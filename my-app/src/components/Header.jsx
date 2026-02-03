import { useState } from 'react'
import { Link } from 'react-router-dom'
import '../App.css'

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  return (
    <header>
      <Link to="/" onClick={closeMenu}>
        <img src="/images/The UNNAMED FARM.JPEG" alt="The Unnamed Farm Logo" className="logo" />
      </Link>
      <button 
        className="menu-toggle"
        onClick={toggleMenu}
        aria-label="Toggle menu"
        aria-expanded={isMenuOpen}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
      <nav className={isMenuOpen ? 'nav-open' : ''}>
        <Link to="/" onClick={closeMenu}>Home</Link>
        <Link to="/fund" onClick={closeMenu}>Fund the Factory</Link>
        <Link to="/progress" onClick={closeMenu}>Progress Tracker</Link>
        <Link to="/product" onClick={closeMenu}>Cocoa Butter</Link>
        <Link to="/story" onClick={closeMenu}>Our Story</Link>
        <Link to="/contact" onClick={closeMenu}>Contact</Link>
      </nav>
    </header>
  )
}

export default Header


