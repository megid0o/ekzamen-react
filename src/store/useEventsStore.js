import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// ✅ Имитация работы с API
const mockApi = {
  fetchEvents: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: 1,
            title: 'Rock Concert 2024',
            date: '2024-03-15T19:00',
            location: 'Алматы, Дворец Республики',
            address: 'пр. Абылай хана, 56',
            price: 5000,
            type: 'concert',
            image: 'https://via.placeholder.com/400x250/2D5BFF/FFFFFF?text=Rock+Concert+2024',
            description: 'Грандиозный рок-концерт с участием лучших групп Казахстана. Незабываемая атмосфера и море позитива!',
            organizer: 'Rock Events KZ',
            availableTickets: 150,
            duration: '3 часа'
          },
          {
            id: 2,
            title: 'Tech Conference Astana',
            date: '2024-04-20T10:00',
            location: 'Астана, EXPO Congress Center',
            address: 'ул. Мангилик Ел, 53/1',
            price: 15000,
            type: 'conference',
            image: 'https://via.placeholder.com/400x250/00C2FF/FFFFFF?text=Tech+Conference+Astana',
            description: 'Крупнейшая технологическая конференция года. Доклады от ведущих экспертов IT-индустрии Казахстана и мира.',
            organizer: 'Tech Innovations KZ',
            availableTickets: 300,
            duration: '8 часов'
          },
          {
            id: 3,
            title: 'Международная книжная ярмарка',
            date: '2024-05-10T11:00',
            location: 'Алматы, Атакент',
            address: 'ул. Тимирязева, 42',
            price: 1000,
            type: 'fair',
            image: 'https://via.placeholder.com/400x250/FF6B35/FFFFFF?text=Book+Fair+2024',
            description: 'Ежегодная международная книжная ярмарка с участием издательств со всего мира. Презентации новых книг, встречи с авторами.',
            organizer: 'Книжная палата РК',
            availableTickets: 1000,
            duration: '6 часов'
          },
          {
            id: 4,
            title: 'Футбольный матч: Астана - Кайрат',
            date: '2024-06-05T18:00',
            location: 'Астана, Astana Arena',
            address: 'ул. Кунаева, 44',
            price: 3000,
            type: 'sport',
            image: 'https://via.placeholder.com/400x250/10B981/FFFFFF?text=Astana+vs+Kairat',
            description: 'Эмоциональное дерби между двумя сильнейшими клубами Казахстана. Не пропустите главный матч сезона!',
            organizer: 'KFF Events',
            availableTickets: 25000,
            duration: '2 часа'
          }
        ])
      }, 1000)
    })
  },

  addEvent: (event) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ ...event, id: Date.now() })
      }, 500)
    })
  },

  updateEvent: (event) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(event)
      }, 500)
    })
  },

  deleteEvent: (id) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(id)
      }, 500)
    })
  }
}

export const useEventsStore = create(
  persist(
    (set, get) => ({
      // ✅ State
      events: [],
      loading: false,
      error: null,
      searchTerm: '',
      filterType: 'all',

      // ✅ Actions
      setSearchTerm: (searchTerm) => set({ searchTerm }),
      setFilterType: (filterType) => set({ filterType }),

      // ✅ Async Actions (работа с API)
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

      // ✅ Computed values
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