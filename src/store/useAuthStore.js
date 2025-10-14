import { create } from 'zustand';

export const useAuthStore = create((set, get) => ({
  user: JSON.parse(localStorage.getItem('user')) || null,
  isAuthenticated: !!JSON.parse(localStorage.getItem('user')),
  
  login: async (email, password) => {
    const userData = { 
      id: Date.now(), 
      email, 
      name: 'User',
      token: 'fake-jwt-token'
    };
    
    localStorage.setItem('user', JSON.stringify(userData));
    
    const savedCart = JSON.parse(localStorage.getItem(`cart_${userData.id}`)) || [];
    const savedEvents = JSON.parse(localStorage.getItem(`events_${userData.id}`)) || [];
    
    useCartStore.getState().setItems(savedCart);
    useEventsStore.getState().setEvents(savedEvents);
    
    set({ user: userData, isAuthenticated: true });
    return userData;
  },
  
  logout: () => {
    const userId = get().user?.id;
    
    if (userId) {
      const cartItems = useCartStore.getState().items;
      const userEvents = useEventsStore.getState().events;
      
      localStorage.setItem(`cart_${userId}`, JSON.stringify(cartItems));
      localStorage.setItem(`events_${userId}`, JSON.stringify(userEvents));
    }
    
    localStorage.removeItem('user');
    set({ user: null, isAuthenticated: false });
    
    useCartStore.getState().clearCart();
    useEventsStore.getState().clearEvents();
  }
}));