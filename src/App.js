import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Components/Login';
import CustomSidebar from './Components/CustomSidebar';
import PackageList from './Components/PackageList';
import DestinationList from './Components/DestinationList';
import ConfirmedBookingList from './Components/ConfirmedBookingList';
import PendingList from './Components/PendingList';
import CreatePackage from './Components/CreatePackage';
import CreateDestination from './Components/CreateDestination';
import CustomizedPackageList from './Components/CustomizedPackageList';
import Users from './Components/UserList'
function App() {
  // Initialize isLoggedIn state with the value from local storage or false if not available
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');

  // Function to handle successful login
  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true'); // Set isLoggedIn to true in local storage
  };

  // Function to handle logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.setItem('isLoggedIn', 'false'); // Set isLoggedIn to false in local storage
  };

  return (
    <div style={{ display: 'flex' }}>
      <BrowserRouter>
        {/* Conditionally render sidebar based on login status */}
        {isLoggedIn && <CustomSidebar onLogout={handleLogout} />}
        <div style={{ flex: 1 }}>
          {/* Routes for authenticated users */}
          <Routes>
            <Route path="/destinations" element={<DestinationList />} />
            <Route path="/createpackage" element={<CreatePackage />} />
            <Route path="/packagelist" element={<PackageList />} />
            <Route path="/confirmedbookings" element={<ConfirmedBookingList />} />
            <Route path="/pendingbookings" element={<PendingList />} />
            <Route path="/createdestination" element={<CreateDestination />} />
            <Route path="/customizedbookings" element={<CustomizedPackageList />} />
            <Route path="/users" element={<Users />} />
          </Routes>
        </div>
        {/* Render login component when not logged in */}
        {!isLoggedIn && <Login onLogin={handleLogin} />}
      </BrowserRouter>
    </div>
  );
}

export default App;
