import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PendingBooking from './PendingBooking';

export default function PendingList() {
  const [pendingBookings, setPendingBookings] = useState([]);

  useEffect(() => {
    // Fetch pending bookings when the component mounts
    async function fetchPendingBookings() {
      try {
        const response = await axios.get('https://admin-backend-0tby.onrender.com/api/pendingbookings');
        setPendingBookings(response.data);
      } catch (error) {
        console.error('Error fetching pending bookings:', error);
      }
    }

    fetchPendingBookings();
  }, [pendingBookings]); // Empty dependency array to run effect only once when component mounts

  return (
    <div className="container">
      <h1 className="mb-4">Pending Bookings</h1>
      <div className="row">
        {pendingBookings.map((booking) => (
          <PendingBooking key={booking._id} booking={booking} />
        ))}
      </div>
    </div>
  );
}
