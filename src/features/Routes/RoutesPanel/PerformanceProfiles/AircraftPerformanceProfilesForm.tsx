// src/components/ProfileForm.tsx
import React from 'react';
import {
  SaveAircraftPerformanceRequestDTO,
  UpdateAircraftPerformanceRequestDTO,
} from 'vfr3d-shared';

interface AircraftPerformanceProfilesFormProps {
  selectedProfileId: number | null;
  formData:
    | Partial<SaveAircraftPerformanceRequestDTO>
    | Partial<UpdateAircraftPerformanceRequestDTO>;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSaveProfile: () => void;
  isSaving: boolean;
  isUpdating: boolean;
  isSaveError: boolean;
  isUpdateError: boolean;
  setIsCreating: (isCreating: boolean) => void;
  setIsEditing: (isEditing: boolean) => void;
}

const AircraftPerformanceProfilesForm: React.FC<AircraftPerformanceProfilesFormProps> = ({
  selectedProfileId,
  formData,
  handleInputChange,
  handleSaveProfile,
  isSaving,
  isUpdating,
  isSaveError,
  isUpdateError,
  setIsCreating,
  setIsEditing,
}) => {
  return (
    <div>
      <h2 className="mb-4 text-xl font-bold sm:text-2xl">
        {selectedProfileId ? 'Edit' : 'Create'} Aircraft Performance Profile
      </h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSaveProfile();
        }}
        className="grid grid-cols-1 gap-4 sm:grid-cols-2"
      >
        <div className="sm:col-span-2">
          <label className="label">
            <span className="label-text">Profile Name</span>
          </label>
          <input
            type="text"
            name="profileName"
            value={formData.profileName}
            onChange={handleInputChange}
            className="w-full input input-bordered"
            required
          />
        </div>
        <div>
          <label className="label">
            <span className="label-text">Climb True Airspeed (knots)</span>
          </label>
          <input
            type="number"
            name="climbTrueAirspeed"
            value={formData.climbTrueAirspeed}
            onChange={handleInputChange}
            className="w-full input input-bordered"
            required
          />
        </div>
        <div>
          <label className="label">
            <span className="label-text">Cruise True Airspeed (knots)</span>
          </label>
          <input
            type="number"
            name="cruiseTrueAirspeed"
            value={formData.cruiseTrueAirspeed}
            onChange={handleInputChange}
            className="w-full input input-bordered"
            required
          />
        </div>
        <div>
          <label className="label">
            <span className="label-text">Cruise Fuel Burn (gph)</span>
          </label>
          <input
            type="number"
            name="cruiseFuelBurn"
            value={formData.cruiseFuelBurn}
            onChange={handleInputChange}
            className="w-full input input-bordered"
            required
          />
        </div>
        <div>
          <label className="label">
            <span className="label-text">Climb Fuel Burn (gph)</span>
          </label>
          <input
            type="number"
            name="climbFuelBurn"
            value={formData.climbFuelBurn}
            onChange={handleInputChange}
            className="w-full input input-bordered"
            required
          />
        </div>
        <div>
          <label className="label">
            <span className="label-text">Descent Fuel Burn (gph)</span>
          </label>
          <input
            type="number"
            name="descentFuelBurn"
            value={formData.descentFuelBurn}
            onChange={handleInputChange}
            className="w-full input input-bordered"
            required
          />
        </div>
        <div>
          <label className="label">
            <span className="label-text">Climb Rate (fpm)</span>
          </label>
          <input
            type="number"
            name="climbFpm"
            value={formData.climbFpm}
            onChange={handleInputChange}
            className="w-full input input-bordered"
            required
          />
        </div>
        <div>
          <label className="label">
            <span className="label-text">Descent Rate (fpm)</span>
          </label>
          <input
            type="number"
            name="descentFpm"
            value={formData.descentFpm}
            onChange={handleInputChange}
            className="w-full input input-bordered"
            required
          />
        </div>
        <div>
          <label className="label">
            <span className="label-text">Descent True Airspeed (knots)</span>
          </label>
          <input
            type="number"
            name="descentTrueAirSpeed"
            value={formData.descentTrueAirSpeed}
            onChange={handleInputChange}
            className="w-full input input-bordered"
            required
          />
        </div>
        <div>
          <label className="label">
            <span className="label-text">Start, Taxi, Takeoff Fuel (gals)</span>
          </label>
          <input
            type="number"
            name="sttFuelGals"
            value={formData.sttFuelGals}
            onChange={handleInputChange}
            className="w-full input input-bordered"
            required
          />
        </div>
        <div>
          <label className="label">
            <span className="label-text">Fuel On Board (gals)</span>
          </label>
          <input
            type="number"
            name="fuelOnBoardGals"
            value={formData.fuelOnBoardGals}
            onChange={handleInputChange}
            className="w-full input input-bordered"
            required
          />
        </div>
        <div className="sm:col-span-2">
          <div className="flex flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
            <button type="submit" className="btn btn-primary" disabled={isSaving || isUpdating}>
              {isSaving || isUpdating ? 'Saving...' : 'Save Profile'}
            </button>
            <div className="h-6">
              {(isSaveError || isUpdateError) && (
                <div className="text-error">
                  {isSaveError
                    ? 'Failed to save profile. Please try again.'
                    : 'Failed to update profile. Please try again.'}
                </div>
              )}
            </div>
            <button
              type="button"
              className="btn btn-primary text-primary-content"
              onClick={() => {
                setIsCreating(false);
                setIsEditing(false);
              }}
              disabled={isSaving || isUpdating}
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AircraftPerformanceProfilesForm;
