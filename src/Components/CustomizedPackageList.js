import React, { useState, useEffect } from 'react';
import CustomizePackage from './CustomizePackage';

const CustomizedPackageList = () => {
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    fetchPackages();
  }, [packages]);

  const fetchPackages = async () => {
    try {
      const response = await fetch('https://admin-backend-0tby.onrender.com/customized-packages');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setPackages(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
      <h2>Customized Packages</h2>
      <ul>
        {packages.map((pkg) => (
          <CustomizePackage key={pkg._id} customizedPackage={pkg} />
        ))}
      </ul>
    </div>
  );
};

export default CustomizedPackageList;
