import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCartStore } from '../../store/useCartStore';
import { useAuthStore } from '../../store/useAuthStore';
import Cart from '../Cart/Cart';
import Login from '../Login/Login';
import Register from '../Register/Register';
import './Header.css';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  
  const location = useLocation();
  const { getTotalItems } = useCartStore();
  const { user, isAuthenticated, logout } = useAuthStore();

  const totalItems = getTotalItems();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActiveLink = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  const handleAuthClick = () => {
    setIsAuthModalOpen(true);
    setAuthMode('login');
  };

  const handleLogout = () => {
    logout();
  };

  const switchAuthMode = () => {
    setAuthMode(authMode === 'login' ? 'register' : 'login');
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  return (
    <>
      <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container">
          <div className="header-content">
            <div className="logo">
              <Link to="/">
                <span className="logo-text">TIKKETS</span>
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
                    ГЛАВНАЯ
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/events" 
                    className={`nav-link ${isActiveLink('/events')}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    МЕРОПРИЯТИЯ
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/about" 
                    className={`nav-link ${isActiveLink('/about')}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    О НАС
                  </Link>
                </li>
              </ul>
            </nav>

            <div className="header-actions">
              <Link 
                to="/add-event" 
                className="btn btn-primary add-event-btn"
              >
                ДОБАВИТЬ МЕРОПРИЯТИЕ
              </Link>
              
              <button 
                className="cart-button"
                onClick={() => setIsCartOpen(true)}
              >
                <span className="cart-text">КОРЗИНА</span>
                {totalItems > 0 && (
                  <span className="cart-badge">{totalItems}</span>
                )}
              </button>

              {isAuthenticated ? (
                <div className="user-menu">
                  <div className="user-avatar">
                    <img src={user.avatar} alt={user.name} />
                  </div>
                  <div className="user-info">
                    <span className="user-name">{user.name.toUpperCase()}</span>
                    <button 
                      className="logout-btn"
                      onClick={handleLogout}
                    >
                      ВЫЙТИ
                    </button>
                  </div>
                </div>
              ) : (
                <button 
                  className="btn btn-secondary auth-button"
                  onClick={handleAuthClick}
                >
                  ВОЙТИ
                </button>
              )}

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
      
      {isAuthModalOpen && authMode === 'login' && (
        <Login 
          onClose={closeAuthModal} 
          switchToRegister={switchAuthMode}
        />
      )}
      
      {isAuthModalOpen && authMode === 'register' && (
        <Register 
          onClose={closeAuthModal} 
          switchToLogin={switchAuthMode}
        />
      )}
    </>
  );
};

export default Header;