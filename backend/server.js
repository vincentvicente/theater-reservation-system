const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 8080;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Theater data (in-memory)
let theater = {
  name: "Roxy",
  rows: [],
  centerRow: 7
};

// Initialize theater
function initializeTheater() {
  const numRows = 15;
  const seatsPerRow = 10;
  const accessibleRows = [1, 5, 10];
  
  for (let i = 1; i <= numRows; i++) {
    const seats = [];
    for (let j = 0; j < seatsPerRow; j++) {
      seats.push({
        name: String.fromCharCode(65 + j), // A, B, C, ...
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
    
    // Check if row has enough consecutive seats
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
      // Check accessibility requirement
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

// Reserve seats
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

// Initialize theater on startup
initializeTheater();

app.listen(PORT, () => {
  console.log(`🎭 Theater Backend running on http://localhost:${PORT}`);
  console.log(`📊 Theater: ${theater.name} with ${theater.rows.length} rows`);
});

