import { useState } from 'react'
import { useAuthStore } from '../../store/useAuthStore'
import './LoginModal.css'

const LoginModal = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: ''
  })
  const [error, setError] = useState('')
  
  const { login, register, loading } = useAuthStore()

  if (!isOpen) return null

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    try {
      if (isLogin) {
        await login(formData.email, formData.password)
        onClose()
        setFormData({ email: '', password: '', name: '', confirmPassword: '' })
      } else {
        if (formData.password !== formData.confirmPassword) {
          setError('Пароли не совпадают')
          return
        }
        await register({
          email: formData.email,
          password: formData.password,
          name: formData.name
        })
        onClose()
        setFormData({ email: '', password: '', name: '', confirmPassword: '' })
      }
    } catch (err) {
      setError(err.message)
    }
  }

  const switchMode = () => {
    setIsLogin(!isLogin)
    setError('')
    setFormData({ email: '', password: '', name: '', confirmPassword: '' })
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{isLogin ? 'Вход в аккаунт' : 'Регистрация'}</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {!isLogin && (
            <div className="form-group">
              <label htmlFor="name" className="form-label">Имя</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="form-input"
                placeholder="Введите ваше имя"
                required
              />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-input"
              placeholder="your@email.com"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">Пароль</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="form-input"
              placeholder="Введите пароль"
              required
            />
          </div>

          {!isLogin && (
            <div className="form-group">
              <label htmlFor="confirmPassword" className="form-label">Подтвердите пароль</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="form-input"
                placeholder="Повторите пароль"
                required
              />
            </div>
          )}

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="btn btn-primary submit-btn"
            disabled={loading}
          >
            {loading ? 'Загрузка...' : (isLogin ? 'Войти' : 'Зарегистрироваться')}
          </button>
        </form>

        <div className="auth-switch">
          <p>
            {isLogin ? 'Нет аккаунта?' : 'Уже есть аккаунт?'}
            <button type="button" className="switch-button" onClick={switchMode}>
              {isLogin ? 'Зарегистрироваться' : 'Войти'}
            </button>
          </p>
        </div>

        <div className="demo-credentials">
          <p><strong>Демо доступ:</strong></p>
          <p>Email: admin@example.com</p>
          <p>Пароль: password</p>
        </div>
      </div>
    </div>
  )
}

export default LoginModal