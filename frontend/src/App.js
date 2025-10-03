import React, { useState, useEffect } from 'react';
import { Layout, Typography, Card, Row, Col, message } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import TheaterLayout from './components/TheaterLayout';
import ReservationForm from './components/ReservationForm';
import { theaterService } from './services/theaterService';
import './App.css';

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

function App() {
  const [theater, setTheater] = useState(null);
  const [loading, setLoading] = useState(false);
  const [reservationResult, setReservationResult] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);

  useEffect(() => {
    loadTheater();
  }, []);

  const loadTheater = async () => {
    try {
      setLoading(true);
      const theaterData = await theaterService.getTheater();
      setTheater(theaterData);
    } catch (error) {
      message.error('Failed to load theater data');
      console.error('Error loading theater:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSeatClick = (row, seat) => {
    if (seat.reserved) {
      message.warning('This seat is already reserved');
      return;
    }

    const seatKey = `${row.rowNumber}-${seat.name}`;
    const isSelected = selectedSeats.some(s => s.key === seatKey);
    
    if (isSelected) {
      // Deselect seat
      setSelectedSeats(prev => prev.filter(s => s.key !== seatKey));
    } else {
      // Select seat
      setSelectedSeats(prev => [...prev, {
        key: seatKey,
        row: row.rowNumber,
        seat: seat.name,
        wheelchairAccessible: seat.wheelchairAccessible
      }]);
    }
  };

  const handleReservation = async (reservationData) => {
    try {
      setLoading(true);
      const result = await theaterService.reserveSeats(reservationData);
      setReservationResult(result);
      
      if (result.success) {
        message.success(result.message);
        // Clear selected seats
        setSelectedSeats([]);
        // Reload theater data to show updated seating
        await loadTheater();
      } else {
        message.error(result.message);
      }
    } catch (error) {
      message.error('Failed to process reservation');
      console.error('Error processing reservation:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout className="app-layout">
      <Header className="app-header">
        <div className="header-content">
          <Title level={3} style={{ color: 'white', margin: 0 }}>
            <HomeOutlined /> Theater Reservation System
          </Title>
        </div>
      </Header>
      
      <Content className="app-content">
        <Row gutter={[16, 16]}>
          <Col xs={24} lg={16}>
            <Card title="Theater Seating Layout" loading={loading}>
              {theater && (
                <TheaterLayout 
                  theater={theater} 
                  selectedSeats={selectedSeats}
                  onSeatClick={handleSeatClick}
                />
              )}
            </Card>
          </Col>
          
          <Col xs={24} lg={8}>
            <Card title="Make a Reservation">
              <ReservationForm 
                onSubmit={handleReservation}
                loading={loading}
                selectedSeats={selectedSeats}
              />
              
              {reservationResult && (
                <Card 
                  size="small" 
                  title="Reservation Result"
                  style={{ marginTop: 16 }}
                >
                  <p style={{ 
                    color: reservationResult.success ? 'green' : 'red',
                    fontWeight: 'bold'
                  }}>
                    {reservationResult.message}
                  </p>
                  {reservationResult.rowInfo && (
                    <p>{reservationResult.rowInfo}</p>
                  )}
                </Card>
              )}
            </Card>
          </Col>
        </Row>
      </Content>
      
      <Footer className="app-footer">
        <div style={{ textAlign: 'center' }}>
          Theater Reservation System ©2024 - Built with React + Spring Boot
        </div>
      </Footer>
    </Layout>
  );
}

export default App;
