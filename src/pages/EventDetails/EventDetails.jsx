import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useEventsStore } from '../../store/useEventsStore'
import { useCartStore } from '../../store/useCartStore'
import Loading from '../../components/Loading/Loading'
import './EventDetails.css'

const EventDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [ticketCount, setTicketCount] = useState(1)
  const [imageError, setImageError] = useState(false)
  
  const { getEventById, loading } = useEventsStore()
  const { addToCart, isInCart, getItemQuantity } = useCartStore()
  
  const event = getEventById(Number(id))
  const inCart = isInCart(Number(id))
  const cartQuantity = getItemQuantity(Number(id))

  useEffect(() => {
    setImageError(false)
  }, [event])

  const handleBuyTickets = () => {
    if (event) {
      const totalPrice = event.price * ticketCount
      alert(`Поздравляем! Вы приобрели ${ticketCount} билет(а) на "${event.title}" за ${totalPrice} ₸`)
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

  const handleImageError = () => {
    setImageError(true)
  }

  const getDefaultImage = (type) => {
    const colors = {
      concert: '6366F1',
      conference: '10B981',
      fair: 'F59E0B',
      exhibition: '8B5CF6',
      sport: 'EF4444',
      theater: '06B6D4'
    }
    const color = colors[type] || '6B7280'
    return `https://via.placeholder.com/600x400/${color}/FFFFFF?text=${encodeURIComponent(event?.title || 'Мероприятие')}`
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('ru-RU', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getTypeLabel = (type) => {
    const types = {
      concert: 'Концерт',
      conference: 'Конференция',
      fair: 'Ярмарка',
      exhibition: 'Выставка',
      sport: 'Спорт',
      theater: 'Театр'
    }
    return types[type] || type
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
            <p>Запрошенное мероприятие не существует или было удалено</p>
            <button onClick={handleBack} className="btn btn-primary">
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
          Назад к мероприятиям
        </button>
        
        <div className="event-details-content">
          <div className="event-image-section">
            <img 
              src={imageError ? getDefaultImage(event.type) : event.image} 
              alt={event.title}
              className="event-detail-image"
              onError={handleImageError}
            />
            <div className="image-overlay">
              <span className="event-type-badge">{getTypeLabel(event.type)}</span>
            </div>
          </div>
          
          <div className="event-info-section">
            <div className="event-header">
              <h1 className="event-title">{event.title}</h1>
              <p className="event-organizer">Организатор: {event.organizer}</p>
            </div>

            <div className="event-meta-grid">
              <div className="meta-card">
                <div className="meta-content">
                  <span className="meta-label">Дата и время</span>
                  <span className="meta-value">{formatDate(event.date)}</span>
                </div>
              </div>

              <div className="meta-card">
                <div className="meta-content">
                  <span className="meta-label">Место проведения</span>
                  <span className="meta-value">{event.location}</span>
                  <span className="meta-address">{event.address}</span>
                </div>
              </div>

              <div className="meta-card">
                <div className="meta-content">
                  <span className="meta-label">Продолжительность</span>
                  <span className="meta-value">{event.duration}</span>
                </div>
              </div>

              <div className="meta-card">
                <div className="meta-content">
                  <span className="meta-label">Доступно билетов</span>
                  <span className="meta-value">{event.availableTickets}</span>
                </div>
              </div>

              {inCart && (
                <div className="meta-card">
                  <div className="meta-content">
                    <span className="meta-label">В корзине</span>
                    <span className="meta-value">{cartQuantity} билет(а)</span>
                  </div>
                </div>
              )}
            </div>

            <div className="event-description">
              <h3>Описание мероприятия</h3>
              <p>{event.description}</p>
            </div>

            <div className="ticket-purchase card">
              <div className="price-section">
                <span className="price-label">Цена за билет:</span>
                <span className="price-amount">{event.price} ₸</span>
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
                <span className="total-amount">{totalPrice} ₸</span>
              </div>

              <div className="purchase-actions">
                <button 
                  onClick={handleAddToCart}
                  className="btn btn-secondary"
                  disabled={event.availableTickets === 0}
                >
                  {inCart ? 'Добавить еще' : 'В корзину'}
                </button>
                <button 
                  onClick={handleBuyTickets}
                  className="btn btn-primary"
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