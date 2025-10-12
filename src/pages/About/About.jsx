import './About.css'

const About = () => {
  return (
    <div className="about-page">
      <div className="container">
        <div className="page-header">
          <h1>О компании EventHub</h1>
          <p>Мы создаем возможности для незабываемых впечатлений</p>
        </div>

        <div className="about-content">
          <section className="about-section">
            <div className="about-text">
              <h2>Наша миссия</h2>
              <p>
                Сделать покупку билетов на мероприятия простой, удобной и доступной 
                для каждого жителя Казахстана. Мы стремимся соединять людей с их увлечениями 
                и создавать незабываемые впечатления через культуру, спорт, образование и развлечения.
              </p>
            </div>
            <div className="about-visual">
              <div className="visual-card mission-card">
                <h3>Доступность</h3>
                <p>Билеты на все мероприятия в одном месте</p>
              </div>
            </div>
          </section>

          <section className="about-section reversed">
            <div className="about-text">
              <h2>Что мы предлагаем</h2>
              <p>
                EventHub - это современная платформа, которая объединяет организаторов 
                мероприятий и их гостей. Мы предоставляем полный цикл услуг: от размещения 
                информации о мероприятии до продажи билетов и аналитики.
              </p>
            </div>
            <div className="about-visual">
              <div className="features-grid">
                <div className="feature-item">
                  <h4>Концерты</h4>
                  <p>Музыкальные события любого масштаба</p>
                </div>
                <div className="feature-item">
                  <h4>Конференции</h4>
                  <p>Бизнес и образовательные мероприятия</p>
                </div>
                <div className="feature-item">
                  <h4>Спорт</h4>
                  <p>Спортивные соревнования и матчи</p>
                </div>
                <div className="feature-item">
                  <h4>Искусство</h4>
                  <p>Выставки, театр и перформансы</p>
                </div>
              </div>
            </div>
          </section>

          <section className="stats-section">
            <h2>EventHub в цифрах</h2>
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-number">50,000+</div>
                <div className="stat-label">довольных клиентов</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">5,000+</div>
                <div className="stat-label">проведенных мероприятий</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">20+</div>
                <div className="stat-label">городов Казахстана</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">99%</div>
                <div className="stat-label">положительных отзывов</div>
              </div>
            </div>
          </section>

          <section className="contact-section">
            <h2>Свяжитесь с нами</h2>
            <div className="contact-grid">
              <div className="contact-info">
                <div className="contact-item">
                  <div className="contact-details">
                    <h4>Телефон</h4>
                    <p>+7 (777) 123-45-67</p>
                  </div>
                </div>
                <div className="contact-item">
                  <div className="contact-details">
                    <h4>Email</h4>
                    <p>info@eventhub.kz</p>
                  </div>
                </div>
                <div className="contact-item">
                  <div className="contact-details">
                    <h4>Адрес</h4>
                    <p>г. Алматы, ул. Примерная, 123</p>
                  </div>
                </div>
                <div className="contact-item">
                  <div className="contact-details">
                    <h4>Режим работы</h4>
                    <p>Круглосуточно, 7 дней в неделю</p>
                  </div>
                </div>
              </div>
              
              <div className="social-section">
                <h4>Мы в социальных сетях</h4>
                <div className="social-links">
                  <a href="#" className="social-link">
                    <span>Instagram</span>
                  </a>
                  <a href="#" className="social-link">
                    <span>Facebook</span>
                  </a>
                  <a href="#" className="social-link">
                    <span>Telegram</span>
                  </a>
                  <a href="#" className="social-link">
                    <span>TikTok</span>
                  </a>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default About