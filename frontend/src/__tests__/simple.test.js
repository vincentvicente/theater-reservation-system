import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

// Simple test to verify testing setup works
describe('Basic Test Setup', () => {
  test('renders hello world', () => {
    render(<div>Hello World</div>);
    expect(screen.getByText('Hello World')).toBeInTheDocument();
  });
});

// Test the theater service without complex components
describe('Theater Service', () => {
  test('has correct API endpoints', () => {
    const { theaterService } = require('../services/theaterService');
    expect(theaterService).toBeDefined();
    expect(typeof theaterService.getTheater).toBe('function');
    expect(typeof theaterService.reserveSeats).toBe('function');
    expect(typeof theaterService.getSeating).toBe('function');
  });
});

