package com.theater.controller;

import com.theater.dto.*;
import com.theater.model.*;
import com.theater.service.TheaterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;

/**
 * REST Controller for Theater Reservation System
 */
@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000") // Allow React frontend
public class TheaterController {
    
    @Autowired
    private TheaterService theaterService;
    
    /**
     * Get theater information and seating layout
     */
    @GetMapping("/theater")
    public ResponseEntity<TheaterDto> getTheater() {
        Theater theater = theaterService.getTheater();
        TheaterDto theaterDto = convertToTheaterDto(theater);
        return ResponseEntity.ok(theaterDto);
    }
    
    /**
     * Reserve seats
     */
    @PostMapping("/reserve")
    public ResponseEntity<ReservationResponse> reserveSeats(@Valid @RequestBody ReservationRequest request) {
        try {
            boolean success = theaterService.reserveSeats(
                request.getNumSeats(), 
                request.getPersonName(), 
                request.getNeedsAccessible()
            );
            
            if (success) {
                return ResponseEntity.ok(new ReservationResponse(
                    true, 
                    "Seats reserved successfully!", 
                    "Check the seating layout for details"
                ));
            } else {
                return ResponseEntity.ok(new ReservationResponse(
                    false, 
                    "Sorry, we don't have that many seats together for you.", 
                    null
                ));
            }
        } catch (Exception e) {
            return ResponseEntity.ok(new ReservationResponse(
                false, 
                "Error processing reservation: " + e.getMessage(), 
                null
            ));
        }
    }
    
    /**
     * Get current seating layout
     */
    @GetMapping("/seating")
    public ResponseEntity<List<RowDto>> getSeating() {
        Theater theater = theaterService.getTheater();
        List<RowDto> rows = theater.getRows().stream()
            .map(this::convertToRowDto)
            .collect(Collectors.toList());
        return ResponseEntity.ok(rows);
    }
    
    /**
     * Convert Theater to TheaterDto
     */
    private TheaterDto convertToTheaterDto(Theater theater) {
        List<RowDto> rowDtos = theater.getRows().stream()
            .map(this::convertToRowDto)
            .collect(Collectors.toList());
        
        return new TheaterDto(theater.getName(), rowDtos, theater.getCenterRow());
    }
    
    /**
     * Convert Row to RowDto
     */
    private RowDto convertToRowDto(Row row) {
        List<SeatDto> seatDtos = row.stream()
            .map(seat -> new SeatDto(
                seat.getName(),
                seat.isReserved(),
                seat.getReservedFor(),
                row.isWheelchairAccessible()
            ))
            .collect(Collectors.toList());
        
        return new RowDto(row.getRowNumber(), row.isWheelchairAccessible(), seatDtos);
    }
}
