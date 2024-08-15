import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Package from './Package';
import { Container, Row, Col, Button, Alert, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const PackageList = () => {
  const [packages, setPackages] = useState([]);
  const [fetchError, setFetchError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    const fetchPackages = async () => {
      setLoading(true);
      try {
        const response = await axios.get('https://admin-backend-0tby.onrender.com/api/packages');
        setPackages(response.data);
        setFetchError(false);
      } catch (error) {
        console.error('Error fetching packages:', error);
        setFetchError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://admin-backend-0tby.onrender.com/api/packages/${id}`);
      setPackages(packages.filter(pkg => pkg._id !== id));
      setMessage({ type: 'success', text: 'Package deleted successfully.' });
    } catch (error) {
      console.error('Error deleting package:', error);
      setMessage({ type: 'danger', text: 'Failed to delete the package.' });
    }
  };

  const handleSave = async (editedPackage) => {
    try {
      await axios.put(`https://admin-backend-0tby.onrender.com/api/packages/${editedPackage._id}`, editedPackage);
      setPackages(packages.map(pkg => (pkg._id === editedPackage._id ? editedPackage : pkg)));
      setMessage({ type: 'success', text: 'Package updated successfully.' });
    } catch (error) {
      console.error('Error updating package:', error);
      setMessage({ type: 'danger', text: 'Failed to update the package.' });
    }
  };

  return (
    <Container>
      <h1>Packages</h1>
      <Link to="/createpackage">
        <Button variant="primary" className="mb-3">
          Create Package
        </Button>
      </Link>
      {message.text && (
        <Alert variant={message.type} onClose={() => setMessage({ type: '', text: '' })} dismissible>
          {message.text}
        </Alert>
      )}
      {loading ? (
        <div className="d-flex justify-content-center">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : fetchError ? (
        <Alert variant="danger">Failed to fetch packages from the database.</Alert>
      ) : packages.length === 0 ? (
        <Alert variant="info">No packages available.</Alert>
      ) : (
        <Row>
          {packages.map(pkg => (
            <Col key={pkg._id} xs={12} sm={6} md={4} lg={3}>
              <Package
                {...pkg}
                onDelete={() => handleDelete(pkg._id)}
                onSave={handleSave}
              />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default PackageList;
