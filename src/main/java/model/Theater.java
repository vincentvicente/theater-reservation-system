package model;

import java.util.ArrayList;
import java.util.List;

/**
 * This class represents a theater.
 * @author Shaohua Guo
 */
public class Theater {
  private String name;
  private List<Row> rows;
  private int centerRow;

  /**
   * Constructor for theater.
   * @param name The name of the theater.
   * @param numRows The number of rows in the theater.
   * @param seatsPerRow The number of seats in each row.
   */
  public Theater(String name, int numRows, int seatsPerRow, List<Integer> accessibleRows) {
    this.name = name;
    this.rows = new ArrayList<>();

    if (accessibleRows == null || accessibleRows.size() == 0) {
      throw new IllegalArgumentException("At least one row must be wheelchair accessible.");
    }

    for (int i = 1; i <= numRows; i++) {
      boolean isAccessible = accessibleRows.contains(i);
      rows.add(new Row(i, seatsPerRow, isAccessible));
    }

    this.centerRow = numRows / 2;
  }

  /**
   * Get the name of the theater.
   * @return The name of the theater.
   */
  public String getName() {
    return name;
  }

  /**
   * Get the list of rows in the theater.
   * @return The list of rows in the theater.
   */
  public List<Row> getRows() {
    return rows;
  }

  /**
   * Get the central row number of the theater
   * @return The row number of the center row.
   */
  public int getCenterRow() {
    return centerRow;
  }
}
