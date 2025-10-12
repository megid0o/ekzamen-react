import { useCartStore } from '../../store/useCartStore'
import './Cart.css'

const Cart = ({ isOpen, onClose }) => {
  const { 
    cartItems, 
    removeFromCart, 
    updateQuantity, 
    clearCart, 
    getTotalPrice,
    getTotalItems 
  } = useCartStore()

  const handleCheckout = () => {
    if (cartItems.length === 0) return
    
    alert(`Поздравляем с покупкой! Общая сумма: ${getTotalPrice()} ₽`)
    clearCart()
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="cart-overlay" onClick={onClose}>
      <div className="cart-sidebar" onClick={(e) => e.stopPropagation()}>
        <div className="cart-header">
          <h2>Корзина билетов</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        
        <div className="cart-content">
          {cartItems.length === 0 ? (
            <div className="empty-cart">
              <p>Корзина пуста</p>
              <span>Добавьте билеты на мероприятия</span>
            </div>
          ) : (
            <>
              <div className="cart-items">
                {cartItems.map((item) => (
                  <div key={item.event.id} className="cart-item">
                    <div className="item-info">
                      <h4>{item.event.title}</h4>
                      <p className="item-price">{item.event.price} ₽ × {item.quantity}</p>
                      <p className="item-total">{item.event.price * item.quantity} ₽</p>
                    </div>
                    
                    <div className="item-controls">
                      <div className="quantity-controls">
                        <button 
                          onClick={() => updateQuantity(item.event.id, item.quantity - 1)}
                          className="quantity-btn"
                        >
                          -
                        </button>
                        <span className="quantity">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.event.id, item.quantity + 1)}
                          className="quantity-btn"
                        >
                          +
                        </button>
                      </div>
                      <button 
                        onClick={() => removeFromCart(item.event.id)}
                        className="remove-btn"
                        title="Удалить"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="cart-footer">
                <div className="cart-total">
                  <span>Итого:</span>
                  <span className="total-price">{getTotalPrice()} ₽</span>
                </div>
                <div className="cart-actions">
                  <button 
                    onClick={clearCart}
                    className="clear-cart-btn"
                    disabled={cartItems.length === 0}
                  >
                    Очистить корзину
                  </button>
                  <button 
                    onClick={handleCheckout}
                    className="checkout-btn"
                    disabled={cartItems.length === 0}
                  >
                    Оформить заказ ({getTotalItems()})
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Cart