package model;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class RowTest {
  private Row testRow;
  private int expectedRowNumber;
  private int expectedNumberOfSeats;
  private boolean expectedWheelchairAccessible;

  @BeforeEach
  void setUp() {
    expectedRowNumber = 1;
    expectedNumberOfSeats = 5;
    expectedWheelchairAccessible = false;
    testRow = new Row(expectedRowNumber, expectedNumberOfSeats, expectedWheelchairAccessible);
  }

  @Test
  void isWheelchairAccessible() {
    assertEquals(expectedWheelchairAccessible, testRow.isWheelchairAccessible());
  }

  @Test
  void hasEnoughConsecutiveSeats() {
    // Test with enough consecutive seats
    assertTrue(testRow.hasEnoughConsecutiveSeats(3));

    // Test with not enough consecutive seats
    testRow.clear();
    testRow.add(new Seat("A"));
    assertFalse(testRow.hasEnoughConsecutiveSeats(2));
  }

  @Test
  void reserveSeats() {
    // Test with enough consecutive seats
    testRow.reserveSeats(3, "Allen");
    assertEquals("Allen", testRow.get(0).getReservedFor());
    assertEquals("Allen", testRow.get(1).getReservedFor());
    assertEquals("Allen", testRow.get(2).getReservedFor());

    // Test with not enough consecutive seats
    testRow.clear();
    testRow.add(new Seat("A"));
    testRow.reserveSeats(2, "Allen");
    assertNull(testRow.get(0).getReservedFor());
  }
}