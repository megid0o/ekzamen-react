import { useEffect, useState } from 'react'
import { useEventsStore } from '../../store/useEventsStore'
import EventCard from '../../components/EventCard/EventCard'
import SearchBar from '../../components/SearchBar/SearchBar'
import Loading from '../../components/Loading/Loading'
import './Events.css'

const Events = () => {
  const {
    events,
    loading,
    searchTerm,
    filterType,
    filteredEvents,
    fetchEvents,
    setSearchTerm,
    setFilterType,
    getFilteredEvents,
    resetFilters,
    error
  } = useEventsStore()

  const [displayedEvents, setDisplayedEvents] = useState([])

  useEffect(() => {
    if (events.length === 0) {
      fetchEvents()
    }
  }, [events.length, fetchEvents])

  useEffect(() => {
    const filtered = filteredEvents || getFilteredEvents?.() || events
    setDisplayedEvents(filtered)
  }, [events, filteredEvents, getFilteredEvents])

  const handleRetry = () => {
    fetchEvents(true)
  }

  if (loading && events.length === 0) {
    return (
      <div className="events-page">
        <div className="container">
          <Loading />
        </div>
      </div>
    )
  }

  return (
    <div className="events-page">
      <div className="container">
        <div className="page-header">
          <h1>ВСЕ МЕРОПРИЯТИЯ</h1>
          <p>Откройте для себя уникальные события</p>
        </div>

        {error && (
          <div className="api-error">
            <p>{error}</p>
            <button onClick={handleRetry} className="btn btn-primary">
              Попробовать снова
            </button>
          </div>
        )}

        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          filterType={filterType}
          onFilterChange={setFilterType}
        />
        
        <div className="events-stats">
          <span>Найдено мероприятий: {displayedEvents.length}</span>
          {(searchTerm || filterType !== 'all') && (
            <button 
              onClick={resetFilters}
              className="btn btn-secondary btn-sm"
            >
              Сбросить фильтры
            </button>
          )}
        </div>
        
        <div className="events-grid">
          {displayedEvents.map(event => (
            <EventCard
              key={event.id}
              event={event}
              showActions={true}
            />
          ))}
        </div>
        
        {displayedEvents.length === 0 && !loading && !error && (
          <div className="no-events">
            <h3>Мероприятия не найдены</h3>
            <p>Попробуйте изменить параметры поиска или сбросить фильтры</p>
            <button 
              onClick={resetFilters}
              className="btn btn-primary"
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