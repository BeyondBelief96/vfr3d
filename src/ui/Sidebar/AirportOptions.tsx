// AirportOptions.tsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedState, setShowAirports } from '../../redux/slices/airportsSlice';
import { RootState } from '../../redux/store';
import { states } from '../../utility/states';

const AirportOptions: React.FC = () => {
  const dispatch = useDispatch();
  const { showAirports, selectedState: selectedStateAirports } = useSelector(
    (state: RootState) => state.airport
  );

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
            onChange={(e) => dispatch(setSelectedState(e.target.value))}
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
        <div className="flex items-center mt-4">
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
        </div>
      </div>
    </>
  );
};

export default AirportOptions;
