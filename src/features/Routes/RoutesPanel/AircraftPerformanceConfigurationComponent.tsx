import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../../redux/store';
import {
  setAircraftPerformanceProfile,
  validateNavlogFields,
} from '../../../redux/slices/navlogSlice';

export const AircraftPerformanceConfigurationComponent: React.FC = () => {
  const dispatch = useDispatch();
  const { aircraftPerformanceProfile, errors } = useSelector((state: AppState) => state.navlog);

  useEffect(() => {
    dispatch(validateNavlogFields());
  }, [dispatch]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    dispatch(setAircraftPerformanceProfile({ [name]: Number(value) }));
    dispatch(validateNavlogFields());
  };

  const hasErrors = Object.values(errors).some((error) => error);

  return (
    <div>
      {hasErrors && <div className="mb-4 text-error">Please fill out all fields.</div>}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        <div>
          <label htmlFor="climbTrueAirspeed" className="block mb-1 text-sm">
            Climb TAS:
          </label>
          <input
            type="number"
            step="1"
            id="climbTrueAirspeed"
            name="climbTrueAirspeed"
            value={aircraftPerformanceProfile.climbTrueAirspeed}
            onChange={handleInputChange}
            className={`w-full p-2 border rounded border-base-content ${
              errors.climbTrueAirspeed ? 'border-error' : ''
            }`}
          />
        </div>
        <div>
          <label htmlFor="cruiseTrueAirspeed" className="block mb-1 text-sm">
            Cruise TAS:
          </label>
          <input
            type="number"
            step="1"
            id="cruiseTrueAirspeed"
            name="cruiseTrueAirspeed"
            value={aircraftPerformanceProfile.cruiseTrueAirspeed}
            onChange={handleInputChange}
            className={`w-full p-2 border rounded border-base-content ${
              errors.cruiseTrueAirspeed ? 'border-error' : ''
            }`}
          />
        </div>
        <div>
          <label htmlFor="cruiseFuelBurn" className="block mb-1 text-sm">
            Cruise GPH:
          </label>
          <input
            type="number"
            step="0.1"
            id="cruiseFuelBurn"
            name="cruiseFuelBurn"
            value={aircraftPerformanceProfile.cruiseFuelBurn}
            onChange={handleInputChange}
            className={`w-full p-2 border rounded border-base-content ${
              errors.cruiseFuelBurn ? 'border-error' : ''
            }`}
          />
        </div>
        <div>
          <label htmlFor="climbFuelBurn" className="block mb-1 text-sm">
            Climb GPH:
          </label>
          <input
            type="number"
            step="0.1"
            id="climbFuelBurn"
            name="climbFuelBurn"
            value={aircraftPerformanceProfile.climbFuelBurn}
            onChange={handleInputChange}
            className={`w-full p-2 border rounded border-base-content ${
              errors.climbFuelBurn ? 'border-error' : ''
            }`}
          />
        </div>
        <div>
          <label htmlFor="descentFuelBurn" className="block mb-1 text-sm">
            Descent GPH:
          </label>
          <input
            type="number"
            step="0.1"
            id="descentFuelBurn"
            name="descentFuelBurn"
            value={aircraftPerformanceProfile.descentFuelBurn}
            onChange={handleInputChange}
            className={`w-full p-2 border rounded border-base-content ${
              errors.descentFuelBurn ? 'border-error' : ''
            }`}
          />
        </div>
        <div>
          <label htmlFor="climbFpm" className="block mb-1 text-sm">
            Climb FPM:
          </label>
          <input
            type="number"
            step="1"
            id="climbFpm"
            name="climbFpm"
            value={aircraftPerformanceProfile.climbFpm}
            onChange={handleInputChange}
            className={`w-full p-2 border rounded border-base-content ${
              errors.climbFpm ? 'border-error' : ''
            }`}
          />
        </div>
        <div>
          <label htmlFor="descentFpm" className="block mb-1 text-sm">
            Descent FPM:
          </label>
          <input
            type="number"
            step="1"
            id="descentFpm"
            name="descentFpm"
            value={aircraftPerformanceProfile.descentFpm}
            onChange={handleInputChange}
            className={`w-full p-2 border rounded border-base-content ${
              errors.descentFpm ? 'border-error' : ''
            }`}
          />
        </div>
        <div>
          <label htmlFor="descentTrueAirSpeed" className="block mb-1 text-sm">
            Descent TAS:
          </label>
          <input
            type="number"
            step="1"
            id="descentTrueAirSpeed"
            name="descentTrueAirSpeed"
            value={aircraftPerformanceProfile.descentTrueAirSpeed}
            onChange={handleInputChange}
            className={`w-full p-2 border rounded border-base-content ${
              errors.descentTrueAirSpeed ? 'border-error' : ''
            }`}
          />
        </div>
        <div>
          <label htmlFor="sttFuelGals" className="block mb-1 text-sm">
            STT Fuel (Gals):
          </label>
          <input
            type="number"
            id="sttFuelGals"
            name="sttFuelGals"
            value={aircraftPerformanceProfile.sttFuelGals}
            onChange={handleInputChange}
            step="0.1" // Adjust the step value as needed
            className={`w-full p-2 border rounded border-base-content ${
              errors.sttFuelGals ? 'border-error' : ''
            }`}
          />
        </div>
        <div>
          <label htmlFor="fuelOnBoardGals" className="block mb-1 text-sm">
            FOB (Gals):
          </label>
          <input
            type="number"
            step="1"
            id="fuelOnBoardGals"
            name="fuelOnBoardGals"
            value={aircraftPerformanceProfile.fuelOnBoardGals}
            onChange={handleInputChange}
            className={`w-full p-2 border rounded border-base-content ${
              errors.fuelOnBoardGals ? 'border-error' : ''
            }`}
          />
        </div>
      </div>
    </div>
  );
};
