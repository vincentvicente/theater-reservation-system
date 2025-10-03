package com.theater.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

/**
 * DTO for reservation request
 */
public class ReservationRequest {
    
    @NotNull(message = "Number of seats is required")
    @Min(value = 1, message = "Number of seats must be at least 1")
    private Integer numSeats;
    
    @NotBlank(message = "Person name is required")
    private String personName;
    
    @NotNull(message = "Accessibility requirement must be specified")
    private Boolean needsAccessible;
    
    public ReservationRequest() {}
    
    public ReservationRequest(Integer numSeats, String personName, Boolean needsAccessible) {
        this.numSeats = numSeats;
        this.personName = personName;
        this.needsAccessible = needsAccessible;
    }
    
    // Getters and Setters
    public Integer getNumSeats() {
        return numSeats;
    }
    
    public void setNumSeats(Integer numSeats) {
        this.numSeats = numSeats;
    }
    
    public String getPersonName() {
        return personName;
    }
    
    public void setPersonName(String personName) {
        this.personName = personName;
    }
    
    public Boolean getNeedsAccessible() {
        return needsAccessible;
    }
    
    public void setNeedsAccessible(Boolean needsAccessible) {
        this.needsAccessible = needsAccessible;
    }
}

