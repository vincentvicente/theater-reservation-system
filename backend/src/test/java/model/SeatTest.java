package model;

import static org.junit.jupiter.api.Assertions.*;
import com.theater.model.*;

import java.util.Objects;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class SeatTest {
  private Seat testSeat;
  private String expectedName;
  private String expectedReservedFor;

  @BeforeEach
  void setUp() {
    expectedName = "A";
    expectedReservedFor = "Allen";
    testSeat = new Seat(expectedName);
  }

  @Test
  void getName() {
    assertEquals(expectedName, testSeat.getName());
  }

  @Test
  void getReservedFor() {
    assertNull(testSeat.getReservedFor());
  }

  @Test
  void isReserved() {
    assertFalse(testSeat.isReserved());
    testSeat.reserve(expectedReservedFor);
    assertTrue(testSeat.isReserved());
  }

  @Test
  void reserve() {
    testSeat.reserve(expectedReservedFor);
    assertEquals(expectedReservedFor, testSeat.getReservedFor());
  }

  @Test
  void testEquals() {
    assertFalse(testSeat.equals(null));
    assertTrue(testSeat.equals(testSeat));
    assertFalse(testSeat.equals("123"));
    Seat otherSeat = new Seat("B");
    assertFalse(testSeat.equals(otherSeat));
    otherSeat.reserve(expectedReservedFor);
    assertFalse(testSeat.equals(otherSeat));
  }

  @Test
  void testHashCode() {
    testSeat.reserve(expectedReservedFor);
    int expectedHash = Objects.hash(expectedName, expectedReservedFor);
    assertEquals(expectedHash, testSeat.hashCode());
  }

  @Test
  void testToString() {
    assertTrue(testSeat.toString().equals("_"));
    testSeat.reserve(expectedReservedFor);
    assertEquals("X", testSeat.toString());
  }
}