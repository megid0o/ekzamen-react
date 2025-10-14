import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useEventsStore } from '../../store/useEventsStore'
import './AddEvent.css'

const AddEvent = () => {
  const navigate = useNavigate()
  const { addEvent, loading } = useEventsStore()
  
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    location: '',
    address: '',
    price: '',
    type: 'concert',
    description: '',
    organizer: '',
    availableTickets: '',
    duration: '',
    image: ''
  })

  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.title.trim()) newErrors.title = 'Название обязательно'
    if (!formData.date) newErrors.date = 'Дата обязательна'
    if (!formData.location.trim()) newErrors.location = 'Место проведения обязательно'
    if (!formData.address.trim()) newErrors.address = 'Адрес обязателен'
    if (!formData.price || formData.price <= 0) newErrors.price = 'Цена должна быть больше 0'
    if (!formData.description.trim()) newErrors.description = 'Описание обязательно'
    if (!formData.organizer.trim()) newErrors.organizer = 'Организатор обязателен'
    if (!formData.availableTickets || formData.availableTickets <= 0) newErrors.availableTickets = 'Количество билетов должно быть больше 0'
    if (!formData.duration.trim()) newErrors.duration = 'Продолжительность обязательна'
    if (!formData.image.trim()) newErrors.image = 'Ссылка на изображение обязательна'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    try {
      const eventData = {
        ...formData,
        price: Number(formData.price),
        availableTickets: Number(formData.availableTickets),
        id: Date.now()
      }

      await addEvent(eventData)
      
      alert('Мероприятие успешно добавлено!')
      navigate('/events')
    } catch (error) {
      alert('Ошибка при добавлении мероприятия: ' + error.message)
    }
  }

  const handleCancel = () => {
    navigate('/events')
  }

  return (
    <div className="add-event-page">
      <div className="container">
        <div className="page-header">
          <h1>Добавить мероприятие</h1>
          <p>Заполните форму чтобы добавить мероприятие в каталог</p>
        </div>

        <form onSubmit={handleSubmit} className="event-form card">
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="title" className="form-label">
                Название мероприятия *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className={`form-input ${errors.title ? 'error' : ''}`}
                placeholder="Введите название мероприятия"
              />
              {errors.title && <span className="error-message">{errors.title}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="date" className="form-label">
                Дата и время *
              </label>
              <input
                type="datetime-local"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className={`form-input ${errors.date ? 'error' : ''}`}
              />
              {errors.date && <span className="error-message">{errors.date}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="type" className="form-label">
                Тип мероприятия *
              </label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="form-input"
              >
                <option value="concert">Концерт</option>
                <option value="conference">Конференция</option>
                <option value="fair">Ярмарка</option>
                <option value="exhibition">Выставка</option>
                <option value="sport">Спорт</option>
                <option value="theater">Театр</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="organizer" className="form-label">
                Организатор *
              </label>
              <input
                type="text"
                id="organizer"
                name="organizer"
                value={formData.organizer}
                onChange={handleChange}
                className={`form-input ${errors.organizer ? 'error' : ''}`}
                placeholder="Введите название организатора"
              />
              {errors.organizer && <span className="error-message">{errors.organizer}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="location" className="form-label">
                Место проведения *
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className={`form-input ${errors.location ? 'error' : ''}`}
                placeholder="Например: Алматы, Дворец Республики"
              />
              {errors.location && <span className="error-message">{errors.location}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="address" className="form-label">
                Адрес *
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className={`form-input ${errors.address ? 'error' : ''}`}
                placeholder="Введите полный адрес"
              />
              {errors.address && <span className="error-message">{errors.address}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="price" className="form-label">
                Цена билета (₸) *
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className={`form-input ${errors.price ? 'error' : ''}`}
                placeholder="Введите цену"
                min="0"
              />
              {errors.price && <span className="error-message">{errors.price}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="availableTickets" className="form-label">
                Количество билетов *
              </label>
              <input
                type="number"
                id="availableTickets"
                name="availableTickets"
                value={formData.availableTickets}
                onChange={handleChange}
                className={`form-input ${errors.availableTickets ? 'error' : ''}`}
                placeholder="Введите количество"
                min="1"
              />
              {errors.availableTickets && <span className="error-message">{errors.availableTickets}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="duration" className="form-label">
                Продолжительность *
              </label>
              <input
                type="text"
                id="duration"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                className={`form-input ${errors.duration ? 'error' : ''}`}
                placeholder="Например: 3 часа"
              />
              {errors.duration && <span className="error-message">{errors.duration}</span>}
            </div>

            <div className="form-group full-width">
              <label htmlFor="image" className="form-label">
                Ссылка на изображение *
              </label>
              <input
                type="url"
                id="image"
                name="image"
                value={formData.image}
                onChange={handleChange}
                className={`form-input ${errors.image ? 'error' : ''}`}
                placeholder="https://example.com/image.jpg"
              />
              {errors.image && <span className="error-message">{errors.image}</span>}
            </div>

            <div className="form-group full-width">
              <label htmlFor="description" className="form-label">
                Описание мероприятия *
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className={`form-textarea ${errors.description ? 'error' : ''}`}
                placeholder="Подробное описание мероприятия..."
                rows="6"
              />
              {errors.description && <span className="error-message">{errors.description}</span>}
            </div>
          </div>

          <div className="form-actions">
            <button
              type="button"
              onClick={handleCancel}
              className="btn btn-secondary"
              disabled={loading}
            >
              Отмена
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? 'Добавление...' : 'Добавить мероприятие'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddEvent