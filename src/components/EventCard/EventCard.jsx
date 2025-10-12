import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCartStore } from '../../store/useCartStore'
import EventActions from '../EventActions/EventActions'
import './EventCard.css'

const EventCard = ({ event, onEventClick, showActions = false }) => {
  const [imageError, setImageError] = useState(false)
  const navigate = useNavigate()
  const { addToCart, isInCart } = useCartStore()

  const inCart = isInCart(event.id)

  const handleImageError = () => {
    setImageError(true)
  }

  const handleCardClick = () => {
    if (onEventClick) {
      onEventClick(event)
    } else {
      navigate(`/event/${event.id}`)
    }
  }

  const handleAddToCart = (e) => {
    e.stopPropagation()
    addToCart(event, 1)
  }

  const getDefaultImage = (type) => {
    const colors = {
      concert: '2D5BFF',
      conference: '00C2FF',
      fair: 'FF6B35',
      exhibition: '8B5CF6',
      sport: '10B981',
      theater: 'F59E0B'
    }
    const color = colors[type] || '6B7280'
    return `https://via.placeholder.com/400x250/${color}/FFFFFF?text=${encodeURIComponent(event.title)}`
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
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

  return (
    <div className="event-card card fade-in">
      <div className="event-image" onClick={handleCardClick}>
        <img 
          src={imageError ? getDefaultImage(event.type) : event.image} 
          alt={event.title}
          onError={handleImageError}
        />
        <div className="event-overlay">
          <button 
            className="quick-add-btn"
            onClick={handleAddToCart}
            title="Добавить в корзину"
          >
            {inCart ? '✓ В корзине' : '+ 🛒'}
          </button>
          <span className="event-type-badge">{getTypeLabel(event.type)}</span>
        </div>
      </div>
      
      <div className="event-content">
        <div className="event-header" onClick={handleCardClick}>
          <h3 className="event-title">{event.title}</h3>
          <p className="event-organizer">{event.organizer}</p>
        </div>

        <div className="event-meta">
          <div className="meta-item">
            <span className="meta-icon">📅</span>
            <span className="meta-text">{formatDate(event.date)}</span>
          </div>
          <div className="meta-item">
            <span className="meta-icon">📍</span>
            <span className="meta-text">{event.location}</span>
          </div>
        </div>

        <div className="event-footer">
          <div className="event-price">
            <span className="price-amount">{event.price} ₸</span>
            <span className="price-label">за билет</span>
          </div>
          <button 
            className="btn btn-primary btn-sm"
            onClick={handleAddToCart}
          >
            {inCart ? 'Добавлено' : 'В корзину'}
          </button>
        </div>
      </div>

      {showActions && (
        <EventActions event={event} />
      )}
    </div>
  )
}

export default EventCard