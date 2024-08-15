import React, { useState, useEffect } from 'react';

const User = ({ userId }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUser(userId);
  }, [userId]);

  const fetchUser = async (id) => {
    try {
      const response = await fetch(`https://admin-backend-0tby.onrender.com/users/${id}`);
      const data = await response.json();
      setUser(data);
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  if (!user) {
    return <p>Loading user...</p>;
  }

  return (
    <div>
      <h2>User Details</h2>
      <table className="table">
        <tbody>
          <tr>
            <th>First Name:</th>
            <td>{user.firstName}</td>
          </tr>
          <tr>
            <th>Last Name:</th>
            <td>{user.lastName}</td>
          </tr>
          <tr>
            <th>Email:</th>
            <td>{user.email}</td>
          </tr>
          <tr>
            <th>CNIC:</th>
            <td>{user.cnic}</td>
          </tr>
          <tr>
            <th>Phone Number:</th>
            <td>{user.phoneNumber}</td>
          </tr>
          <tr>
            <th>Street Address:</th>
            <td>{user.streetAddress}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default User;
