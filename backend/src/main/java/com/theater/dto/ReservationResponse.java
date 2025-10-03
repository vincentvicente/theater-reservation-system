package com.theater.dto;

/**
 * DTO for reservation response
 */
public class ReservationResponse {
    
    private boolean success;
    private String message;
    private String rowInfo;
    
    public ReservationResponse() {}
    
    public ReservationResponse(boolean success, String message, String rowInfo) {
        this.success = success;
        this.message = message;
        this.rowInfo = rowInfo;
    }
    
    // Getters and Setters
    public boolean isSuccess() {
        return success;
    }
    
    public void setSuccess(boolean success) {
        this.success = success;
    }
    
    public String getMessage() {
        return message;
    }
    
    public void setMessage(String message) {
        this.message = message;
    }
    
    public String getRowInfo() {
        return rowInfo;
    }
    
    public void setRowInfo(String rowInfo) {
        this.rowInfo = rowInfo;
    }
}

