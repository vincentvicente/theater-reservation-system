package model;

import static org.junit.jupiter.api.Assertions.*;

import java.util.List;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class ReservationsServiceTest {

    private ReservationsService reservationsService;
    private Theater testTheater;
    private String testPersonName;
    private int numRows;
    private int numSeatsPerRow;
    private List<Integer> accessibleRows;

    @BeforeEach
    void setUp() {
        reservationsService = new ReservationsService();
        testPersonName = "John Doe";
        numRows = 10;
        numSeatsPerRow = 5;
        accessibleRows = List.of(2, 4); // Rows 2 and 4 are wheelchair accessible
        testTheater = new Theater("Test Theater", numRows, numSeatsPerRow, accessibleRows);
    }

    @Test
    void reserveSeats_withEnoughSeats_shouldSucceed() {
        boolean result = reservationsService.reserveSeats(testTheater, 3, testPersonName, false);
        assertTrue(result, "Reservation should succeed when there are enough consecutive seats.");
    }

    @Test
    void reserveSeats_withNotEnoughSeats_shouldFail() {
        reservationsService.reserveSeats(testTheater, numSeatsPerRow + 1, "Another Person", false);
        boolean result = reservationsService.reserveSeats(testTheater, numSeatsPerRow + 1, testPersonName, false);
        assertFalse(result, "Reservation should fail when there are not enough consecutive seats.");
    }

    @Test
    void reserveSeats_withWheelchairAccessibility_shouldSucceed() {
        boolean result = reservationsService.reserveSeats(testTheater, 3, testPersonName, true);
        assertTrue(result, "Reservation should succeed when there are enough wheelchair accessible seats.");
    }

    @Test
    void reserveSeats_withWheelchairAccessibility_shouldFail() {
        // Reserve all accessible seats in accessible rows
        for (int i = 0; i < numSeatsPerRow; i++) {
            reservationsService.reserveSeats(testTheater, 1, "Person " + i, true);
        }
        for (int i = 0; i < numSeatsPerRow; i++) {
            reservationsService.reserveSeats(testTheater, 1, "Person " + i, true);
        }

        boolean result = reservationsService.reserveSeats(testTheater, 3, testPersonName, true);
        assertFalse(result, "Reservation should fail when there are not enough wheelchair accessible seats.");
    }

    @Test
    void showSeating() {
        reservationsService.reserveSeats(testTheater, 3, testPersonName, false);
        assertDoesNotThrow(() -> reservationsService.showSeating(testTheater), "Showing seating arrangement should not throw an exception.");
    }
}
