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
      // Можно показать уведомление об успешном удалении
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
        className="edit-button"
        title="Редактировать мероприятие"
      >
        ✏️
      </button>
      <button 
        onClick={handleDelete}
        className="delete-button"
        disabled={isDeleting}
        title="Удалить мероприятие"
      >
        {isDeleting ? '⏳' : '🗑️'}
      </button>
    </div>
  )
}

export default EventActions