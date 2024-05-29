// src/components/ProfileLoading.tsx
import React from 'react';
import { FaInfoCircle } from 'react-icons/fa';

const AircraftProfileLoading: React.FC = () => {
  return (
    <div className="alert alert-info">
      <div className="flex-1">
        <FaInfoCircle />
        <label>Loading profiles...</label>
      </div>
    </div>
  );
};

export default AircraftProfileLoading;
