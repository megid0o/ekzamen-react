import './Footer.css'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-logo">
              <span className="logo-icon">🎫</span>
              <span className="logo-text">EventHub</span>
            </div>
            <p className="footer-description">
              Платформа для поиска и покупки билетов на лучшие мероприятия города
            </p>
          </div>

          <div className="footer-section">
            <h4>Навигация</h4>
            <ul className="footer-links">
              <li><a href="/">Главная</a></li>
              <li><a href="/events">Мероприятия</a></li>
              <li><a href="/about">О нас</a></li>
              <li><a href="/add-event">Добавить мероприятие</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Контакты</h4>
            <ul className="footer-links">
              <li> +7 (777) 123-45-67</li>
              <li> info@eventhub.kz</li>
              <li> ул. Минусинская 24 , г. Алматы</li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Соцсети</h4>
            <div className="social-links">
              <a href="#" className="social-link">Instagram</a>
              <a href="#" className="social-link">Facebook</a>
              <a href="#" className="social-link">Telegram</a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2024 EventHub. Все права защищены.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer