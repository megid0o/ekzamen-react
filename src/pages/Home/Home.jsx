import './Home.css'

const Home = () => {
  return (
    <div className="home">
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1>Добро пожаловать на TicketHub</h1>
            <p>Покупайте билеты на лучшие концерты, конференции и ярмарки</p>
            <button className="cta-button">Найти мероприятия</button>
          </div>
        </div>
      </section>
      
      <section className="features">
        <div className="container">
          <h2>Почему выбирают нас?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <h3>Широкий выбор</h3>
              <p>Более 1000 мероприятий по всей стране</p>
            </div>
            <div className="feature-card">
              <h3>Безопасная оплата</h3>
              <p>Гарантия безопасных онлайн-платежей</p>
            </div>
            <div className="feature-card">
              <h3>Мгновенная доставка</h3>
              <p>Электронные билеты сразу после оплаты</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home