import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';

const CreatePackage = () => {
  const [formData, setFormData] = useState({
    name: '',
    destinations: '',
    startDate: '',
    endDate: '',
    price: ''
  });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const nameRegex = /^[a-zA-Z\s]+$/;
    const priceRegex = /^\d+(\.\d{1,2})?$/;

    if (!formData.name || !formData.destinations || !formData.startDate || !formData.endDate || !formData.price) {
      setError('Please fill out all fields.');
      return;
    }

    if (!nameRegex.test(formData.name)) {
      setError('Package name can only contain letters and spaces.');
      return;
    }

    if (!priceRegex.test(formData.price)) {
      setError('Price can only contain numbers and optionally a decimal point.');
      return;
    }

    try {
      await axios.post('https://admin-backend-0tby.onrender.com/api/packages', formData);
      setSuccessMessage('Package created successfully!');
      setFormData({
        name: '',
        destinations: '',
        startDate: '',
        endDate: '',
        price: ''
      });
      setError('');
    } catch (error) {
      setError('Error creating package. Please try again later.');
      console.error('Error creating package:', error);
    }
  };

  return (
    <div>
      <h2>Create Package</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {successMessage && <Alert variant="success">{successMessage}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="destinations">
          <Form.Label>Destinations (comma-separated)</Form.Label>
          <Form.Control
            type="text"
            name="destinations"
            value={formData.destinations}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="startDate">
          <Form.Label>Start Date</Form.Label>
          <Form.Control
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="endDate">
          <Form.Label>End Date</Form.Label>
          <Form.Control
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="price">
          <Form.Label>Price per person</Form.Label>
          <Form.Control
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Button type="submit" variant="primary">
          Save
        </Button>
      </Form>
    </div>
  );
};

export default CreatePackage;
