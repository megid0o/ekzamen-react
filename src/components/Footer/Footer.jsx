import './Footer.css'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-logo">
              <span className="logo-text">Tikkets</span>
            </div>
            <p className="footer-description">
              Платформа для поиска и покупки билетов на лучшие мероприятия. 
              Мы соединяем людей с их увлечениями через культуру, спорт и развлечения.
            </p>
          </div>

          <div className="footer-section">
            <h4>Контакты поддержки</h4>
            <ul className="footer-links">
              <li>+7 (777) 123-45-67</li>
              <li>support@tikkets.kz</li>
              <li>г. Алматы, пр. Абылай хана 123</li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Наши соцсети</h4>
            <ul className="footer-links">
              <li>Instagram: @tikkets.ofc</li>
              <li>Telegram: @tikkets_support</li>
              <li>Facebook: Tikkets Official</li>
              <li>TikTok: @tikkets.kz</li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Компания</h4>
            <ul className="footer-links">
              <li><a href="/about">О нас</a></li>
              <li><a href="/events">Мероприятия</a></li>
              <li><a href="/add-event">Для организаторов</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2024 Tikkets. Все права защищены.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer