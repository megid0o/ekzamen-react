import { useState, useEffect } from 'react'
import EventCard from '../../components/EventCard/EventCard'
import SearchBar from '../../components/SearchBar/SearchBar'
import Loading from '../../components/Loading/Loading'
import './Events.css'

const Events = () => {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('all')

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true)
      try {
        // Временные данные
        const mockEvents = [
          {
            id: 1,
            title: 'Rock Concert 2024',
            date: '2024-03-15',
            location: 'Москва, Стадион Лужники',
            price: 2500,
            type: 'concert',
            image: 'https://via.placeholder.com/300x200/3498db/ffffff?text=Rock+Concert'
          },
          {
            id: 2,
            title: 'Tech Conference',
            date: '2024-04-20',
            location: 'Санкт-Петербург, Экспофорум',
            price: 5000,
            type: 'conference',
            image: 'https://via.placeholder.com/300x200/e74c3c/ffffff?text=Tech+Conference'
          },
          {
            id: 3,
            title: 'Book Fair',
            date: '2024-05-10',
            location: 'Казань, Кремль',
            price: 500,
            type: 'fair',
            image: 'https://via.placeholder.com/300x200/2ecc71/ffffff?text=Book+Fair'
          }
        ]
        setTimeout(() => {
          setEvents(mockEvents)
          setLoading(false)
        }, 1000)
      } catch (error) {
        console.error('Error fetching events:', error)
        setLoading(false)
      }
    }

    fetchEvents()
  }, [])

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterType === 'all' || event.type === filterType
    return matchesSearch && matchesFilter
  })

  const handleEventClick = (event) => {

    console.log('Event clicked:', event)
  }

  if (loading) {
    return <Loading />
  }

  return (
    <div className="events-page">
      <div className="container">
        <h1>Все мероприятия</h1>
        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          filterType={filterType}
          onFilterChange={setFilterType}
        />
        
        <div className="events-grid">
          {filteredEvents.map(event => (
            <EventCard
              key={event.id}
              event={event}
              onEventClick={handleEventClick}
            />
          ))}
        </div>
        
        {filteredEvents.length === 0 && (
          <div className="no-events">
            <p>Мероприятия не найдены</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Events