// src/store/useEventsStore.js
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { seatGeekApi } from '../api/seatGeekApi'

export const useEventsStore = create(
  persist(
    (set, get) => ({
      // State
      events: [],
      loading: false,
      error: null,
      searchTerm: '',
      filterType: 'all',
      lastFetch: null,
      apiStatus: 'idle', // 'idle', 'loading', 'success', 'error'

      // Actions
      setSearchTerm: (searchTerm) => set({ searchTerm }),
      setFilterType: (filterType) => set({ filterType }),

      // ✅ Тестируем API подключение
      testApiConnection: async () => {
        set({ loading: true, error: null, apiStatus: 'loading' });
        try {
          const result = await seatGeekApi.testApi();
          set({ apiStatus: 'success', loading: false });
          return result;
        } catch (error) {
          set({ 
            error: 'API connection failed: ' + error.message, 
            apiStatus: 'error', 
            loading: false 
          });
          throw error;
        }
      },

      // ✅ Загружаем события из API
      fetchEvents: async (forceRefresh = false) => {
        const state = get();
        
        // Не загружать повторно если данные свежие (5 минут кэш)
        if (!forceRefresh && state.events.length > 0 && state.lastFetch && 
            Date.now() - state.lastFetch < 5 * 60 * 1000) {
          console.log('📦 Using cached events');
          return;
        }

        set({ loading: true, error: null, apiStatus: 'loading' });
        
        try {
          console.log('🔄 Starting events fetch...');
          const events = await seatGeekApi.fetchEvents(1, 24);
          
          set({ 
            events, 
            loading: false, 
            lastFetch: Date.now(),
            error: null,
            apiStatus: 'success'
          });
          
          console.log(`✅ Store updated with ${events.length} events`);
          
        } catch (error) {
          console.error('❌ Store fetch error:', error);
          set({ 
            error: 'Failed to load events from API: ' + error.message, 
            loading: false,
            events: [],
            apiStatus: 'error'
          });
        }
      },

      // Остальные методы остаются прежними
      addEvent: async (eventData) => {
        set({ loading: true, error: null });
        try {
          const newEvent = {
            ...eventData,
            id: Date.now(),
            price: Number(eventData.price),
            availableTickets: Number(eventData.availableTickets)
          };
          
          set((state) => ({
            events: [...state.events, newEvent],
            loading: false
          }));
          return newEvent;
        } catch (error) {
          set({ error: 'Ошибка при добавлении мероприятия', loading: false });
          throw error;
        }
      },

      updateEvent: async (eventData) => {
        set({ loading: true, error: null });
        try {
          set((state) => ({
            events: state.events.map(event =>
              event.id === eventData.id ? { ...event, ...eventData } : event
            ),
            loading: false
          }));
          return eventData;
        } catch (error) {
          set({ error: 'Ошибка при обновлении мероприятия', loading: false });
          throw error;
        }
      },

      deleteEvent: async (id) => {
        set({ loading: true, error: null });
        try {
          set((state) => ({
            events: state.events.filter(event => event.id !== id),
            loading: false
          }));
        } catch (error) {
          set({ error: 'Ошибка при удалении мероприятия', loading: false });
          throw error;
        }
      },

      // Computed values
      getFilteredEvents: () => {
        const { events, searchTerm, filterType } = get();
        
        return events.filter(event => {
          const matchesSearch = 
            event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            event.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
            event.organizer?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            event.description?.toLowerCase().includes(searchTerm.toLowerCase());
          
          const matchesFilter = filterType === 'all' || event.type === filterType;
          
          return matchesSearch && matchesFilter;
        });
      },

      getEventById: (id) => {
        const { events } = get();
        const event = events.find(event => event.id === id);
        
        if (!event) {
          console.log(`Event with ID ${id} not found in store`);
        }
        
        return event;
      },

      // Search with API
      searchEvents: async (query) => {
        set({ loading: true, error: null });
        try {
          const events = await seatGeekApi.searchEvents(query);
          set({ events, loading: false });
        } catch (error) {
          console.error('Search error:', error);
          // Fallback к локальному поиску
          set({ searchTerm: query, loading: false });
        }
      },

      // Reset filters
      resetFilters: () => set({ searchTerm: '', filterType: 'all' })
    }),
    {
      name: 'events-storage',
      partialize: (state) => ({ 
        events: state.events,
        searchTerm: state.searchTerm,
        filterType: state.filterType,
        lastFetch: state.lastFetch
      })
    }
  )
);