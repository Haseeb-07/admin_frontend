import React from 'react';
import axios from 'axios';

export default function PendingBooking({ booking, onBookingUpdate }) {
  const confirmBooking = async () => {
    try {
      await axios.put(`https://admin-backend-0tby.onrender.com/api/confirm-booking/${booking._id}`);
      alert('Booking confirmed successfully');
      // Notify parent component to update the UI
      if (onBookingUpdate) {
        onBookingUpdate();
      }
    } catch (error) {
      console.error('Error confirming booking:', error);
      alert('Failed to confirm booking');
    }
  };

  return (
    <div className="col-md-4 mb-4">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Package Name: {booking.package_name}</h5>
          <p className="card-text">Destinations: {booking.destinations}</p>
          <p className="card-text">Booked By: {booking.booked_by.email}</p>
          <p className="card-text">Booking Date: {new Date(booking.booking_date).toLocaleString()}</p>
          <p className="card-text">Number of Persons: {booking.numberOfPersons}</p>
          <p className="card-text">Phone Number: {booking.phoneNo}</p>
          <p className="card-text">Pickup Location: {booking.pickupLocation}</p>
          <p className="card-text">Status: {booking.status}</p>
          <p className="card-text">CNIC: {booking.cnic}</p>
         
          {booking.status === 'pending' && (
            <button className="btn btn-primary" onClick={confirmBooking}>Confirm Booking</button>
          )}
        </div>
      </div>
    </div>
  );
}
