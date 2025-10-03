import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TheaterLayout from '../components/TheaterLayout';

// Mock theater data
const mockTheater = {
  name: "Test Theater",
  rows: [
    {
      rowNumber: 1,
      wheelchairAccessible: true,
      seats: [
        { name: "A", reserved: false, reservedFor: null, wheelchairAccessible: true },
        { name: "B", reserved: false, reservedFor: null, wheelchairAccessible: true },
        { name: "C", reserved: true, reservedFor: "John", wheelchairAccessible: true }
      ]
    },
    {
      rowNumber: 2,
      wheelchairAccessible: false,
      seats: [
        { name: "A", reserved: false, reservedFor: null, wheelchairAccessible: false },
        { name: "B", reserved: false, reservedFor: null, wheelchairAccessible: false },
        { name: "C", reserved: false, reservedFor: null, wheelchairAccessible: false }
      ]
    }
  ]
};

describe('TheaterLayout Component', () => {
  test('renders theater layout with stage', () => {
    render(<TheaterLayout theater={mockTheater} />);
    expect(screen.getByText('STAGE')).toBeInTheDocument();
  });

  test('renders all rows and seats', () => {
    render(<TheaterLayout theater={mockTheater} />);
    
    // Check row numbers
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    
    // Check seat buttons
    const seatButtons = screen.getAllByRole('button');
    expect(seatButtons).toHaveLength(6); // 3 seats per row * 2 rows
  });

  test('shows reserved seats as disabled', () => {
    render(<TheaterLayout theater={mockTheater} />);
    
    const seatButtons = screen.getAllByRole('button');
    const reservedSeat = seatButtons.find(button => button.textContent.includes('X'));
    expect(reservedSeat).toBeDisabled();
  });

  test('handles seat click events', () => {
    const mockOnSeatClick = jest.fn();
    render(<TheaterLayout theater={mockTheater} onSeatClick={mockOnSeatClick} />);
    
    const availableSeats = screen.getAllByRole('button').filter(button => !button.disabled);
    fireEvent.click(availableSeats[0]);
    
    expect(mockOnSeatClick).toHaveBeenCalledWith(
      mockTheater.rows[0],
      mockTheater.rows[0].seats[0]
    );
  });

  test('shows selected seats with correct styling', () => {
    const selectedSeats = [
      { key: '1-A', row: 1, seat: 'A', wheelchairAccessible: true }
    ];
    
    render(
      <TheaterLayout 
        theater={mockTheater} 
        selectedSeats={selectedSeats}
      />
    );
    
    const seatButtons = screen.getAllByRole('button');
    const selectedSeat = seatButtons.find(button => 
      button.className.includes('selected')
    );
    expect(selectedSeat).toBeInTheDocument();
  });

  test('shows legend with all seat types', () => {
    render(<TheaterLayout theater={mockTheater} />);
    
    expect(screen.getByText('Available')).toBeInTheDocument();
    expect(screen.getByText('Wheelchair Accessible')).toBeInTheDocument();
    expect(screen.getByText('Selected')).toBeInTheDocument();
    expect(screen.getByText('Reserved')).toBeInTheDocument();
  });

  test('shows loading message when theater is null', () => {
    render(<TheaterLayout theater={null} />);
    expect(screen.getByText('Loading theater layout...')).toBeInTheDocument();
  });

  test('displays wheelchair accessibility indicators', () => {
    render(<TheaterLayout theater={mockTheater} />);
    
    // Check for accessibility indicators (UserOutlined icons)
    const accessibilityIcons = screen.getAllByTestId('user-outlined');
    expect(accessibilityIcons.length).toBeGreaterThan(0);
  });
});

