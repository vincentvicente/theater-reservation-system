# Theater Reservation System

A full-stack theater seat reservation system with React frontend and Spring Boot backend, featuring wheelchair accessibility support.

## Features

- 🎭 **Interactive Web UI** - Modern React-based user interface
- 🪑 **Smart Seat Selection** - Automatic best seat assignment
- ♿ **Accessibility Support** - Wheelchair accessible seating
- 📱 **Responsive Design** - Works on desktop and mobile
- 🔄 **Real-time Updates** - Live seating layout updates
- ✅ **Complete Testing** - Unit tests and code coverage

## Tech Stack

### Backend
- **Java 17+** with Spring Boot 3.1
- **Gradle** build system
- **H2 Database** (in-memory)
- **JUnit 5** testing
- **JaCoCo** code coverage
- **PMD** code quality

### Frontend
- **React 18** with modern hooks
- **Ant Design** UI components
- **Axios** for API calls
- **CSS3** with responsive design

## Project Structure

```
theater-reservation-system/
├── src/main/java/
│   ├── model/                 # Core business models
│   ├── controller/           # REST API controllers
│   ├── service/             # Business logic services
│   ├── dto/                 # Data transfer objects
│   └── TheaterReservationApplication.java
├── src/main/resources/
│   └── application.yml       # Spring Boot configuration
├── frontend/                # React application
│   ├── src/
│   │   ├── components/       # React components
│   │   ├── services/         # API services
│   │   └── App.js           # Main React app
│   └── package.json
└── build.gradle             # Gradle configuration
```

## Quick Start

### Prerequisites
- Java 17+
- Node.js 16+
- npm or yarn

### Backend Setup
```bash
# Build and run Spring Boot backend
./gradlew bootRun

# Backend will be available at http://localhost:8080
```

### Frontend Setup
```bash
# Install dependencies
cd frontend
npm install

# Start React development server
npm start

# Frontend will be available at http://localhost:3000
```

### Full Stack Development
```bash
# Terminal 1: Start backend
./gradlew bootRun

# Terminal 2: Start frontend
cd frontend && npm start
```

## API Endpoints

- `GET /api/theater` - Get theater information
- `POST /api/reserve` - Reserve seats
- `GET /api/seating` - Get current seating layout

## Development Commands

```bash
# Backend
./gradlew build          # Build project
./gradlew test           # Run tests
./gradlew jacocoTestReport # Generate coverage report
./gradlew bootRun        # Run Spring Boot app

# Frontend
npm start               # Start development server
npm run build          # Build for production
npm test               # Run tests
```

## Features Overview

### 🎯 Smart Seat Assignment
- Automatically selects best available seats
- Prioritizes center rows for better viewing
- Considers wheelchair accessibility requirements

### 🎨 Modern UI/UX
- Interactive seat selection
- Real-time availability updates
- Responsive design for all devices
- Intuitive reservation form

### ♿ Accessibility Features
- Dedicated wheelchair accessible rows
- Clear visual indicators
- Accessibility-first design principles

## Testing

```bash
# Run all tests
./gradlew test

# Generate test coverage report
./gradlew jacocoTestReport
# View report at: build/jacocoHtml/index.html
```

## Authors

- **Qiyuan Zhu** - Main application & Spring Boot integration
- **Shaohua Guo** - Core business models (Theater, Row, Seat)
- **Yitian Xu** - Reservation service logic
