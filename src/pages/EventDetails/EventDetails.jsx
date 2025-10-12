import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Loading from '../../components/Loading/Loading'
import { useEventsStore } from '../../store/useEventsStore'
import { useCartStore } from '../../store/useCartStore'
import './EventDetails.css'

const EventDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [ticketCount, setTicketCount] = useState(1)
  
  const { getEventById, loading } = useEventsStore()
  const { addToCart, isInCart, getItemQuantity } = useCartStore()
  
  const event = getEventById(Number(id))
  const inCart = isInCart(Number(id))
  const cartQuantity = getItemQuantity(Number(id))

  const handleBuyTickets = () => {
    if (event) {
      alert(`Поздравляем! Вы приобрели ${ticketCount} билет(а) на "${event.title}"`)
      // Здесь будет логика покупки билетов
    }
  }

  const handleAddToCart = () => {
    if (event) {
      addToCart(event, ticketCount)
      alert(`${ticketCount} билет(а) на "${event.title}" добавлены в корзину!`)
    }
  }

  const handleBack = () => {
    navigate('/events')
  }

  if (loading && !event) {
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
              {inCart && (
                <div className="meta-item">
                  <span className="meta-label">🛒 В корзине</span>
                  <span className="meta-value">{cartQuantity} билет(а)</span>
                </div>
              )}
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

              <div className="purchase-actions">
                <button 
                  onClick={handleAddToCart}
                  className="add-to-cart-button"
                  disabled={event.availableTickets === 0}
                >
                  {inCart ? 'Добавить еще' : 'В корзину'}
                </button>
                <button 
                  onClick={handleBuyTickets}
                  className="buy-button"
                  disabled={event.availableTickets === 0}
                >
                  {event.availableTickets > 0 ? 'Купить сейчас' : 'Билеты распроданы'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EventDetails