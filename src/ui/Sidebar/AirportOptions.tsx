// AirportOptions.tsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setSelectedState,
  setShowAirports,
  setShowCloudBases,
} from '../../redux/slices/airportsSlice';
import { AppState } from '../../redux/store';
import { states } from '../../utility/states';

const AirportOptions: React.FC = () => {
  const dispatch = useDispatch();
  const {
    showAirports,
    showCloudBases,
    selectedState: selectedStateAirports,
  } = useSelector((state: AppState) => state.airport);

  const handleSelectedStateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();
    dispatch(setSelectedState(event.target.value));
    dispatch(setShowAirports(true));
  };

  return (
    <>
      <div className="mb-6">
        <h2 className="mb-2 text-lg font-semibold">Airports</h2>
        <div className="mt-4">
          <label htmlFor="state-select" className="block mb-2">
            Select State
          </label>
          <select
            id="state-select"
            className="w-full select select-bordered"
            value={selectedStateAirports}
            onChange={(e) => handleSelectedStateChange(e)}
          >
            {states.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="mb-6">
        <div className="flex items-center gap-4 mt-4">
          <label htmlFor="airport-toggle" className="mr-2">
            Show Airports
          </label>
          <input
            id="airport-toggle"
            type="checkbox"
            checked={showAirports}
            onChange={() => dispatch(setShowAirports(!showAirports))}
            className="toggle toggle-primary"
          />
          <label htmlFor="airport-toggle" className="mr-2">
            Show Cloud Bases
          </label>
          <input
            id="cloudbases-toggle"
            type="checkbox"
            checked={showCloudBases}
            onChange={() => dispatch(setShowCloudBases(!showCloudBases))}
            className="toggle toggle-primary"
          />
        </div>
      </div>
    </>
  );
};

export default AirportOptions;
