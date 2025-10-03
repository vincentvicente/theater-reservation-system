package com.theater.service;

import model.*;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

/**
 * Service layer for Theater operations
 */
@Service
public class TheaterService {
    
    private Theater theater;
    private ReservationsService reservationsService;
    
    public TheaterService() {
        initializeTheater();
    }
    
    /**
     * Initialize the theater with default configuration
     */
    private void initializeTheater() {
        String theaterName = "Roxy";
        int numRows = 15;
        int seatsPerRow = 10;
        List<Integer> accessibleRows = Arrays.asList(1, 5, 10);
        
        this.theater = new Theater(theaterName, numRows, seatsPerRow, accessibleRows);
        this.reservationsService = new ReservationsService();
    }
    
    /**
     * Get the theater instance
     */
    public Theater getTheater() {
        return theater;
    }
    
    /**
     * Reserve seats in the theater
     */
    public boolean reserveSeats(int numSeats, String personName, boolean needsAccessible) {
        return reservationsService.reserveSeats(theater, numSeats, personName, needsAccessible);
    }
    
    /**
     * Get current seating layout
     */
    public void showSeating() {
        reservationsService.showSeating(theater);
    }
}
