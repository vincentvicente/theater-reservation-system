package com.theater.model;

import java.util.Arrays;
import java.util.List;
import java.util.Scanner;

/**
 * This class serves as the entry point for the theater reservation system.
 * It initializes the theater and handles user interactions to manage seat reservations.
 *
 * @author Qiyuan Zhu
 */
public class Main {

  /**
   * The main method serves as the entry point for the application.
   * It sets up the theater and processes user commands to reserve seats,
   * display seating arrangements, or exit the program.
   *
   * @param args Command-line arguments.
   */
  public static void main(String[] args) {
    // Initialize theater configuration
    String theaterName = "Roxy";
    int numRows = 15;
    int seatsPerRow = 10;
    List<Integer> accessibleRows = Arrays.asList(1, 5, 10);  // Rows 1, 5, and 10 are wheelchair accessible

    // Create the theater instance
    Theater theater = new Theater(theaterName, numRows, seatsPerRow, accessibleRows);

    // Create the reservations service
    ReservationsService reservationsService = new ReservationsService();

    // Set up the scanner for user input
    Scanner scanner = new Scanner(System.in);
    boolean exit = false;
    while (!exit) {
      System.out.println("Welcome to " + theater.getName() + "! What would you like to do? (reserve, show, done)");
      String action = scanner.nextLine().trim().toLowerCase();

      switch (action) {
        case "reserve":
          // Handle seat reservation
          System.out.print("Enter number of seats to reserve: ");
          int numSeats = Integer.parseInt(scanner.nextLine());
          System.out.print("What’s your name? ");
          String personName = scanner.nextLine();
          System.out.print("Do you need wheelchair accessible seats? (yes/no): ");
          boolean needsAccessible = scanner.nextLine().equalsIgnoreCase("yes");

          if (reservationsService.reserveSeats(theater, numSeats, personName, needsAccessible)) {
            System.out.println("I’ve reserved " + numSeats + " seats for you at " + theater.getName() + ", " + personName + ".");
          } else {
            System.out.println("Sorry, we don’t have that many seats together for you.");
          }
          break;
        case "show":
          // Display the current seating arrangement
          reservationsService.showSeating(theater);
          break;
        case "done":
          // Exit the program
          exit = true;
          System.out.println("Have a nice day!");
          break;
        default:
          System.out.println("Invalid command. Please try again.");
          break;
      }
    }
    scanner.close();
  }
}
