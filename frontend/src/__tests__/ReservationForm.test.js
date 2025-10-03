import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ReservationForm from '../components/ReservationForm';

describe('ReservationForm Component', () => {
  const mockOnSubmit = jest.fn();

  beforeEach(() => {
    mockOnSubmit.mockClear();
  });

  test('renders form with all required fields', () => {
    render(<ReservationForm onSubmit={mockOnSubmit} />);
    
    expect(screen.getByLabelText('Number of Seats')).toBeInTheDocument();
    expect(screen.getByLabelText('Your Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Wheelchair Accessible Seats')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /reserve seats/i })).toBeInTheDocument();
  });

  test('validates required fields', async () => {
    render(<ReservationForm onSubmit={mockOnSubmit} />);
    
    const submitButton = screen.getByRole('button', { name: /reserve seats/i });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText('Please enter number of seats')).toBeInTheDocument();
      expect(screen.getByText('Please enter your name')).toBeInTheDocument();
      expect(screen.getByText('Please select accessibility requirement')).toBeInTheDocument();
    });
  });

  test('validates number of seats range', async () => {
    render(<ReservationForm onSubmit={mockOnSubmit} />);
    
    const numSeatsInput = screen.getByLabelText('Number of Seats');
    fireEvent.change(numSeatsInput, { target: { value: '15' } });
    fireEvent.blur(numSeatsInput);
    
    await waitFor(() => {
      expect(screen.getByText('Number must be between 1 and 10')).toBeInTheDocument();
    });
  });

  test('validates name minimum length', async () => {
    render(<ReservationForm onSubmit={mockOnSubmit} />);
    
    const nameInput = screen.getByLabelText('Your Name');
    fireEvent.change(nameInput, { target: { value: 'A' } });
    fireEvent.blur(nameInput);
    
    await waitFor(() => {
      expect(screen.getByText('Name must be at least 2 characters')).toBeInTheDocument();
    });
  });

  test('submits form with valid data', async () => {
    render(<ReservationForm onSubmit={mockOnSubmit} />);
    
    // Fill in the form
    fireEvent.change(screen.getByLabelText('Number of Seats'), { 
      target: { value: '3' } 
    });
    fireEvent.change(screen.getByLabelText('Your Name'), { 
      target: { value: 'John Doe' } 
    });
    fireEvent.change(screen.getByLabelText('Wheelchair Accessible Seats'), { 
      target: { value: 'no' } 
    });
    
    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /reserve seats/i }));
    
    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        numSeats: 3,
        personName: 'John Doe',
        needsAccessible: false
      });
    });
  });

  test('shows loading state when submitting', () => {
    render(<ReservationForm onSubmit={mockOnSubmit} loading={true} />);
    
    const submitButton = screen.getByRole('button', { name: /reserve seats/i });
    expect(submitButton).toBeDisabled();
  });

  test('resets form after successful submission', async () => {
    render(<ReservationForm onSubmit={mockOnSubmit} />);
    
    // Fill and submit form
    fireEvent.change(screen.getByLabelText('Number of Seats'), { 
      target: { value: '2' } 
    });
    fireEvent.change(screen.getByLabelText('Your Name'), { 
      target: { value: 'Jane Smith' } 
    });
    fireEvent.change(screen.getByLabelText('Wheelchair Accessible Seats'), { 
      target: { value: 'yes' } 
    });
    
    fireEvent.click(screen.getByRole('button', { name: /reserve seats/i }));
    
    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        numSeats: 2,
        personName: 'Jane Smith',
        needsAccessible: true
      });
    });
    
    // Check that form is reset
    expect(screen.getByLabelText('Number of Seats')).toHaveValue(null);
    expect(screen.getByLabelText('Your Name')).toHaveValue('');
  });
});

