import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Loading from '../../components/Loading/Loading'
import './EventDetails.css'

const EventDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [event, setEvent] = useState(null)
  const [loading, setLoading] = useState(true)
  const [ticketCount, setTicketCount] = useState(1)

  useEffect(() => {
    const fetchEventDetails = async () => {
      setLoading(true)
      try {
        // Имитация загрузки данных с API
        const mockEvents = {
          1: {
            id: 1,
            title: 'Rock Concert 2024',
            date: '15 марта 2024, 19:00',
            location: 'Москва, Стадион Лужники',
            address: 'ул. Лужники, 24, стр. 1',
            price: 2500,
            type: 'concert',
            image: 'https://via.placeholder.com/600x400/3498db/ffffff?text=Rock+Concert',
            description: 'Грандиозный рок-концерт с участием лучших групп страны. Незабываемая атмосфера и море позитива!',
            organizer: 'Rock Events LLC',
            availableTickets: 150,
            duration: '3 часа'
          },
          2: {
            id: 2,
            title: 'Tech Conference 2024',
            date: '20 апреля 2024, 10:00',
            location: 'Санкт-Петербург, Экспофорум',
            address: 'Петроградская наб., 2',
            price: 5000,
            type: 'conference',
            image: 'https://via.placeholder.com/600x400/e74c3c/ffffff?text=Tech+Conference',
            description: 'Крупнейшая технологическая конференция года. Доклады от ведущих экспертов IT-индустрии.',
            organizer: 'Tech Innovations Inc.',
            availableTickets: 300,
            duration: '8 часов'
          },
          3: {
            id: 3,
            title: 'Международная книжная ярмарка',
            date: '10 мая 2024, 11:00',
            location: 'Казань, Кремль',
            address: 'Казанский Кремль',
            price: 500,
            type: 'fair',
            image: 'https://via.placeholder.com/600x400/2ecc71/ffffff?text=Book+Fair',
            description: 'Ежегодная международная книжная ярмарка с участием издательств со всего мира.',
            organizer: 'Книжная палата',
            availableTickets: 1000,
            duration: '6 часов'
          }
        }

        setTimeout(() => {
          const eventData = mockEvents[id]
          if (eventData) {
            setEvent(eventData)
          }
          setLoading(false)
        }, 800)
      } catch (error) {
        console.error('Error fetching event details:', error)
        setLoading(false)
      }
    }

    fetchEventDetails()
  }, [id])

  const handleBuyTickets = () => {
    alert(`Поздравляем! Вы приобрели ${ticketCount} билет(а) на "${event.title}"`)
    // Здесь будет логика покупки билетов
  }

  const handleBack = () => {
    navigate('/events')
  }

  if (loading) {
    return <Loading />
  }

  if (!event) {
    return (
      <div className="event-details">
        <div className="container">
          <div className="event-not-found">
            <h2>Мероприятие не найдено</h2>
            <button onClick={handleBack} className="back-button">
              Вернуться к мероприятиям
            </button>
          </div>
        </div>
      </div>
    )
  }

  const totalPrice = event.price * ticketCount

  return (
    <div className="event-details">
      <div className="container">
        <button onClick={handleBack} className="back-button">
          ← Назад к мероприятиям
        </button>
        
        <div className="event-details-content">
          <div className="event-image-section">
            <img src={event.image} alt={event.title} className="event-detail-image" />
          </div>
          
          <div className="event-info-section">
            <div className="event-header">
              <span className="event-type-badge">{event.type}</span>
              <h1 className="event-title">{event.title}</h1>
              <p className="event-organizer">Организатор: {event.organizer}</p>
            </div>

            <div className="event-meta">
              <div className="meta-item">
                <span className="meta-label">📅 Дата и время</span>
                <span className="meta-value">{event.date}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">📍 Место проведения</span>
                <span className="meta-value">{event.location}</span>
                <span className="meta-address">{event.address}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">⏱️ Продолжительность</span>
                <span className="meta-value">{event.duration}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">🎫 Доступно билетов</span>
                <span className="meta-value">{event.availableTickets}</span>
              </div>
            </div>

            <div className="event-description">
              <h3>Описание мероприятия</h3>
              <p>{event.description}</p>
            </div>

            <div className="ticket-purchase">
              <div className="price-section">
                <span className="price-label">Цена за билет:</span>
                <span className="price-amount">{event.price} ₽</span>
              </div>
              
              <div className="ticket-counter">
                <label htmlFor="ticketCount">Количество билетов:</label>
                <div className="counter-controls">
                  <button 
                    onClick={() => setTicketCount(prev => Math.max(1, prev - 1))}
                    disabled={ticketCount <= 1}
                    className="counter-btn"
                  >
                    -
                  </button>
                  <span className="ticket-count">{ticketCount}</span>
                  <button 
                    onClick={() => setTicketCount(prev => Math.min(event.availableTickets, prev + 1))}
                    disabled={ticketCount >= event.availableTickets}
                    className="counter-btn"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="total-section">
                <span className="total-label">Итого:</span>
                <span className="total-amount">{totalPrice} ₽</span>
              </div>

              <button 
                onClick={handleBuyTickets}
                className="buy-button"
                disabled={event.availableTickets === 0}
              >
                {event.availableTickets > 0 ? 'Купить билеты' : 'Билеты распроданы'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EventDetails