import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create(
  persist(
    (set, get) => ({
      // State
      user: null,
      isAuthenticated: false,
      loading: false,
      
      // Actions
      login: async (email, password) => {
        set({ loading: true });
        
        // Имитация API запроса
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            if (email && password.length >= 6) {
              const user = {
                id: 1,
                email: email,
                name: email.split('@')[0],
                avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(email.split('@')[0])}&background=6366F1&color=fff`
              };
              
              set({ 
                user, 
                isAuthenticated: true, 
                loading: false 
              });
              resolve(user);
            } else {
              set({ loading: false });
              reject(new Error('Invalid email or password'));
            }
          }, 1500);
        });
      },
      
      register: async (email, password, name) => {
        set({ loading: true });
        
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            if (email && password.length >= 6 && name) {
              const user = {
                id: Date.now(),
                email: email,
                name: name,
                avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=6366F1&color=fff`
              };
              
              set({ 
                user, 
                isAuthenticated: true, 
                loading: false 
              });
              resolve(user);
            } else {
              set({ loading: false });
              reject(new Error('Please fill all fields correctly'));
            }
          }, 1500);
        });
      },
      
      logout: () => {
        set({ 
          user: null, 
          isAuthenticated: false 
        });
      },
      
      updateProfile: (userData) => {
        set(state => ({
          user: { ...state.user, ...userData }
        }));
      }
    }),
    {
      name: 'auth-storage',
    }
  )
);