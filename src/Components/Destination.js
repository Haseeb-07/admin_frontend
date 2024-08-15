import React, { useState } from 'react';
import { Card, Button, Form, Alert } from 'react-bootstrap';
import { MdEdit, MdDelete } from 'react-icons/md';
import axios from 'axios';

const Destination = ({ destination }) => {
  const [editing, setEditing] = useState(false);
  const [editedDestination, setEditedDestination] = useState({
    name: destination.name,
    description: destination.description
  });
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleEdit = () => {
    setEditing(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedDestination((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(`https://admin-backend-0tby.onrender.com/api/destinations/${destination._id}`, editedDestination);
      setEditedDestination(response.data); // Assuming the response contains the updated destination data
      setEditing(false);
      setMessage({ type: 'success', text: 'Destination updated successfully.' });
    } catch (error) {
      console.error('Error updating destination:', error);
      setMessage({ type: 'danger', text: 'Failed to update the destination.' });
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`https://admin-backend-0tby.onrender.com/api/destinations/${destination._id}`);
      setMessage({ type: 'success', text: 'Destination deleted successfully.' });
    } catch (error) {
      console.error('Error deleting destination:', error);
      setMessage({ type: 'danger', text: 'Failed to delete the destination.' });
    }
  };

  return (
    <Card style={{ marginBottom: '20px' }}>
      <Card.Body>
        {message.text && (
          <Alert variant={message.type} onClose={() => setMessage({ type: '', text: '' })} dismissible>
            {message.text}
          </Alert>
        )}
        {editing ? (
          <Form>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" name="name" value={editedDestination.name} onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control type="text" name="description" value={editedDestination.description} onChange={handleChange} />
            </Form.Group>
            <Button variant="primary" onClick={handleSave}>Save</Button>
          </Form>
        ) : (
          <>
            <Card.Title>{destination.name}</Card.Title>
            <Card.Text>{destination.description}</Card.Text>
          </>
        )}
        <div className="d-flex justify-content-between align-items-center">
          {editing ? null : (
            <>
              <MdEdit size={20} onClick={handleEdit} style={{ cursor: 'pointer' }} />
              <MdDelete size={20} onClick={handleDelete} style={{ cursor: 'pointer' }} />
            </>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default Destination;
