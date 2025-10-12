import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import EventCard from '../../components/EventCard/EventCard'
import SearchBar from '../../components/SearchBar/SearchBar'
import Loading from '../../components/Loading/Loading'
import { useEventsStore } from '../../store/useEventsStore'
import './Events.css'

const Events = () => {
  const navigate = useNavigate()
  
  const {
    events,
    loading,
    searchTerm,
    filterType,
    filteredEvents,
    fetchEvents,
    setSearchTerm,
    setFilterType,
    getFilteredEvents
  } = useEventsStore()

  const displayedEvents = filteredEvents || getFilteredEvents?.() || events

  useEffect(() => {
    if (events.length === 0) {
      fetchEvents()
    }
  }, [events.length, fetchEvents])

  const handleEventClick = (event) => {
    navigate(`/event/${event.id}`)
  }

  if (loading && events.length === 0) {
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
          {displayedEvents.map(event => (
            <EventCard
              key={event.id}
              event={event}
              onEventClick={handleEventClick}
              showActions={true} // Включаем кнопки редактирования/удаления
            />
          ))}
        </div>
        
        {displayedEvents.length === 0 && !loading && (
          <div className="no-events">
            <p>Мероприятия не найдены</p>
            <button 
              onClick={() => {
                setSearchTerm('')
                setFilterType('all')
              }}
              className="reset-filters-button"
            >
              Сбросить фильтры
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Events