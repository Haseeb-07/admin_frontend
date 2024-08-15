import React, { useState, useEffect } from 'react';
import Destination from './Destination';
import { Container, Row, Col, Alert, Spinner } from 'react-bootstrap';

export default function DestinationList() {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://admin-backend-0tby.onrender.com/api/destinations');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setDestinations(data);
        setError(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [destinations]);

  return (
    <Container>
      <h1 className="text-center mt-4 mb-4">Destinations</h1>
      {loading ? (
        <div className="d-flex justify-content-center">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : error ? (
        <Alert variant="danger">Error fetching data from the database.</Alert>
      ) : destinations.length === 0 ? (
        <Alert variant="info">No destinations available.</Alert>
      ) : (
        <Row xs={1} md={2} lg={3} className="g-4">
          {destinations.map(destination => (
            <Col key={destination.id}>
              <Destination destination={destination} />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}
