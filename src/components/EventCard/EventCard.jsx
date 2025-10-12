import './EventCard.css'

const EventCard = ({ event, onEventClick }) => {
  const handleClick = () => {
    if (onEventClick) {
      onEventClick(event)
    }
  }

  return (
    <div className="event-card" onClick={handleClick}>
      <div className="event-image">
        <img src={event.image} alt={event.title} />
      </div>
      <div className="event-content">
        <h3 className="event-title">{event.title}</h3>
        <p className="event-date">{event.date}</p>
        <p className="event-location">{event.location}</p>
        <p className="event-price">{event.price} ₽</p>
        <span className="event-type">{event.type}</span>
      </div>
    </div>
  )
}

export default EventCard