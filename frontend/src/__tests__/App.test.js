import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App';
import { theaterService } from '../services/theaterService';

// Mock the theater service
jest.mock('../services/theaterService');

describe('App Component', () => {
  const mockTheater = {
    name: 'Test Theater',
    rows: [
      {
        rowNumber: 1,
        wheelchairAccessible: true,
        seats: [
          { name: 'A', reserved: false, reservedFor: null, wheelchairAccessible: true },
          { name: 'B', reserved: false, reservedFor: null, wheelchairAccessible: true }
        ]
      }
    ],
    centerRow: 7
  };

  beforeEach(() => {
    theaterService.getTheater.mockResolvedValue(mockTheater);
    theaterService.reserveSeats.mockResolvedValue({
      success: true,
      message: 'Seats reserved successfully!'
    });
  });

  test('renders theater reservation system', () => {
    render(<App />);
    expect(screen.getByText('Theater Reservation System')).toBeInTheDocument();
  });

  test('loads theater data on mount', async () => {
    render(<App />);
    
    await waitFor(() => {
      expect(theaterService.getTheater).toHaveBeenCalled();
    });
  });

  test('displays theater seating layout', async () => {
    render(<App />);
    
    await waitFor(() => {
      expect(screen.getByText('Theater Seating Layout')).toBeInTheDocument();
    });
  });

  test('displays reservation form', async () => {
    render(<App />);
    
    await waitFor(() => {
      expect(screen.getByText('Make a Reservation')).toBeInTheDocument();
    });
  });

  test('handles seat selection', async () => {
    render(<App />);
    
    await waitFor(() => {
      const seatButtons = screen.getAllByRole('button');
      const availableSeat = seatButtons.find(button => !button.disabled);
      
      if (availableSeat) {
        fireEvent.click(availableSeat);
        expect(availableSeat).toHaveClass('selected');
      }
    });
  });

  test('handles reservation submission', async () => {
    render(<App />);
    
    await waitFor(() => {
      // Fill reservation form
      fireEvent.change(screen.getByLabelText('Number of Seats'), { 
        target: { value: '2' } 
      });
      fireEvent.change(screen.getByLabelText('Your Name'), { 
        target: { value: 'John Doe' } 
      });
      fireEvent.change(screen.getByLabelText('Wheelchair Accessible Seats'), { 
        target: { value: 'no' } 
      });
      
      // Submit form
      fireEvent.click(screen.getByRole('button', { name: /reserve seats/i }));
    });
    
    await waitFor(() => {
      expect(theaterService.reserveSeats).toHaveBeenCalledWith({
        numSeats: 2,
        personName: 'John Doe',
        needsAccessible: false
      });
    });
  });

  test('shows loading state during reservation', async () => {
    theaterService.reserveSeats.mockImplementation(() => 
      new Promise(resolve => setTimeout(() => resolve({ success: true }), 100))
    );
    
    render(<App />);
    
    await waitFor(() => {
      fireEvent.change(screen.getByLabelText('Number of Seats'), { 
        target: { value: '1' } 
      });
      fireEvent.change(screen.getByLabelText('Your Name'), { 
        target: { value: 'Test User' } 
      });
      fireEvent.change(screen.getByLabelText('Wheelchair Accessible Seats'), { 
        target: { value: 'no' } 
      });
      
      fireEvent.click(screen.getByRole('button', { name: /reserve seats/i }));
    });
    
    // Check that loading state is shown
    expect(screen.getByRole('button', { name: /reserve seats/i })).toBeDisabled();
  });

  test('handles reservation errors', async () => {
    theaterService.reserveSeats.mockResolvedValue({
      success: false,
      message: 'Sorry, we don\'t have that many seats together for you.'
    });
    
    render(<App />);
    
    await waitFor(() => {
      fireEvent.change(screen.getByLabelText('Number of Seats'), { 
        target: { value: '20' } 
      });
      fireEvent.change(screen.getByLabelText('Your Name'), { 
        target: { value: 'Test User' } 
      });
      fireEvent.change(screen.getByLabelText('Wheelchair Accessible Seats'), { 
        target: { value: 'no' } 
      });
      
      fireEvent.click(screen.getByRole('button', { name: /reserve seats/i }));
    });
    
    await waitFor(() => {
      expect(screen.getByText(/don't have that many seats/)).toBeInTheDocument();
    });
  });
});

