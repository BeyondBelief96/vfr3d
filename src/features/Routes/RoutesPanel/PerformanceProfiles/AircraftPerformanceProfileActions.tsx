// src/components/ProfileActions.tsx
import React from 'react';

interface AircraftPerformanceProfileActionsProps {
  isDeleting: boolean;
  isDeleteError: boolean;
}

const AircraftPerformanceProfileActions: React.FC<AircraftPerformanceProfileActionsProps> = ({
  isDeleting,
  isDeleteError,
}) => {
  return (
    <div className="h-6">
      {isDeleting && <div>Deleting profile...</div>}
      {isDeleteError && (
        <div className="text-error">Failed to delete profile. Please try again.</div>
      )}
    </div>
  );
};

export default AircraftPerformanceProfileActions;
