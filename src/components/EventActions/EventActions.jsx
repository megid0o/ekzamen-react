import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useEventsStore } from '../../store/useEventsStore'
import './EventActions.css'

const EventActions = ({ event }) => {
  const navigate = useNavigate()
  const { deleteEvent } = useEventsStore()
  const [isDeleting, setIsDeleting] = useState(false)

  const handleEdit = () => {
    navigate(`/edit-event/${event.id}`)
  }

  const handleDelete = async () => {
    if (!window.confirm(`Вы уверены, что хотите удалить мероприятие "${event.title}"?`)) {
      return
    }

    setIsDeleting(true)
    try {
      await deleteEvent(event.id)
    } catch (error) {
      alert('Ошибка при удалении мероприятия: ' + error.message)
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <div className="event-actions">
      <button 
        onClick={handleEdit}
        className="action-btn edit-btn"
        title="Редактировать мероприятие"
      >
        Редактировать
      </button>
      <button 
        onClick={handleDelete}
        className="action-btn delete-btn"
        disabled={isDeleting}
        title="Удалить мероприятие"
      >
        {isDeleting ? 'Удаление...' : 'Удалить'}
      </button>
    </div>
  )
}

export default EventActions