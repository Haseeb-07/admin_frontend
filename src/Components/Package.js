import React, { useState } from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import { MdDelete, MdEdit } from 'react-icons/md';

const Package = ({ _id, name, destinations, startDate, endDate, price, onDelete, onSave }) => {
  const [editing, setEditing] = useState(false);
  const [editedPackage, setEditedPackage] = useState({
    name,
    destinations: Array.isArray(destinations) ? destinations.join(', ') : '', // Check if destinations is an array
    startDate: new Date(startDate).toISOString().substr(0, 10),
    endDate: new Date(endDate).toISOString().substr(0, 10),
    price,
  });

  const handleEdit = () => {
    setEditing(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedPackage((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSave = () => {
    onSave({ ...editedPackage, _id });
    setEditing(false);
  };

  return (
    <Card style={{ marginBottom: '20px' }}>
      <Card.Body>
        {editing ? (
          <Form>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" name="name" value={editedPackage.name} onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="destinations">
              <Form.Label>Destinations</Form.Label>
              <Form.Control type="text" name="destinations" value={editedPackage.destinations} onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="startDate">
              <Form.Label>Start Date</Form.Label>
              <Form.Control type="date" name="startDate" value={editedPackage.startDate} onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="endDate">
              <Form.Label>End Date</Form.Label>
              <Form.Control type="date" name="endDate" value={editedPackage.endDate} onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="price">
              <Form.Label>Price</Form.Label>
              <Form.Control type="number" name="price" value={editedPackage.price} onChange={handleChange} />
            </Form.Group>
            <Button variant="primary" onClick={handleSave}>Save</Button>
          </Form>
        ) : (
          <>
            <Card.Title>{name}</Card.Title>
            <Card.Text>
              <strong>Destinations:</strong> {destinations} {/* Display destinations directly */}
            </Card.Text>
            <Card.Text>
              <strong>Start Date:</strong> {new Date(startDate).toLocaleDateString()}
            </Card.Text>
            <Card.Text>
              <strong>End Date:</strong> {new Date(endDate).toLocaleDateString()}
            </Card.Text>
            <Card.Text>
              <strong>Price per person:</strong> PKR {price}
            </Card.Text>
          </>
        )}
        <div className="d-flex justify-content-between align-items-center">
          {editing ? null : (
            <>
              <MdEdit size={20} onClick={handleEdit} style={{ cursor: 'pointer' }} />
              <MdDelete size={20} onClick={() => onDelete(_id)} style={{ cursor: 'pointer' }} />
            </>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default Package;
