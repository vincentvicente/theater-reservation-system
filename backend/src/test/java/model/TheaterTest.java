package model;

import static org.junit.jupiter.api.Assertions.*;

import com.theater.model.*;
import java.util.List;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class TheaterTest {
  private Theater testTheater, testTheater2;
  private String expectedName;
  private int expectedNumRows;
  private List<Integer> expectedAccessibleRows;
  private int expectedNumSeatsPerRow;

  @BeforeEach
  void setUp() {
    expectedName = "Test Theater";
    expectedNumRows = 15;
    expectedAccessibleRows = List.of(1, 3);
    expectedNumSeatsPerRow = 10;
    testTheater = new Theater(expectedName, expectedNumRows, expectedNumSeatsPerRow, expectedAccessibleRows);
    assertThrows(IllegalArgumentException.class, () -> new Theater(expectedName, expectedNumRows, expectedNumSeatsPerRow, null));
  }

  @Test
  void getName() {
    assertEquals(expectedName, testTheater.getName());
  }

  @Test
  void getRows() {
    assertEquals(expectedNumRows, testTheater.getRows().size());
  }

  @Test
  void getCenterRow() {
    assertEquals(expectedNumRows / 2, testTheater.getCenterRow());
  }
}