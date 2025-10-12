import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useCartStore = create(
  persist(
    (set, get) => ({
      // State
      cartItems: [],
      
      // Actions
      addToCart: (event, quantity = 1) => {
        set((state) => {
          const existingItem = state.cartItems.find(item => item.event.id === event.id)
          
          if (existingItem) {
            // Если мероприятие уже в корзине, увеличиваем количество
            return {
              cartItems: state.cartItems.map(item =>
                item.event.id === event.id
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              )
            }
          } else {
            // Добавляем новое мероприятие в корзину
            return {
              cartItems: [...state.cartItems, { event, quantity }]
            }
          }
        })
      },
      
      removeFromCart: (eventId) => {
        set((state) => ({
          cartItems: state.cartItems.filter(item => item.event.id !== eventId)
        }))
      },
      
      updateQuantity: (eventId, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(eventId)
          return
        }
        
        set((state) => ({
          cartItems: state.cartItems.map(item =>
            item.event.id === eventId
              ? { ...item, quantity }
              : item
          )
        }))
      },
      
      clearCart: () => {
        set({ cartItems: [] })
      },
      
      // Computed values
      getTotalPrice: () => {
        const { cartItems } = get()
        return cartItems.reduce((total, item) => {
          return total + (item.event.price * item.quantity)
        }, 0)
      },
      
      getTotalItems: () => {
        const { cartItems } = get()
        return cartItems.reduce((total, item) => total + item.quantity, 0)
      },
      
      getItemQuantity: (eventId) => {
        const { cartItems } = get()
        const item = cartItems.find(item => item.event.id === eventId)
        return item ? item.quantity : 0
      },
      
      isInCart: (eventId) => {
        const { cartItems } = get()
        return cartItems.some(item => item.event.id === eventId)
      }
    }),
    {
      name: 'cart-storage',
    }
  )
)