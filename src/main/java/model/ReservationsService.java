package model;

import java.util.List;

/**
 * @author Yitian Xu
 * This class provides services for managing reservations in a theater.
 */
public class ReservationsService {

    /**
     * Attempts to reserve a specified number of seats in the theater,
     * with an option to prioritize wheelchair accessibility.
     *
     * @param theater The theater where the reservation is being made.
     * @param numSeats The number of seats to reserve.
     * @param personName The name of the person making the reservation.
     * @param needsAccessible A boolean indicating whether the reserved seats should be wheelchair accessible.
     * @return True if the seats were successfully reserved; false otherwise.
     */
    public boolean reserveSeats(Theater theater, int numSeats, String personName, boolean needsAccessible) {
        List<Row> rows = theater.getRows();
        int centerRow = theater.getCenterRow();

        Row bestRow = null;
        int bestRowDistance = Integer.MAX_VALUE;

        // Determine the best row for reservation
        for (int i = 0; i < rows.size(); i++) {
            Row row = rows.get(i);
            int distanceFromCenter = Math.abs(i - centerRow);

            if (row.hasEnoughConsecutiveSeats(numSeats)) {
                if (row.isWheelchairAccessible() == needsAccessible || !needsAccessible) {
                    if (distanceFromCenter < bestRowDistance) {
                        bestRow = row;
                        bestRowDistance = distanceFromCenter;
                    }
                }
            }
        }

        if (bestRow != null) {
            bestRow.reserveSeats(numSeats, personName);
            System.out.println("I've reserved " + numSeats + " seats for you at " + theater.getName() + " in row " + bestRow.get(0).toString() + ", " + personName + ".");
            return true;
        } else {
            System.out.println("Sorry, we don’t have that many seats together for you.");
            return false;
        }
    }

    /**
     * Displays the current seating arrangement of the theater.
     *
     * @param theater The theater whose seating arrangement is to be displayed.
     */
    public void showSeating(Theater theater) {
        for (Row row : theater.getRows()) {
            System.out.println(row.toString());
        }
    }
}
