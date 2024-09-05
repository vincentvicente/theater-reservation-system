# Theater Reservation System

## Overview
This project implements a movie theater reservation system that allows users to reserve the best available seats through the command line. The system automatically finds the most desirable seats for a group, taking into account wheelchair accessibility if necessary. The project is structured to follow an MV* architecture and uses design patterns to ensure modularity and maintainability.

## Table of Contents
- [Features](#features)
- [Classes](#classes)
- [Usage](#usage)


## Features
- **Seat Reservation**: Automatically finds and reserves the best seats based on proximity to the center row.
- **Wheelchair Accessibility**: Allows users to request wheelchair-accessible seating.
- **Command Line Interaction**: Users can reserve seats, view current seating arrangements, or exit the system.
- **Modular Design**: Implements MV* architecture and uses design patterns to improve code organization.

## Classes

### `Main`
- **Methods**:
  - `main(String[] args)`: Initializes the theater and starts the reservation system.

### `Theater`
- Represents a theater with multiple rows of seats.
- **Attributes**:
  - `name` (String): The name of the theater.
  - `rows` (List\<Row\>): The collection of rows in the theater.
  - `centerRow` (int): The center row, used to determine the best seats.
- **Methods**:
  - `Theater(String name, int rows, int centerRow, List<Integer> wheelchairAccessibleRows)`: Constructor to initialize a theater with a name, rows, and wheelchair accessibility information.
  - Getters for `name`, `rows`, and `centerRow`.

### `Row`
- Represents a row of seats in the theater.
- **Attributes**:
  - `wheelchairAccessible` (boolean): Indicates if the row is wheelchair accessible.
- **Methods**:
  - `Row(int rowNumber, int seatCount, boolean wheelchairAccessible)`: Constructor to initialize a row with seat count and accessibility information.
  - `hasEnoughConsecutiveSeats(int seatCount)`: Checks if the row has enough consecutive unreserved seats.
  - `reserveSeats(int seatCount, String name)`: Reserves the specified number of consecutive seats for a user.

### `Seat`
- Represents an individual seat in a row.
- **Attributes**:
  - `name` (String): The seat label (e.g., A, B, C).
  - `reservedFor` (String): The name of the person who reserved the seat, or `null` if unreserved.
- **Methods**:
  - `Seat(String name)`: Constructor to initialize a seat with its name.
  - `reserve(String reservedFor)`: Reserves the seat for the specified person.
  - Overrides for `equals(Object)`, `hashCode()`, and `toString()`.

### `ReservationsService`
- Handles the logic for reserving seats and displaying the seating arrangement.
- **Methods**:
  - `reserveSeats(Theater theater, int seatCount, String name, boolean wheelchairRequired)`: Reserves seats for a party, considering accessibility if needed.
  - `showSeating(Theater theater)`: Displays the current seating arrangement.

## Usage

### Command Line Interaction
The program will prompt the user with `"What would you like to do?"` and expect one of the following commands:
- `reserve <number>`: Reserves the specified number of seats.
- `show`: Displays the current seating arrangement.
- `done`: Exits the reservation system.

### Example Session
```plaintext
What would you like to do?
reserve 5
What's your name?
Emily
I've reserved 5 seats for you at the Roxy in row 8, Emily.

What would you like to do?
show
1 __________
2 __________
3 __________
4 __________
5 __________
6 __________
7 __________
8 _XXXXX____
9 __________
10 __________
11 __________
12 __________
13 __________
14 __________
15 __________
```
### Wheelchair Accessibility
When reserving seats, the system will ask the user if they require wheelchair-accessible seating:

```
Do you need wheelchair accessible seats?

```
If the user responds "yes", the system will search for available seats in accessible rows.

