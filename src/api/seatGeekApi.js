const SEATGEEK_CLIENT_ID = 'NTM2OTI3MTB8MTc2MDUyNTM4Mi40NTQ2OTE0';

export const seatGeekApi = {
  // Тестовый метод для проверки API
  testApi: async () => {
    try {
      console.log('Testing SeatGeek API connection...');
      const response = await fetch(
        `https://api.seatgeek.com/2/events?client_id=${SEATGEEK_CLIENT_ID}&per_page=5`
      );
      
      console.log('API Response status:', response.status);
      
      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('API Response data:', data);
      console.log(`API Test Successful! Found ${data.events?.length || 0} events`);
      
      return data;
    } catch (error) {
      console.error('API Test Failed:', error);
      throw error;
    }
  },

  // Получить события
  fetchEvents: async (page = 1, perPage = 30) => {
    try {
      console.log('Fetching events from SeatGeek API...');
      
      const response = await fetch(
        `https://api.seatgeek.com/2/events?page=${page}&per_page=${perPage}&client_id=${SEATGEEK_CLIENT_ID}&sort=score.desc`
      );
      
      if (!response.ok) {
        throw new Error(`SeatGeek API Error: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log('Raw API data:', data);
      
      if (!data.events || data.events.length === 0) {
        throw new Error('No events found in API response');
      }
      
      console.log(`Successfully fetched ${data.events.length} events`);
      
      // Преобразуем данные API в наш формат
      const formattedEvents = data.events.map((event, index) => {
        const basePrice = event.stats?.average_price || 25;
        const priceInTenge = Math.round(basePrice * 500);
        
        return {
          id: event.id || Date.now() + index,
          title: event.title || 'Untitled Event',
          date: event.datetime_local || new Date().toISOString(),
          location: event.venue?.name || 'Venue TBA',
          address: event.venue ? 
            `${event.venue.address || ''}, ${event.venue.city || ''}, ${event.venue.country || ''}`.trim() : 
            'Address to be announced',
          price: priceInTenge,
          type: mapEventType(event.type),
          image: getEventImage(event),
          description: event.description || generateDescription(event),
          organizer: event.performers?.[0]?.name || event.venue?.name || 'Event Organizer',
          availableTickets: event.stats?.listing_count || Math.floor(Math.random() * 200) + 50,
          duration: getEventDuration(event.type)
        };
      });
      
      console.log('Formatted events:', formattedEvents);
      return formattedEvents;
      
    } catch (error) {
      console.error('SeatGeek API Error:', error);
      throw error;
    }
  },

  // Поиск событий
  searchEvents: async (query) => {
    try {
      console.log(`🔍 Searching events for: ${query}`);
      
      const response = await fetch(
        `https://api.seatgeek.com/2/events?q=${encodeURIComponent(query)}&client_id=${SEATGEEK_CLIENT_ID}&per_page=20`
      );
      
      if (!response.ok) {
        throw new Error(`Search API Error: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (!data.events) {
        return [];
      }
      
      return data.events.map(event => ({
        id: event.id,
        title: event.title,
        date: event.datetime_local,
        location: event.venue?.name || 'Venue TBA',
        address: event.venue ? 
          `${event.venue.address || ''}, ${event.venue.city || ''}`.trim() : 
          'Address TBA',
        price: Math.round((event.stats?.average_price || 30) * 500),
        type: mapEventType(event.type),
        image: getEventImage(event),
        description: event.description || `Join us for ${event.title}`,
        organizer: event.performers?.[0]?.name || 'Organizer',
        availableTickets: event.stats?.listing_count || 100,
        duration: getEventDuration(event.type)
      }));
    } catch (error) {
      console.error(' Search API Error:', error);
      throw error;
    }
  },

  // Получить событие по ID
  getEventById: async (id) => {
    try {
      console.log(`Fetching event details for ID: ${id}`);
      
      const response = await fetch(
        `https://api.seatgeek.com/2/events/${id}?client_id=${SEATGEEK_CLIENT_ID}`
      );
      
      if (!response.ok) {
        throw new Error(`Event API Error: ${response.status}`);
      }
      
      const event = await response.json();
      
      return {
        id: event.id,
        title: event.title,
        date: event.datetime_local,
        location: event.venue?.name || 'Venue TBA',
        address: event.venue ? 
          `${event.venue.address || ''}, ${event.venue.city || ''}, ${event.venue.country || ''}`.trim() : 
          'Address to be announced',
        price: Math.round((event.stats?.average_price || 25) * 500),
        type: mapEventType(event.type),
        image: getEventImage(event),
        description: event.description || generateDescription(event),
        organizer: event.performers?.[0]?.name || event.venue?.name || 'Event Organizer',
        availableTickets: event.stats?.listing_count || Math.floor(Math.random() * 200) + 50,
        duration: getEventDuration(event.type)
      };
    } catch (error) {
      console.error('Event API Error:', error);
      throw error;
    }
  }
};

// Вспомогательные функции
const mapEventType = (seatGeekType) => {
  const typeMap = {
    'concert': 'concert',
    'conference': 'conference',
    'sports': 'sport', 
    'theater': 'theater',
    'comedy': 'theater',
    'festival': 'concert',
    'opera': 'theater',
    'broadway': 'theater',
    'ncaa_football': 'sport',
    'nba': 'sport',
    'mlb': 'sport',
    'nhl': 'sport',
    'music_festival': 'concert',
    'classical': 'concert',
    'rock': 'concert',
    'pop': 'concert',
    'jazz': 'concert'
  };
  return typeMap[seatGeekType] || 'concert';
};

const getEventImage = (event) => {
  // Пробуем получить изображение в порядке приоритета
  if (event.performers?.[0]?.image) {
    return event.performers[0].image;
  }
  if (event.venue?.image) {
    return event.venue.image;
  }
  
  // Fallback на placeholder с цветом по типу события
  const colors = {
    concert: '6366F1',
    conference: '10B981', 
    sport: 'EF4444',
    theater: '8B5CF6',
    exhibition: 'F59E0B',
    fair: '06B6D4'
  };
  const color = colors[mapEventType(event.type)] || '6B7280';
  return `https://via.placeholder.com/400x250/${color}/FFFFFF?text=${encodeURIComponent(event.title || 'Event')}`;
};

const generateDescription = (event) => {
  const venue = event.venue?.name || 'a great venue';
  const performer = event.performers?.[0]?.name;
  const city = event.venue?.city || '';
  const state = event.venue?.state || '';
  
  let description = `Don't miss ${event.title}`;
  
  if (performer) {
    description += ` featuring ${performer}`;
  }
  
  description += ` at ${venue}`;
  
  if (city) {
    description += ` in ${city}`;
    if (state) {
      description += `, ${state}`;
    }
  }
  
  description += '. An unforgettable experience awaits! Get your tickets now.';
  
  return description;
};

const getEventDuration = (type) => {
  const durations = {
    concert: '2-3 hours',
    conference: '6-8 hours', 
    sport: '2-3 hours',
    theater: '2-3 hours',
    exhibition: '4-6 hours',
    fair: '5-7 hours'
  };
  return durations[type] || '2-3 hours';
};