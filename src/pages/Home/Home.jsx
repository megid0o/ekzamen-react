import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useEventsStore } from '../../store/useEventsStore';
import EventCard from '../../components/EventCard/EventCard';
import Loading from '../../components/Loading/Loading';
import './Home.css';

const Home = () => {
  const { events, fetchEvents, loading } = useEventsStore();
  const [featuredEvents, setFeaturedEvents] = useState([]);

  useEffect(() => {
    if (events.length === 0) {
      fetchEvents();
    }
  }, [events.length, fetchEvents]);

  useEffect(() => {
    if (events.length > 0) {
      setFeaturedEvents(events.slice(0, 6));
    }
  }, [events]);

  return (
    <div className="home">
      {/* Hero Section - SpaceX Style */}
      <section className="hero">
        <div className="hero-background"></div>
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="hero-title">
                Билеты на 
                <span className="hero-accent"> Tikkets</span>
              </h1>
              <p className="hero-description">
                Откройте для себя самые технологичные и инновационные мероприятия. 
                От концертов будущего до технологических конференций - ваш следующий опыт начинается здесь.
              </p>
              <div className="hero-actions">
                <Link to="/events" className="btn btn-primary">
                  ИССЛЕДОВАТЬ МЕРОПРИЯТИЯ
                </Link>
                <Link to="/about" className="btn btn-secondary">
                  УЗНАТЬ БОЛЬШЕ
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Events Section */}
      <section className="featured-events">
        <div className="container">
          <div className="section-header">
            <h2>ПОПУЛЯРНЫЕ МЕРОПРИЯТИЯ</h2>
            <p>Самые ожидаемые события ближайшего будущего</p>
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
              ВСЕ МЕРОПРИЯТИЯ
            </Link>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="mission">
        <div className="container">
          <div className="mission-content">
            <div className="mission-text">
              <h2>НАША МИССИЯ</h2>
              <p>
                TIKKETS создает будущее в сфере мероприятий, объединяя передовые технологии 
                с непревзойденным пользовательским опытом. Мы верим, что каждое мероприятие 
                должно быть уникальным путешествием.
              </p>
              <div className="mission-stats">
                <div className="stat">
                  <span className="stat-number">1000+</span>
                  <span className="stat-label">МЕРОПРИЯТИЙ</span>
                </div>
                <div className="stat">
                  <span className="stat-number">50K+</span>
                  <span className="stat-label">ПОКУПАТЕЛЕЙ</span>
                </div>
                <div className="stat">
                  <span className="stat-number">99%</span>
                  <span className="stat-label">УДОВЛЕТВОРЕНИЯ</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;