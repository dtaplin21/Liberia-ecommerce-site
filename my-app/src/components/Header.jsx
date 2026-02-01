import { Link } from 'react-router-dom'
import '../App.css'

function Header() {
  return (
    <header>
      <Link to="/">
        <img src="/images/The UNNAMED FARM.JPEG" alt="The Unnamed Farm Logo" className="logo" />
      </Link>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/fund">Fund the Factory</Link>
        <Link to="/product">Cocoa Butter</Link>
        <Link to="/story">Our Story</Link>
        <Link to="/impact">Impact</Link>
        <Link to="/faq">FAQ</Link>
        <Link to="/contact">Contact</Link>
      </nav>
    </header>
  )
}

export default Header


