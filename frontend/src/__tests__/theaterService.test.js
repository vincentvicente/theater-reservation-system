import { theaterService } from '../services/theaterService';

// Mock fetch
global.fetch = jest.fn();

describe('TheaterService', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  describe('getTheater', () => {
    test('fetches theater data successfully', async () => {
      const mockTheater = {
        name: 'Test Theater',
        rows: [],
        centerRow: 7
      };

      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockTheater,
      });

      const result = await theaterService.getTheater();

      expect(fetch).toHaveBeenCalledWith('http://localhost:8080/api/theater');
      expect(result).toEqual(mockTheater);
    });

    test('handles fetch errors', async () => {
      fetch.mockRejectedValueOnce(new Error('Network error'));

      await expect(theaterService.getTheater()).rejects.toThrow('Failed to load theater data');
    });
  });

  describe('reserveSeats', () => {
    test('reserves seats successfully', async () => {
      const mockResponse = {
        success: true,
        message: 'Seats reserved successfully!',
        rowInfo: 'Check the seating layout for details'
      };

      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const reservationData = {
        numSeats: 3,
        personName: 'John Doe',
        needsAccessible: false
      };

      const result = await theaterService.reserveSeats(reservationData);

      expect(fetch).toHaveBeenCalledWith('http://localhost:8080/api/reserve', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reservationData),
      });
      expect(result).toEqual(mockResponse);
    });

    test('handles reservation failure', async () => {
      const mockResponse = {
        success: false,
        message: 'Sorry, we don\'t have that many seats together for you.',
        rowInfo: null
      };

      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const reservationData = {
        numSeats: 20,
        personName: 'Jane Smith',
        needsAccessible: true
      };

      const result = await theaterService.reserveSeats(reservationData);

      expect(result.success).toBe(false);
      expect(result.message).toContain('don\'t have that many seats');
    });

    test('handles network errors', async () => {
      fetch.mockRejectedValueOnce(new Error('Network error'));

      const reservationData = {
        numSeats: 2,
        personName: 'Bob Wilson',
        needsAccessible: false
      };

      await expect(theaterService.reserveSeats(reservationData)).rejects.toThrow('Failed to reserve seats');
    });
  });

  describe('getSeating', () => {
    test('fetches seating layout successfully', async () => {
      const mockSeating = [
        {
          rowNumber: 1,
          wheelchairAccessible: true,
          seats: [
            { name: 'A', reserved: false, reservedFor: null, wheelchairAccessible: true }
          ]
        }
      ];

      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockSeating,
      });

      const result = await theaterService.getSeating();

      expect(fetch).toHaveBeenCalledWith('http://localhost:8080/api/seating');
      expect(result).toEqual(mockSeating);
    });

    test('handles fetch errors', async () => {
      fetch.mockRejectedValueOnce(new Error('Network error'));

      await expect(theaterService.getSeating()).rejects.toThrow('Failed to load seating data');
    });
  });
});

