import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useCartStore } from '../../store/useCartStore'
import Cart from '../Cart/Cart'
import './Header.css'

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const location = useLocation()
  const { getTotalItems } = useCartStore()

  const totalItems = getTotalItems()

  // useEffect для отслеживания скролла
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isActiveLink = (path) => {
    return location.pathname === path ? 'active' : ''
  }

  return (
    <>
      <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container">
          <div className="header-content">
            <div className="logo">
              <Link to="/">
                <span className="logo-text">Events</span>
              </Link>
            </div>

            <nav className={`nav ${isMobileMenuOpen ? 'nav-open' : ''}`}>
              <ul className="nav-list">
                <li>
                  <Link 
                    to="/" 
                    className={`nav-link ${isActiveLink('/')}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Главная
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/events" 
                    className={`nav-link ${isActiveLink('/events')}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Мероприятия
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/about" 
                    className={`nav-link ${isActiveLink('/about')}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    О нас
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/add-event" 
                    className="btn btn-secondary nav-btn"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    + Добавить
                  </Link>
                </li>
              </ul>
            </nav>

            <div className="header-actions">
              <button 
                className="cart-button"
                onClick={() => setIsCartOpen(true)}
              >
                <span className="cart-icon">🛒</span>
                {totalItems > 0 && (
                  <span className="cart-badge">{totalItems}</span>
                )}
              </button>

              <button 
                className="mobile-menu-toggle"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <span></span>
                <span></span>
                <span></span>
              </button>
            </div>
          </div>
        </div>
      </header>
      
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  )
}

export default Header