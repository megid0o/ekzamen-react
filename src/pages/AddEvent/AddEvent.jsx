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
    
    // Очищаем ошибку при изменении поля
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
        id: Date.now() // Временный ID, в реальном приложении генерируется на сервере
      }

      await addEvent(eventData)
      
      // Показываем уведомление об успехе
      alert('Мероприятие успешно добавлено!')
      
      // Перенаправляем на страницу мероприятий
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
        <div className="add-event-header">
          <h1>Добавить новое мероприятие</h1>
          <p>Заполните форму чтобы добавить мероприятие в каталог</p>
        </div>

        <form onSubmit={handleSubmit} className="event-form">
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="title">Название мероприятия *</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className={errors.title ? 'error' : ''}
                placeholder="Введите название мероприятия"
              />
              {errors.title && <span className="error-message">{errors.title}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="date">Дата и время *</label>
              <input
                type="datetime-local"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className={errors.date ? 'error' : ''}
              />
              {errors.date && <span className="error-message">{errors.date}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="type">Тип мероприятия *</label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleChange}
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
              <label htmlFor="organizer">Организатор *</label>
              <input
                type="text"
                id="organizer"
                name="organizer"
                value={formData.organizer}
                onChange={handleChange}
                className={errors.organizer ? 'error' : ''}
                placeholder="Введите название организатора"
              />
              {errors.organizer && <span className="error-message">{errors.organizer}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="location">Место проведения *</label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className={errors.location ? 'error' : ''}
                placeholder="Например: Москва, Кремль"
              />
              {errors.location && <span className="error-message">{errors.location}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="address">Адрес *</label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className={errors.address ? 'error' : ''}
                placeholder="Введите полный адрес"
              />
              {errors.address && <span className="error-message">{errors.address}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="price">Цена билета (₽) *</label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className={errors.price ? 'error' : ''}
                placeholder="Введите цену"
                min="0"
              />
              {errors.price && <span className="error-message">{errors.price}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="availableTickets">Количество билетов *</label>
              <input
                type="number"
                id="availableTickets"
                name="availableTickets"
                value={formData.availableTickets}
                onChange={handleChange}
                className={errors.availableTickets ? 'error' : ''}
                placeholder="Введите количество"
                min="1"
              />
              {errors.availableTickets && <span className="error-message">{errors.availableTickets}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="duration">Продолжительность *</label>
              <input
                type="text"
                id="duration"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                className={errors.duration ? 'error' : ''}
                placeholder="Например: 3 часа"
              />
              {errors.duration && <span className="error-message">{errors.duration}</span>}
            </div>

            <div className="form-group full-width">
              <label htmlFor="image">Ссылка на изображение *</label>
              <input
                type="url"
                id="image"
                name="image"
                value={formData.image}
                onChange={handleChange}
                className={errors.image ? 'error' : ''}
                placeholder="https://example.com/image.jpg"
              />
              {errors.image && <span className="error-message">{errors.image}</span>}
            </div>

            <div className="form-group full-width">
              <label htmlFor="description">Описание мероприятия *</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className={errors.description ? 'error' : ''}
                placeholder="Подробное описание мероприятия..."
                rows="5"
              />
              {errors.description && <span className="error-message">{errors.description}</span>}
            </div>
          </div>

          <div className="form-actions">
            <button
              type="button"
              onClick={handleCancel}
              className="cancel-button"
              disabled={loading}
            >
              Отмена
            </button>
            <button
              type="submit"
              className="submit-button"
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