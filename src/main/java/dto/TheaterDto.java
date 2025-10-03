package com.theater.dto;

import java.util.List;

/**
 * DTO for theater information
 */
public class TheaterDto {
    
    private String name;
    private List<RowDto> rows;
    private int centerRow;
    
    public TheaterDto() {}
    
    public TheaterDto(String name, List<RowDto> rows, int centerRow) {
        this.name = name;
        this.rows = rows;
        this.centerRow = centerRow;
    }
    
    // Getters and Setters
    public String getName() {
        return name;
    }
    
    public void setName(String name) {
        this.name = name;
    }
    
    public List<RowDto> getRows() {
        return rows;
    }
    
    public void setRows(List<RowDto> rows) {
        this.rows = rows;
    }
    
    public int getCenterRow() {
        return centerRow;
    }
    
    public void setCenterRow(int centerRow) {
        this.centerRow = centerRow;
    }
}

