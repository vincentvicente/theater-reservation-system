package com.theater.dto;

import java.util.List;

/**
 * DTO for row information
 */
public class RowDto {
    
    private int rowNumber;
    private boolean wheelchairAccessible;
    private List<SeatDto> seats;
    
    public RowDto() {}
    
    public RowDto(int rowNumber, boolean wheelchairAccessible, List<SeatDto> seats) {
        this.rowNumber = rowNumber;
        this.wheelchairAccessible = wheelchairAccessible;
        this.seats = seats;
    }
    
    // Getters and Setters
    public int getRowNumber() {
        return rowNumber;
    }
    
    public void setRowNumber(int rowNumber) {
        this.rowNumber = rowNumber;
    }
    
    public boolean isWheelchairAccessible() {
        return wheelchairAccessible;
    }
    
    public void setWheelchairAccessible(boolean wheelchairAccessible) {
        this.wheelchairAccessible = wheelchairAccessible;
    }
    
    public List<SeatDto> getSeats() {
        return seats;
    }
    
    public void setSeats(List<SeatDto> seats) {
        this.seats = seats;
    }
}

