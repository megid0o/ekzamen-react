import './About.css'

const About = () => {
  return (
    <div className="about-page">
      <div className="container">
        <div className="about-header">
          <h1>О компании TicketHub</h1>
          <p className="about-subtitle">
            Мы - ведущая платформа по продаже билетов на мероприятия по всей России
          </p>
        </div>

        <div className="about-content">
          <section className="about-section">
            <h2>Наша миссия</h2>
            <p>
              Сделать покупку билетов на мероприятия простой, удобной и доступной 
              для каждого. Мы стремимся соединять людей с их увлечениями и создавать 
              незабываемые впечатления.
            </p>
          </section>

          <section className="about-section">
            <h2>Что мы предлагаем</h2>
            <div className="features-list">
              <div className="feature-item">
                <h3>🎵 Широкий выбор мероприятий</h3>
                <p>Концерты, конференции, выставки, спортивные события и многое другое</p>
              </div>
              <div className="feature-item">
                <h3>🔒 Безопасная оплата</h3>
                <p>Все платежи защищены современными технологиями шифрования</p>
              </div>
              <div className="feature-item">
                <h3>📱 Удобный сервис</h3>
                <p>Простой и интуитивно понятный интерфейс для быстрого поиска и покупки</p>
              </div>
              <div className="feature-item">
                <h3>🎫 Мгновенная доставка</h3>
                <p>Электронные билеты приходят сразу после оплаты</p>
              </div>
            </div>
          </section>

          <section className="about-section">
            <h2>Наша статистика</h2>
            <div className="stats-grid">
              <div className="stat-item">
                <div className="stat-number">50,000+</div>
                <div className="stat-label">довольных клиентов</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">5,000+</div>
                <div className="stat-label">мероприятий</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">100+</div>
                <div className="stat-label">городов России</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">99%</div>
                <div className="stat-label">положительных отзывов</div>
              </div>
            </div>
          </section>

          <section className="about-section">
            <h2>Контакты</h2>
            <div className="contact-info">
              <div className="contact-item">
                <strong>📞 Телефон:</strong>
                <span>8 (800) 123-45-67</span>
              </div>
              <div className="contact-item">
                <strong>✉️ Email:</strong>
                <span>info@tickethub.ru</span>
              </div>
              <div className="contact-item">
                <strong>📍 Адрес:</strong>
                <span>Москва, ул. Тверская, д. 10</span>
              </div>
              <div className="contact-item">
                <strong>🕒 Режим работы:</strong>
                <span>Круглосуточно, 7 дней в неделю</span>
              </div>
            </div>
          </section>

          <section className="about-section">
            <h2>Мы в социальных сетях</h2>
            <div className="social-links">
              <a href="#" className="social-link">VK</a>
              <a href="#" className="social-link">Telegram</a>
              <a href="#" className="social-link">YouTube</a>
              <a href="#" className="social-link">Instagram</a>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default About