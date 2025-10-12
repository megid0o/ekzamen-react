import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useEventsStore } from '../../store/useEventsStore'
import EventCard from '../../components/EventCard/EventCard'
import Loading from '../../components/Loading/Loading'
import './Home.css'

const Home = () => {
  const { events, fetchEvents, loading } = useEventsStore()
  const [featuredEvents, setFeaturedEvents] = useState([])

  // useEffect для загрузки данных
  useEffect(() => {
    if (events.length === 0) {
      fetchEvents()
    }
  }, [events.length, fetchEvents])

  // useEffect для выбора featured events
  useEffect(() => {
    if (events.length > 0) {
      setFeaturedEvents(events.slice(0, 3))
    }
  }, [events])

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="hero-title">
                Найдите свои
                <span className="gradient-text"> идеальные мероприятия</span>
              </h1>
              <p className="hero-description">
                Откройте для себя лучшие концерты, конференции, выставки и спортивные события. 
                Покупайте билеты быстро и безопасно.
              </p>
              <div className="hero-actions">
                <Link to="/events" className="btn btn-primary">
                  Смотреть мероприятия
                </Link>
                <Link to="/about" className="btn btn-secondary">
                  О нас
                </Link>
              </div>
            </div>
            <div className="hero-visual">
              <div className="floating-cards">
                <div className="card floating-card-1">Концерты</div>
                <div className="card floating-card-2">Конференции</div>
                <div className="card floating-card-3">Выставки</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="featured-events">
        <div className="container">
          <div className="section-header">
            <h2>Популярные мероприятия</h2>
            <p>Самые ожидаемые события этого месяца</p>
          </div>

          {loading && events.length === 0 ? (
            <Loading />
          ) : (
            <div className="events-grid">
              {featuredEvents.map(event => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          )}

          <div className="section-actions">
            <Link to="/events" className="btn btn-primary">
              Все мероприятия
            </Link>
          </div>
        </div>
      </section>

      <section className="features">
        <div className="container">
          <div className="section-header">
            <h2>Почему выбирают EventHub?</h2>
          </div>
          <div className="features-grid">
            <div className="feature-card">
              <h3>Мгновенная доставка</h3>
              <p>Электронные билеты приходят сразу после оплаты</p>
            </div>
            <div className="feature-card">
              <h3>Безопасная оплата</h3>
              <p>Все платежи защищены современными технологиями</p>
            </div>
            <div className="feature-card">
              <h3>Широкий выбор</h3>
              <p>Более 1000 мероприятий по всему Казахстану</p>
            </div>
            <div className="feature-card">
              <h3>Удобный сервис</h3>
              <p>Простой и интуитивно понятный интерфейс</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home