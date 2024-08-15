import React from 'react';

const CustomizePackage = ({ customizedPackage }) => {
  return (
    <div className="col-md-4 mb-4">
      <div className="card h-100">
        <div className="card-body">
          <h5 className="card-title">{customizedPackage.lastName}</h5>
          <p className="card-text">WhatsApp Number: {customizedPackage.whatsappNumber}</p>
          <p className="card-text">Email: {customizedPackage.email}</p>
          <p className="card-text">City: {customizedPackage.city}</p>
          <p className="card-text">Tour Type: {customizedPackage.tourType}</p>
          <p className="card-text">Destinations: {customizedPackage.destinations.join(', ')}</p>
          <p className="card-text">Start Date: {new Date(customizedPackage.startDate).toLocaleDateString()}</p>
          <p className="card-text">End Date: {new Date(customizedPackage.endDate).toLocaleDateString()}</p>
          <p className="card-text">Rooms: {customizedPackage.rooms}</p>
          <p className="card-text">Number of persons: {customizedPackage.numberOfPersons}</p>
           </div>
      </div>
    </div>
  );
};

export default CustomizePackage;
