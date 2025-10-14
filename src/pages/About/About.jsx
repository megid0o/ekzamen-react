import './About.css'

const About = () => {
  return (
    <div className="about-page">
      <div className="container">
        <div className="page-header">
          <h1>О компании Tikkets</h1>
          <p>Мы создаем возможности для незабываемых впечатлений</p>
        </div>

        <div className="about-content">
          <section className="about-section">
            <div className="about-text">
              <h2>Наша миссия</h2>
              <p>
                Tikkets - это современная платформа, которая делает покупку билетов 
                на мероприятия простой, удобной и доступной для каждого жителя Казахстана. 
                Мы соединяем людей с их увлечениями через культуру, спорт, образование и развлечения.
              </p>
            </div>
          </section>

          <section className="about-section">
            <div className="about-text">
              <h2>Что мы предлагаем</h2>
              <p>
                Наша платформа объединяет организаторов мероприятий и их гостей. 
                Мы предоставляем полный цикл услуг: от размещения информации о мероприятии 
                до продажи билетов и аналитики. Более 1000 мероприятий ежегодно проходят через нашу платформу.
              </p>
            </div>
          </section>

          <section className="contact-section">
            <h2>Свяжитесь с нами</h2>
            <div className="contact-grid">
              <div className="contact-info">
                <div className="contact-item">
                  <div className="contact-details">
                    <h4>Телефон поддержки</h4>
                    <p>+7 (777) 123-45-67</p>
                  </div>
                </div>
                <div className="contact-item">
                  <div className="contact-details">
                    <h4>Email</h4>
                    <p>support@tikkets.kz</p>
                  </div>
                </div>
                <div className="contact-item">
                  <div className="contact-details">
                    <h4>Адрес</h4>
                    <p>г. Алматы, пр. Абылай хана 123</p>
                  </div>
                </div>
              </div>
              
              <div className="social-section">
                <h4>Наши соцсети</h4>
                <div className="social-links">
                  <div className="social-item">
                    <span className="social-platform">Instagram:</span>
                    <span className="social-handle">@tikkets.ofc</span>
                  </div>
                  <div className="social-item">
                    <span className="social-platform">Telegram:</span>
                    <span className="social-handle">@tikkets_support</span>
                  </div>
                  <div className="social-item">
                    <span className="social-platform">Facebook:</span>
                    <span className="social-handle">Tikkets Official</span>
                  </div>
                  <div className="social-item">
                    <span className="social-platform">TikTok:</span>
                    <span className="social-handle">@tikkets.kz</span>
                  </div>
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