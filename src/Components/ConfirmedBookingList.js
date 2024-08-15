import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ConfirmedBooking from './ConfirmedBooking';

export default function ConfirmedBookingList() {
  const [confirmedBookings, setConfirmedBookings] = useState([]);

  useEffect(() => {
    // Fetch confirmed bookings when the component mounts
    async function fetchConfirmedBookings() {
      try {
        const response = await axios.get('https://admin-backend-0tby.onrender.com/api/confirmed-bookings');
        setConfirmedBookings(response.data);
      } catch (error) {
        console.error('Error fetching confirmed bookings:', error);
      }
    }

    fetchConfirmedBookings();
  }, [confirmedBookings]); // Empty dependency array to run effect only once when component mounts

  return (
    <div className="container">
      <h1 className="mb-4">Confirmed Bookings</h1>
      <div className="row">
        {confirmedBookings.map((booking) => (
          <ConfirmedBooking key={booking._id} booking={booking} />
        ))}
      </div>
    </div>
  );
}
