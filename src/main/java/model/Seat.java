package model;

import java.util.Objects;

/**
 * This class represents a seat.
 * @author Shaohua Guo
 */
public class Seat {
  private String name;
  private String reservedFor;

  /**
   * Constructor for seat.
   * @param name The name of the seat.
   */
  public Seat(String name) {
    this.name = name;
  }

  /**
   * Getter for the name of the seat.
   * @return The name of the seat
   */
  public String getName() {
    return name;
  }

  /**
   * Getter for the person who reserved the seat.
   * @return The person who reserved the seat, or null if it's not reserved.
   */
  public String getReservedFor() {
    return reservedFor;
  }

  /**
   * Check if the seat is reserved.
   * @return True if the seat is reserved, false otherwise.
   */
  public boolean isReserved(){
    return this.reservedFor != null;
  }

  /**
   * Reserve the seat for a person.
   * @param personName The name of the person reserving the seat.
   */
  public void reserve(String personName) {
    this.reservedFor = personName;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    Seat seat = (Seat) o;
    return Objects.equals(name, seat.name) && Objects.equals(reservedFor,
        seat.reservedFor);
  }

  @Override
  public int hashCode() {
    return Objects.hash(name, reservedFor);
  }

  @Override
  public String toString() {
    return isReserved()? "X" : "_";
  }
}
