import { useState } from 'react'
import EventActions from '../EventActions/EventActions'
import './EventCard.css'

const EventCard = ({ event, onEventClick, showActions = false }) => {
  const [imageError, setImageError] = useState(false)

  const handleImageError = () => {
    setImageError(true)
  }

  const handleCardClick = () => {
    if (onEventClick) {
      onEventClick(event)
    }
  }

  const getDefaultImage = (type) => {
    const colors = {
      concert: '3498db',
      conference: 'e74c3c',
      fair: '2ecc71',
      exhibition: 'f39c12',
      sport: '9b59b6',
      theater: '1abc9c'
    }
    const color = colors[type] || '34495e'
    return `https://via.placeholder.com/300x200/${color}/ffffff?text=${encodeURIComponent(event.title)}`
  }

  return (
    <div className="event-card">
      <div className="event-image" onClick={handleCardClick}>
        <img 
          src={imageError ? getDefaultImage(event.type) : event.image} 
          alt={event.title}
          onError={handleImageError}
        />
      </div>
      
      <div className="event-content" onClick={handleCardClick}>
        <h3 className="event-title">{event.title}</h3>
        <p className="event-date">{event.date}</p>
        <p className="event-location">{event.location}</p>
        <p className="event-price">{event.price} ₽</p>
        <span className="event-type">{event.type}</span>
      </div>

      {showActions && (
        <EventActions event={event} />
      )}
    </div>
  )
}

export default EventCard