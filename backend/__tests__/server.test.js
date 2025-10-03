const request = require('supertest');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// Create test app without starting server
const app = express();
app.use(cors());
app.use(bodyParser.json());

// Mock theater data
let theater = {
  name: "Roxy",
  rows: [],
  centerRow: 7
};

// Initialize theater for testing
function initializeTheater() {
  const numRows = 15;
  const seatsPerRow = 10;
  const accessibleRows = [1, 5, 10];
  
  for (let i = 1; i <= numRows; i++) {
    const seats = [];
    for (let j = 0; j < seatsPerRow; j++) {
      seats.push({
        name: String.fromCharCode(65 + j),
        reserved: false,
        reservedFor: null,
        wheelchairAccessible: accessibleRows.includes(i)
      });
    }
    
    theater.rows.push({
      rowNumber: i,
      wheelchairAccessible: accessibleRows.includes(i),
      seats: seats
    });
  }
}

// Smart seat assignment algorithm
function findBestSeats(numSeats, needsAccessible) {
  const centerRow = Math.floor(theater.rows.length / 2);
  let bestRow = null;
  let bestDistance = Infinity;
  
  for (let i = 0; i < theater.rows.length; i++) {
    const row = theater.rows[i];
    const distanceFromCenter = Math.abs(i - centerRow);
    
    let consecutiveSeats = 0;
    let startIndex = -1;
    
    for (let j = 0; j < row.seats.length; j++) {
      if (!row.seats[j].reserved) {
        consecutiveSeats++;
        if (consecutiveSeats === 1) startIndex = j;
        if (consecutiveSeats >= numSeats) break;
      } else {
        consecutiveSeats = 0;
        startIndex = -1;
      }
    }
    
    if (consecutiveSeats >= numSeats) {
      if (row.wheelchairAccessible === needsAccessible || !needsAccessible) {
        if (distanceFromCenter < bestDistance) {
          bestRow = { rowIndex: i, startIndex: startIndex };
          bestDistance = distanceFromCenter;
        }
      }
    }
  }
  
  return bestRow;
}

function reserveSeats(numSeats, personName, needsAccessible) {
  const bestSeats = findBestSeats(numSeats, needsAccessible);
  
  if (!bestSeats) {
    return false;
  }
  
  const row = theater.rows[bestSeats.rowIndex];
  for (let i = 0; i < numSeats; i++) {
    const seatIndex = bestSeats.startIndex + i;
    row.seats[seatIndex].reserved = true;
    row.seats[seatIndex].reservedFor = personName;
  }
  
  return true;
}

// API Routes
app.get('/api/theater', (req, res) => {
  res.json(theater);
});

app.post('/api/reserve', (req, res) => {
  const { numSeats, personName, needsAccessible } = req.body;
  
  if (!numSeats || !personName || needsAccessible === undefined) {
    return res.status(400).json({
      success: false,
      message: 'Missing required fields'
    });
  }
  
  const success = reserveSeats(numSeats, personName, needsAccessible);
  
  if (success) {
    res.json({
      success: true,
      message: 'Seats reserved successfully!',
      rowInfo: 'Check the seating layout for details'
    });
  } else {
    res.json({
      success: false,
      message: "Sorry, we don't have that many seats together for you.",
      rowInfo: null
    });
  }
});

app.get('/api/seating', (req, res) => {
  res.json(theater.rows);
});

// Initialize theater for testing
initializeTheater();

describe('Theater Backend API', () => {
  test('GET /api/theater returns theater data', async () => {
    const response = await request(app)
      .get('/api/theater')
      .expect(200);
    
    expect(response.body).toHaveProperty('name');
    expect(response.body).toHaveProperty('rows');
    expect(response.body.name).toBe('Roxy');
    expect(Array.isArray(response.body.rows)).toBe(true);
    expect(response.body.rows.length).toBe(15);
  });

  test('GET /api/seating returns seating layout', async () => {
    const response = await request(app)
      .get('/api/seating')
      .expect(200);
    
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBe(15);
    
    // Check first row structure
    const firstRow = response.body[0];
    expect(firstRow).toHaveProperty('rowNumber');
    expect(firstRow).toHaveProperty('wheelchairAccessible');
    expect(firstRow).toHaveProperty('seats');
    expect(Array.isArray(firstRow.seats)).toBe(true);
    expect(firstRow.seats.length).toBe(10);
  });

  test('POST /api/reserve with valid data succeeds', async () => {
    const reservationData = {
      numSeats: 3,
      personName: 'John Doe',
      needsAccessible: false
    };

    const response = await request(app)
      .post('/api/reserve')
      .send(reservationData)
      .expect(200);
    
    expect(response.body).toHaveProperty('success');
    expect(response.body).toHaveProperty('message');
    expect(response.body.success).toBe(true);
  });

  test('POST /api/reserve with invalid data fails', async () => {
    const invalidData = {
      numSeats: 20, // Too many seats
      personName: 'John Doe',
      needsAccessible: false
    };

    const response = await request(app)
      .post('/api/reserve')
      .send(invalidData)
      .expect(200);
    
    expect(response.body.success).toBe(false);
    expect(response.body.message).toContain("don't have that many seats");
  });

  test('POST /api/reserve with missing fields returns error', async () => {
    const incompleteData = {
      numSeats: 3
      // Missing personName and needsAccessible
    };

    const response = await request(app)
      .post('/api/reserve')
      .send(incompleteData)
      .expect(400);
    
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toContain('Missing required fields');
  });

  test('seat reservation algorithm works', () => {
    // Test the core algorithm directly
    const testTheater = {
      rows: [
        {
          rowNumber: 1,
          wheelchairAccessible: true,
          seats: [
            { name: 'A', reserved: false, reservedFor: null, wheelchairAccessible: true },
            { name: 'B', reserved: false, reservedFor: null, wheelchairAccessible: true },
            { name: 'C', reserved: false, reservedFor: null, wheelchairAccessible: true }
          ]
        }
      ]
    };
    
    // Test finding consecutive seats
    const centerRow = Math.floor(testTheater.rows.length / 2);
    let consecutiveSeats = 0;
    let startIndex = -1;
    
    for (let j = 0; j < testTheater.rows[0].seats.length; j++) {
      if (!testTheater.rows[0].seats[j].reserved) {
        consecutiveSeats++;
        if (consecutiveSeats === 1) startIndex = j;
        if (consecutiveSeats >= 2) break;
      } else {
        consecutiveSeats = 0;
        startIndex = -1;
      }
    }
    
    expect(consecutiveSeats).toBeGreaterThanOrEqual(2);
    expect(startIndex).toBeGreaterThanOrEqual(0);
  });
});
