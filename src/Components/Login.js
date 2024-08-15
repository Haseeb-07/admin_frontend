import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://admin-backend-0tby.onrender.com/admin/login', {
        email,
        password
      });
      console.log(response.data); // You can handle the response as needed
      // Call the onLogin callback provided by the parent component
      onLogin();
    } catch (error) {
      setError(error.response.data.message);
      setEmail('');
      setPassword('');
    }
  };

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center h-100" style={{ marginTop: '150px' }}>
      <div className="col-md-6">
        <div className="card">
          <div className="card-body">
            <h2 className="card-title text-center mb-4">TravelSage Admin Panel</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Email:</label>
                <input
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Password:</label>
                <input
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {error && <div className="alert alert-danger">{error}</div>}
              <button type="submit" className="btn btn-warning btn-block" style={{ width: "100%" }}>Login</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
