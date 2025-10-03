package model;

import java.util.ArrayList;

/**
 * This class represents a row, offering methods to check is there are enough consecutive seats and reserve
 * these seats for current customer.
 * @author Shaohua Guo
 */
public class Row extends ArrayList<Seat> {
  private int rowNumber;
  private boolean wheelchairAccessible;

  /**
   * Constructor for row.
   * @param rowNumber The number of the row.
   * @param numberOfSeats The number of seats in the row.
   * @param wheelchairAccessible True if the row is wheelchair accessible, false otherwise.
   */
  public Row(int rowNumber, int numberOfSeats, boolean wheelchairAccessible) {
    this.rowNumber = rowNumber;
    this.wheelchairAccessible = wheelchairAccessible;

    for (int i = 0; i < numberOfSeats; i++) {
      this.add(new Seat(Character.toString((char) ('A' + i))));
    }
  }

  /**
   * Get the row number.
   * @return The row number.
   */
  public int getRowNumber() {
    return rowNumber;
  }

  /**
   * Check if the row is wheelchair accessible.
   * @return True if the row is wheelchair accessible, false otherwise.
   */
  public boolean isWheelchairAccessible() {
    return wheelchairAccessible;
  }

  /**
   * Check if there are enough consecutive seats to reserve for the given number.
   * @param numSeats The number of consecutive seats to check.
   * @return True if there are enough consecutive seats, false otherwise.
   */
  public boolean hasEnoughConsecutiveSeats(int numSeats) {
    int consecutiveSeats = 0;
    for (Seat seat : this) {
      if (!seat.isReserved()) {
        consecutiveSeats++;
        if (numSeats == consecutiveSeats) {
          return true;
        }
      } else {
        consecutiveSeats = 0;
      }
    }

    return false;
  }

  /**
   * Reserve the given number of consecutive seats for the given person.
   * @param numSeats The number of consecutive seats to reserve.
   * @param personName The name of the person reserving the seats.
   */
  public void reserveSeats(int numSeats, String personName) {
    int consecutiveSeats = 0;
    for (Seat seat : this) {
      if (!seat.isReserved()) {
        consecutiveSeats++;
        if (consecutiveSeats == numSeats) {
          for (int i = 0; i < numSeats; i++) {
            this.get(this.indexOf(seat) - i).reserve(personName);
          }
          break;
        }
      } else {
        consecutiveSeats = 0;
      }
    }
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    for (Seat seat : this) {
      if (seat.toString().equals("_")) {
        if (isWheelchairAccessible()) {
          sb.append("=").append(" ");
        } else {
          sb.append("_").append(" ");
        }
      } else {
        sb.append("X").append(" ");
      }
    }

    return sb.toString().trim();
  }
}
