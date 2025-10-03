package com.theater.dto;

/**
 * DTO for seat information
 */
public class SeatDto {
    
    private String name;
    private boolean reserved;
    private String reservedFor;
    private boolean wheelchairAccessible;
    
    public SeatDto() {}
    
    public SeatDto(String name, boolean reserved, String reservedFor, boolean wheelchairAccessible) {
        this.name = name;
        this.reserved = reserved;
        this.reservedFor = reservedFor;
        this.wheelchairAccessible = wheelchairAccessible;
    }
    
    // Getters and Setters
    public String getName() {
        return name;
    }
    
    public void setName(String name) {
        this.name = name;
    }
    
    public boolean isReserved() {
        return reserved;
    }
    
    public void setReserved(boolean reserved) {
        this.reserved = reserved;
    }
    
    public String getReservedFor() {
        return reservedFor;
    }
    
    public void setReservedFor(String reservedFor) {
        this.reservedFor = reservedFor;
    }
    
    public boolean isWheelchairAccessible() {
        return wheelchairAccessible;
    }
    
    public void setWheelchairAccessible(boolean wheelchairAccessible) {
        this.wheelchairAccessible = wheelchairAccessible;
    }
}

