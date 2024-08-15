import React, { useState, useEffect } from 'react';
import { MdMail } from 'react-icons/md';
import emailjs from 'emailjs-com';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [emailStatus, setEmailStatus] = useState(null); // State to track email sending status

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('https://admin-backend-0tby.onrender.com/users');
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      // Handle errors gracefully, perhaps by displaying a user-friendly message
      console.error('Error fetching users:', error);
    }
  };

  const handleSendEmail = (email) => {
    const templateParams = {
      to_email: email
    };

    emailjs.send('service_0uc5n5y', 'template_lf9t9db', templateParams, 'ZEKZ7uslRXLTffeeG')
      .then((response) => {
        console.log('Email successfully sent!', response.status, response.text);
        setEmailStatus('success'); // Set state to 'success' on successful send
      })
      .catch((error) => {
        console.error('Email sending failed:', error);
        setEmailStatus('error'); // Set state to 'error' on send failure
      });
  };

  return (
    <div className="container">
      <h2 className="my-4">User List</h2>
      {emailStatus === 'success' && (
        <div className="alert alert-success" role="alert">
          Email sent successfully!
        </div>
      )}
      {emailStatus === 'error' && (
        <div className="alert alert-danger" role="alert">
          Failed to send email. Please try again later.
        </div>
      )}
      <table className="table table-striped">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>CNIC</th>
            <th>Phone Number</th>
            <th>Street Address</th>
            <th>Email Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>
                {user.email}
                <a href="#" onClick={() => handleSendEmail(user.email)} className="ml-2">
                  <MdMail color='black'/>
                </a>
              </td>
              <td>{user.cnic}</td>
              <td>{user.phoneNumber}</td>
              <td>{user.streetAddress}</td>
              <td>
                {/* Additional actions can be added here if needed */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
