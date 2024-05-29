// src/components/ProfileError.tsx
import React from 'react';
import { MdError } from 'react-icons/md';

interface AircraftPerformanceProfileErrorsProps {
  refetchProfiles: () => void;
}

const AircraftPerformanceProfileErrors: React.FC<AircraftPerformanceProfileErrorsProps> = ({
  refetchProfiles,
}) => {
  return (
    <div className="alert alert-error">
      <div className="flex-1">
        <MdError />
        <label>Failed to load profiles. Please try again.</label>
      </div>
      <div className="flex-none">
        <button className="btn btn-sm btn-error" onClick={() => refetchProfiles()}>
          Retry
        </button>
      </div>
    </div>
  );
};

export default AircraftPerformanceProfileErrors;
