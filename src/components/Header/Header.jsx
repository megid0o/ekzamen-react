import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCartStore } from '../../store/useCartStore'
import Cart from '../Cart/Cart'
import './Header.css'

const Header = () => {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const { getTotalItems } = useCartStore()

  const totalItems = getTotalItems()

  return (
    <>
      <header className="header">
        <div className="container">
          <div className="header-content">
            <div className="logo">
              <Link to="/">
                <h1>TicketHub</h1>
              </Link>
            </div>
            <nav className="nav">
              <ul className="nav-list">
                <li><Link to="/">Главная</Link></li>
                <li><Link to="/events">Мероприятия</Link></li>
                <li><Link to="/about">О нас</Link></li>
                <li>
                  <Link to="/add-event" className="add-event-link">
                    + Добавить мероприятие
                  </Link>
                </li>
                <li>
                  <button 
                    className="cart-button"
                    onClick={() => setIsCartOpen(true)}
                  >
                    🛒 Корзина
                    {totalItems > 0 && (
                      <span className="cart-badge">{totalItems}</span>
                    )}
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
      
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  )
}

export default Header