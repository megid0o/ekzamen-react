import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// ✅ Имитация работы с реальным API мероприятий
const mockApi = {
  fetchEvents: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          // Концерты (6 мероприятий)
          {
            id: 1,
            title: 'ROCK FEST 2024',
            date: '2024-04-15T19:00',
            location: 'Алматы, Дворец Республики',
            address: 'пр. Абылай хана, 56',
            price: 5000,
            type: 'concert',
            image: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=400&h=250&fit=crop',
            description: 'Крупнейший рок-фестиваль года с участием лучших групп Казахстана и зарубежных звезд. Незабываемая атмосфера живого звука.',
            organizer: 'Rock Events KZ',
            availableTickets: 150,
            duration: '4 часа'
          },
          {
            id: 2,
            title: 'JAZZ UNDER STARS',
            date: '2024-05-20T20:00',
            location: 'Астана, Концертный зал',
            address: 'ул. Мангилик Ел, 10',
            price: 3500,
            type: 'concert',
            image: 'https://images.unsplash.com/photo-1415201364774-f6e0c31a9a82?w=400&h=250&fit=crop',
            description: 'Вечер джазовой музыки под открытым небом. Выступления известных джазовых коллективов.',
            organizer: 'Jazz Club Astana',
            availableTickets: 200,
            duration: '3 часа'
          },
          {
            id: 3,
            title: 'CLASSIC SYMPHONY',
            date: '2024-06-10T18:30',
            location: 'Алматы, Филармония',
            address: 'ул. Калдаякова, 35',
            price: 2500,
            type: 'concert',
            image: 'https://images.unsplash.com/photo-1571974599782-87624638275f?w=400&h=250&fit=crop',
            description: 'Симфонический оркестр исполняет классические произведения мировых композиторов.',
            organizer: 'National Philharmonic',
            availableTickets: 300,
            duration: '2.5 часа'
          },
          {
            id: 4,
            title: 'POP HITS LIVE',
            date: '2024-07-05T21:00',
            location: 'Алматы, Стадион',
            address: 'пр. Аль-Фараби, 123',
            price: 7000,
            type: 'concert',
            image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&h=250&fit=crop',
            description: 'Концерт популярных исполнителей с живым звуком и световым шоу.',
            organizer: 'Music Promo Group',
            availableTickets: 5000,
            duration: '5 часов'
          },
          {
            id: 5,
            title: 'ELECTRO NIGHT',
            date: '2024-08-12T22:00',
            location: 'Астана, Night Club',
            address: 'ул. Достык, 25',
            price: 3000,
            type: 'concert',
            image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=400&h=250&fit=crop',
            description: 'Электронная музыка от лучших диджеев страны. Танцы до утра.',
            organizer: 'Electro Events',
            availableTickets: 800,
            duration: '6 часов'
          },
          {
            id: 6,
            title: 'FOLK MUSIC FESTIVAL',
            date: '2024-09-08T17:00',
            location: 'Алматы, Парк',
            address: 'Горный Гигант парк',
            price: 2000,
            type: 'concert',
            image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&h=250&fit=crop',
            description: 'Фестиваль народной музыки с участием этнических коллективов.',
            organizer: 'Culture Foundation',
            availableTickets: 1500,
            duration: '4 часа'
          },

          // Конференции (6 мероприятий)
          {
            id: 7,
            title: 'TECH CONFERENCE 2024',
            date: '2024-04-25T09:00',
            location: 'Астана, EXPO Congress Center',
            address: 'ул. Мангилик Ел, 53/1',
            price: 15000,
            type: 'conference',
            image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=250&fit=crop',
            description: 'Крупнейшая технологическая конференция года. Доклады от ведущих экспертов IT-индустрии.',
            organizer: 'Tech Innovations KZ',
            availableTickets: 500,
            duration: '8 часов'
          },
          {
            id: 8,
            title: 'DIGITAL MARKETING SUMMIT',
            date: '2024-05-30T10:00',
            location: 'Алматы, Rixos Hotel',
            address: 'пр. Сейфуллина, 506',
            price: 12000,
            type: 'conference',
            image: 'https://images.unsplash.com/photo-1551836026-d5c2e0c49b61?w=400&h=250&fit=crop',
            description: 'Саммит по цифровому маркетингу. Новейшие стратегии и инструменты продвижения.',
            organizer: 'Marketing Pro',
            availableTickets: 300,
            duration: '7 часов'
          },
          {
            id: 9,
            title: 'STARTUP INVEST FORUM',
            date: '2024-06-18T09:30',
            location: 'Астана, Hilton Hotel',
            address: 'ул. Сауран, 46',
            price: 20000,
            type: 'conference',
            image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400&h=250&fit=crop',
            description: 'Форум для стартапов и инвесторов. Питч-сессии и нетворкинг.',
            organizer: 'Startup Kazakhstan',
            availableTickets: 250,
            duration: '9 часов'
          },
          {
            id: 10,
            title: 'AI & MACHINE LEARNING',
            date: '2024-07-22T10:00',
            location: 'Алматы, NU University',
            address: 'ул. Кажымукана, 123',
            price: 8000,
            type: 'conference',
            image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=250&fit=crop',
            description: 'Конференция по искусственному интеллекту и машинному обучению.',
            organizer: 'AI Research Center',
            availableTickets: 400,
            duration: '6 часов'
          },
          {
            id: 11,
            title: 'BLOCKCHAIN REVOLUTION',
            date: '2024-08-15T11:00',
            location: 'Астана, Financial Center',
            address: 'пр. Кабанбай батыра, 12',
            price: 18000,
            type: 'conference',
            image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=250&fit=crop',
            description: 'Конференция о блокчейн технологиях и криптовалютах.',
            organizer: 'Blockchain Association',
            availableTickets: 350,
            duration: '8 часов'
          },
          {
            id: 12,
            title: 'FINTECH INNOVATIONS',
            date: '2024-09-20T09:00',
            location: 'Алматы, Business Center',
            address: 'пр. Абылай хана, 67',
            price: 16000,
            type: 'conference',
            image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop',
            description: 'Инновации в финансовых технологиях. Будущее банкинга.',
            organizer: 'FinTech Kazakhstan',
            availableTickets: 280,
            duration: '7 часов'
          },

          // Спорт (6 мероприятий)
          {
            id: 13,
            title: 'FOOTBALL: ASTANA - KAIRAT',
            date: '2024-04-20T18:00',
            location: 'Астана, Astana Arena',
            address: 'ул. Кунаева, 44',
            price: 3000,
            type: 'sport',
            image: 'https://images.unsplash.com/photo-1575361204480-aadea25e6e68?w=400&h=250&fit=crop',
            description: 'Эмоциональное дерби между двумя сильнейшими клубами Казахстана.',
            organizer: 'KFF Events',
            availableTickets: 25000,
            duration: '2 часа'
          },
          {
            id: 14,
            title: 'BOXING CHAMPIONSHIP',
            date: '2024-05-15T19:30',
            location: 'Алматы, Baluan Sholak',
            address: 'ул. Абылай хана, 48',
            price: 5000,
            type: 'sport',
            image: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=400&h=250&fit=crop',
            description: 'Чемпионат по боксу среди профессионалов. Титульный бой.',
            organizer: 'Boxing Federation',
            availableTickets: 8000,
            duration: '3 часа'
          },
          {
            id: 15,
            title: 'BASKETBALL FINALS',
            date: '2024-06-08T17:00',
            location: 'Астана, Sports Palace',
            address: 'ул. Достык, 11',
            price: 2500,
            type: 'sport',
            image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&h=250&fit=crop',
            description: 'Финальные игры чемпионата по баскетболу.',
            organizer: 'Basketball Association',
            availableTickets: 12000,
            duration: '2.5 часа'
          },
          {
            id: 16,
            title: 'TENNIS TOURNAMENT',
            date: '2024-07-12T14:00',
            location: 'Алматы, Tennis Center',
            address: 'ул. Розыбакиева, 247',
            price: 4000,
            type: 'sport',
            image: 'https://images.unsplash.com/photo-1595435934247-5d2d4c0a8974?w=400&h=250&fit=crop',
            description: 'Международный теннисный турнир с участием звезд мирового тенниса.',
            organizer: 'Tennis Federation',
            availableTickets: 5000,
            duration: '6 часов'
          },
          {
            id: 17,
            title: 'MARATHON 2024',
            date: '2024-08-25T07:00',
            location: 'Алматы, Старт в центре',
            address: 'пл. Республики',
            price: 1500,
            type: 'sport',
            image: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=400&h=250&fit=crop',
            description: 'Ежегодный марафон по улицам города. Дистанции 5км, 10км, 42км.',
            organizer: 'Running Club',
            availableTickets: 10000,
            duration: '5 часов'
          },
          {
            id: 18,
            title: 'ICE HOCKEY CUP',
            date: '2024-09-30T19:00',
            location: 'Астана, Ice Palace',
            address: 'ул. Кабанбай батыра, 51',
            price: 3500,
            type: 'sport',
            image: 'https://images.unsplash.com/photo-1547407139-3c921a66005c?w=400&h=250&fit=crop',
            description: 'Кубок по хоккею с участием ведущих команд страны.',
            organizer: 'Hockey Federation',
            availableTickets: 15000,
            duration: '3 часа'
          },

          // Выставки (6 мероприятий)
          {
            id: 19,
            title: 'ART EXHIBITION: MODERN',
            date: '2024-04-10T11:00',
            location: 'Алматы, Музей искусств',
            address: 'ул. Казыбек би, 23',
            price: 1500,
            type: 'exhibition',
            image: 'https://images.unsplash.com/photo-1563089145-599997674d42?w=400&h=250&fit=crop',
            description: 'Выставка современного искусства от казахстанских и зарубежных художников.',
            organizer: 'Art Gallery',
            availableTickets: 500,
            duration: '8 часов'
          },
          {
            id: 20,
            title: 'AUTO SHOW 2024',
            date: '2024-05-22T10:00',
            location: 'Астана, EXPO Center',
            address: 'ул. Мангилик Ел, 53/1',
            price: 2000,
            type: 'exhibition',
            image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=400&h=250&fit=crop',
            description: 'Международный автосалон с новинками автомобильной индустрии.',
            organizer: 'Auto Expo',
            availableTickets: 10000,
            duration: '10 часов'
          },
          {
            id: 21,
            title: 'PHOTOGRAPHY EXPO',
            date: '2024-06-14T12:00',
            location: 'Алматы, Gallery Space',
            address: 'ул. Гоголя, 15',
            price: 1000,
            type: 'exhibition',
            image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=250&fit=crop',
            description: 'Выставка фотографий от известных фотографов Казахстана.',
            organizer: 'Photo Art Club',
            availableTickets: 300,
            duration: '6 часов'
          },
          {
            id: 22,
            title: 'FASHION WEEK',
            date: '2024-07-18T19:00',
            location: 'Астана, Rixos Ballroom',
            address: 'ул. Достык, 9',
            price: 8000,
            type: 'exhibition',
            image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=250&fit=crop',
            description: 'Неделя моды с показами известных дизайнеров.',
            organizer: 'Fashion Association',
            availableTickets: 800,
            duration: '4 часа'
          },
          {
            id: 23,
            title: 'TECH EXPO',
            date: '2024-08-30T10:00',
            location: 'Алматы, Atakent',
            address: 'ул. Тимирязева, 42',
            price: 1200,
            type: 'exhibition',
            image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=250&fit=crop',
            description: 'Выставка технологических инноваций и гаджетов.',
            organizer: 'Tech Expo Org',
            availableTickets: 5000,
            duration: '9 часов'
          },
          {
            id: 24,
            title: 'DESIGN EXHIBITION',
            date: '2024-09-25T11:00',
            location: 'Астана, Design Center',
            address: 'ул. Кенесары, 32',
            price: 900,
            type: 'exhibition',
            image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=250&fit=crop',
            description: 'Выставка дизайнерских работ в различных стилях.',
            organizer: 'Design Union',
            availableTickets: 600,
            duration: '7 часов'
          },

          // Ярмарки (6 мероприятий)
          {
            id: 25,
            title: 'BOOK FAIR 2024',
            date: '2024-04-28T10:00',
            location: 'Алматы, Атакент',
            address: 'ул. Тимирязева, 42',
            price: 500,
            type: 'fair',
            image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=250&fit=crop',
            description: 'Международная книжная ярмарка с участием издательств со всего мира.',
            organizer: 'Книжная палата РК',
            availableTickets: 3000,
            duration: '8 часов'
          },
          {
            id: 26,
            title: 'FOOD FESTIVAL',
            date: '2024-05-25T12:00',
            location: 'Астана, Парк',
            address: 'Парк влюбленных',
            price: 800,
            type: 'fair',
            image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=250&fit=crop',
            description: 'Фестиваль еды с блюдами национальной и международной кухни.',
            organizer: 'Food Events',
            availableTickets: 5000,
            duration: '10 часов'
          },
          {
            id: 27,
            title: 'CRAFT MARKET',
            date: '2024-06-22T11:00',
            location: 'Алматы, Арбат',
            address: 'ул. Жибек Жолы',
            price: 0,
            type: 'fair',
            image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=250&fit=crop',
            description: 'Ярмарка handmade изделий от местных мастеров.',
            organizer: 'Craft Community',
            availableTickets: 2000,
            duration: '9 часов'
          },
          {
            id: 28,
            title: 'ANTIQUE FAIR',
            date: '2024-07-30T10:00',
            location: 'Астана, Antique Hall',
            address: 'ул. Бейбитшилик, 18',
            price: 700,
            type: 'fair',
            image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=250&fit=crop',
            description: 'Ярмарка антиквариата и винтажных вещей.',
            organizer: 'Antique Club',
            availableTickets: 800,
            duration: '7 часов'
          },
          {
            id: 29,
            title: 'FARMERS MARKET',
            date: '2024-08-20T08:00',
            location: 'Алматы, Green Bazaar',
            address: 'ул. Зенкова, 25',
            price: 0,
            type: 'fair',
            image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=250&fit=crop',
            description: 'Фермерский рынок с органическими продуктами.',
            organizer: 'Farmers Union',
            availableTickets: 3000,
            duration: '6 часов'
          },
          {
            id: 30,
            title: 'CHRISTMAS BAZAAR',
            date: '2024-12-15T12:00',
            location: 'Астана, City Square',
            address: 'Площадь Независимости',
            price: 0,
            type: 'fair',
            image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=250&fit=crop',
            description: 'Рождественская ярмарка с подарками и угощениями.',
            organizer: 'City Events',
            availableTickets: 10000,
            duration: '8 часов'
          }
        ])
      }, 800)
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
      // State
      events: [],
      loading: false,
      error: null,
      searchTerm: '',
      filterType: 'all',

      // Actions
      setSearchTerm: (searchTerm) => set({ searchTerm }),
      setFilterType: (filterType) => set({ filterType }),

      // Async Actions (работа с API)
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

      //Computed values
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