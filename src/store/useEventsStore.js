import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const mockApi = {
  fetchEvents: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: 1,
            title: 'Rock Concert 2024',
            date: '2024-03-15',
            location: 'Москва, Стадион Лужники',
            price: 2500,
            type: 'concert',
            image: 'https://via.placeholder.com/300x200/3498db/ffffff?text=Rock+Concert',
            description: 'Грандиозный рок-концерт с участием лучших групп страны.',
            organizer: 'Rock Events LLC',
            availableTickets: 150,
            duration: '3 часа',
            address: 'ул. Лужники, 24, стр. 1'
          },
          {
            id: 2,
            title: 'Tech Conference 2024',
            date: '2024-04-20',
            location: 'Санкт-Петербург, Экспофорум',
            price: 5000,
            type: 'conference',
            image: 'https://via.placeholder.com/300x200/e74c3c/ffffff?text=Tech+Conference',
            description: 'Крупнейшая технологическая конференция года.',
            organizer: 'Tech Innovations Inc.',
            availableTickets: 300,
            duration: '8 часов',
            address: 'Петроградская наб., 2'
          },
          {
            id: 3,
            title: 'Международная книжная ярмарка',
            date: '2024-05-10',
            location: 'Казань, Кремль',
            price: 500,
            type: 'fair',
            image: 'https://via.placeholder.com/300x200/2ecc71/ffffff?text=Book+Fair',
            description: 'Ежегодная международная книжная ярмарка.',
            organizer: 'Книжная палата',
            availableTickets: 1000,
            duration: '6 часов',
            address: 'Казанский Кремль'
          }
        ])
      }, 500)
    })
  },

  addEvent: (event) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ ...event, id: Date.now() })
      }, 300)
    })
  },

  updateEvent: (event) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(event)
      }, 300)
    })
  },

  deleteEvent: (id) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(id)
      }, 300)
    })
  }
}

export const useEventsStore = create(
  persist(
    (set, get) => ({
      // State
      events: [],
      loading: false,
      error: null,
      searchTerm: '',
      filterType: 'all',

      // Actions
      setSearchTerm: (searchTerm) => set({ searchTerm }),
      setFilterType: (filterType) => set({ filterType }),

      // Async
      fetchEvents: async () => {
        set({ loading: true, error: null })
        try {
          const events = await mockApi.fetchEvents()
          set({ events, loading: false })
        } catch (error) {
          set({ error: 'Ошибка при загрузке мероприятий', loading: false })
        }
      },

      addEvent: async (eventData) => {
        set({ loading: true, error: null })
        try {
          const newEvent = await mockApi.addEvent(eventData)
          set((state) => ({
            events: [...state.events, newEvent],
            loading: false
          }))
          return newEvent
        } catch (error) {
          set({ error: 'Ошибка при добавлении мероприятия', loading: false })
          throw error
        }
      },

      updateEvent: async (eventData) => {
        set({ loading: true, error: null })
        try {
          const updatedEvent = await mockApi.updateEvent(eventData)
          set((state) => ({
            events: state.events.map(event =>
              event.id === updatedEvent.id ? updatedEvent : event
            ),
            loading: false
          }))
          return updatedEvent
        } catch (error) {
          set({ error: 'Ошибка при обновлении мероприятия', loading: false })
          throw error
        }
      },

      deleteEvent: async (id) => {
        set({ loading: true, error: null })
        try {
          await mockApi.deleteEvent(id)
          set((state) => ({
            events: state.events.filter(event => event.id !== id),
            loading: false
          }))
        } catch (error) {
          set({ error: 'Ошибка при удалении мероприятия', loading: false })
          throw error
        }
      },
)
      getFilteredEvents: () => {
        const { events, searchTerm, filterType } = get()
        
        return events.filter(event => {
          const matchesSearch = 
            event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            event.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
            event.organizer?.toLowerCase().includes(searchTerm.toLowerCase())
          
          const matchesFilter = filterType === 'all' || event.type === filterType
          
          return matchesSearch && matchesFilter
        })
      },

      getEventById: (id) => {
        const { events } = get()
        return events.find(event => event.id === id)
      },

      // Reset filters
      resetFilters: () => set({ searchTerm: '', filterType: 'all' })
    }),
    {
      name: 'events-storage',
      partialize: (state) => ({ 
        events: state.events,
        searchTerm: state.searchTerm,
        filterType: state.filterType
      })
    }
  )
)