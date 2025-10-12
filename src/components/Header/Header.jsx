import { Link } from 'react-router-dom'
import './Header.css'

const Header = () => {
  return (
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
              <li><a href="/about">О нас</a></li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header