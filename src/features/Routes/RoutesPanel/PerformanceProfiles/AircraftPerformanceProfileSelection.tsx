// src/components/ProfileSelection.tsx
import React from 'react';
import { AircraftPerformanceResponseDTO } from 'vfr3d-shared';
import { useAppDispatch } from '../../../../hooks/reduxHooks';
import { setSelectedProfileId } from '../../../../redux/slices/aircraftPerformanceSlice';

interface AircraftPerformanceProfileSelectionProps {
  selectedProfileId: number | null;
  profiles: AircraftPerformanceResponseDTO[];
  setIsCreating: (isCreating: boolean) => void;
  setFormData: (formData: Partial<AircraftPerformanceResponseDTO>) => void;
  setIsEditing: (isEditing: boolean) => void;
  handleDeleteProfile: () => void;
}

const AircraftPerformanceProfileSelection: React.FC<AircraftPerformanceProfileSelectionProps> = ({
  selectedProfileId,
  profiles,
  setIsCreating,
  setFormData,
  setIsEditing,
  handleDeleteProfile,
}) => {
  const dispatch = useAppDispatch();

  const handleProfileChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const profileId = e.target.value ? Number(e.target.value) : null;
    dispatch(setSelectedProfileId(profileId));
  };

  return (
    <div>
      <h2 className="mb-4 text-xl font-bold sm:text-2xl">Select Aircraft Performance Profile</h2>
      <div className="mb-4">
        <select
          className="w-full select select-bordered"
          value={selectedProfileId || ''}
          onChange={handleProfileChange}
        >
          <option value="">Select a profile</option>
          {profiles.map((profile) => (
            <option key={profile.id} value={profile.id}>
              {profile.profileName}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
        <button className="btn btn-primary" onClick={() => setIsCreating(true)}>
          Create New Profile
        </button>
        {selectedProfileId && (
          <>
            <button
              className="btn btn-primary"
              onClick={() => {
                const selectedProfile = profiles.find(
                  (profile) => profile.id === selectedProfileId
                );
                if (selectedProfile) {
                  setFormData(selectedProfile);
                  setIsEditing(true);
                  setIsCreating(true);
                }
              }}
            >
              Edit Profile
            </button>
            <button className="btn btn-error" onClick={handleDeleteProfile}>
              Delete Profile
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default AircraftPerformanceProfileSelection;
