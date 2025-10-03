import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const theaterService = {
  /**
   * Get theater information and seating layout
   */
  async getTheater() {
    try {
      const response = await apiClient.get('/theater');
      return response.data;
    } catch (error) {
      console.error('Error fetching theater data:', error);
      throw new Error('Failed to load theater data');
    }
  },

  /**
   * Reserve seats
   */
  async reserveSeats(reservationData) {
    try {
      const response = await apiClient.post('/reserve', reservationData);
      return response.data;
    } catch (error) {
      console.error('Error reserving seats:', error);
      throw new Error('Failed to reserve seats');
    }
  },

  /**
   * Get current seating layout
   */
  async getSeating() {
    try {
      const response = await apiClient.get('/seating');
      return response.data;
    } catch (error) {
      console.error('Error fetching seating data:', error);
      throw new Error('Failed to load seating data');
    }
  }
};

export default theaterService;

