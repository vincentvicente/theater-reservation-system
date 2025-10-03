import React from 'react';
import { Typography, Tooltip } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import './TheaterLayout.css';

const { Text } = Typography;

const TheaterLayout = ({ theater, selectedSeats = [], onSeatClick }) => {
  if (!theater) {
    return <div>Loading theater layout...</div>;
  }

  const getSeatStatus = (seat, rowNumber) => {
    if (seat.reserved) {
      return 'reserved';
    }
    
    const seatKey = `${rowNumber}-${seat.name}`;
    const isSelected = selectedSeats.some(s => s.key === seatKey);
    
    if (isSelected) {
      return 'selected';
    }
    
    return seat.wheelchairAccessible ? 'accessible' : 'available';
  };

  const getSeatIcon = (seat) => {
    if (seat.reserved) {
      return 'X';
    }
    return seat.wheelchairAccessible ? '=' : '_';
  };

  const getSeatTooltip = (seat, rowNumber) => {
    if (seat.reserved) {
      return `Reserved for: ${seat.reservedFor}`;
    }
    if (seat.wheelchairAccessible) {
      return `Row ${rowNumber}, Seat ${seat.name} (Wheelchair Accessible)`;
    }
    return `Row ${rowNumber}, Seat ${seat.name}`;
  };

  return (
    <div className="theater-layout">
      <div className="stage">
        <Text strong>STAGE</Text>
      </div>
      
      <div className="seating-area">
        {theater.rows.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            <div className="row-number">
              <Text strong>{rowIndex + 1}</Text>
            </div>
            <div className="seats">
              {row.seats.map((seat, seatIndex) => (
                <Tooltip 
                  key={seatIndex}
                  title={getSeatTooltip(seat, rowIndex + 1)}
                  placement="top"
                >
                  <button
                    className={`seat ${getSeatStatus(seat, rowIndex + 1)}`}
                    onClick={() => onSeatClick(row, seat)}
                    disabled={seat.reserved}
                  >
                    {getSeatIcon(seat)}
                    {seat.wheelchairAccessible && !seat.reserved && (
                      <UserOutlined className="wheelchair-icon" />
                    )}
                  </button>
                </Tooltip>
              ))}
            </div>
            {row.wheelchairAccessible && (
              <div className="accessibility-indicator">
                <UserOutlined />
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div className="legend">
        <div className="legend-item">
          <div className="legend-seat available"></div>
          <Text>Available</Text>
        </div>
        <div className="legend-item">
          <div className="legend-seat accessible"></div>
          <Text>Wheelchair Accessible</Text>
        </div>
        <div className="legend-item">
          <div className="legend-seat selected"></div>
          <Text>Selected</Text>
        </div>
        <div className="legend-item">
          <div className="legend-seat reserved"></div>
          <Text>Reserved</Text>
        </div>
      </div>
    </div>
  );
};

export default TheaterLayout;
