import React from 'react';
import { Form, Input, Select, Button, Alert, Tag } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const { Option } = Select;

const ReservationForm = ({ onSubmit, loading, selectedSeats = [] }) => {
  const [form] = Form.useForm();

  const handleSubmit = (values) => {
    const numSeats = selectedSeats.length > 0 ? selectedSeats.length : values.numSeats;
    const needsAccessible = selectedSeats.length > 0 
      ? selectedSeats.some(seat => seat.wheelchairAccessible)
      : values.needsAccessible === 'yes';
    
    onSubmit({
      numSeats: numSeats,
      personName: values.personName,
      needsAccessible: needsAccessible,
      selectedSeats: selectedSeats
    });
    form.resetFields();
  };

  return (
    <div>
      {selectedSeats.length > 0 && (
        <Alert
          message={`Selected ${selectedSeats.length} seat(s)`}
          description={
            <div>
              <div>Selected seats: </div>
              {selectedSeats.map((seat, index) => (
                <Tag key={index} color="green">
                  Row {seat.row} Seat {seat.seat}
                </Tag>
              ))}
            </div>
          }
          type="success"
          showIcon
          style={{ marginBottom: 16 }}
        />
      )}
      
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        size="large"
      >
        {selectedSeats.length === 0 && (
          <Form.Item
            label="Number of Seats"
            name="numSeats"
            rules={[
              { required: true, message: 'Please enter number of seats' },
              { type: 'number', min: 1, max: 10, message: 'Number must be between 1 and 10' }
            ]}
          >
            <Input
              type="number"
              placeholder="Enter number of seats"
              min={1}
              max={10}
            />
          </Form.Item>
        )}

        <Form.Item
          label="Your Name"
          name="personName"
          rules={[
            { required: true, message: 'Please enter your name' },
            { min: 2, message: 'Name must be at least 2 characters' }
          ]}
        >
          <Input
            prefix={<UserOutlined />}
            placeholder="Enter your name"
          />
        </Form.Item>

        {selectedSeats.length === 0 && (
          <Form.Item
            label="Wheelchair Accessible Seats"
            name="needsAccessible"
            rules={[{ required: true, message: 'Please select accessibility requirement' }]}
          >
            <Select placeholder="Do you need wheelchair accessible seats?">
              <Option value="no">No</Option>
              <Option value="yes">Yes</Option>
            </Select>
          </Form.Item>
        )}
        
        {selectedSeats.length > 0 && (
          <Alert
            message="Accessibility"
            description={
              selectedSeats.some(seat => seat.wheelchairAccessible)
                ? "Selected seats include wheelchair accessible options"
                : "Selected seats are not wheelchair accessible"
            }
            type={selectedSeats.some(seat => seat.wheelchairAccessible) ? "success" : "info"}
            showIcon
            style={{ marginBottom: 16 }}
          />
        )}

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            block
            size="large"
          >
            {selectedSeats.length > 0 
              ? `Reserve ${selectedSeats.length} Selected Seat(s)`
              : 'Reserve Seats'
            }
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ReservationForm;

