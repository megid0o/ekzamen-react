import './Header.css'

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <div className="logo">
            <h1>TicketHub</h1>
          </div>
          <nav className="nav">
            <ul className="nav-list">
              <li><a href="/">Главная</a></li>
              <li><a href="/events">Мероприятия</a></li>
              <li><a href="/about">О нас</a></li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header