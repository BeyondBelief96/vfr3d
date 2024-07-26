// AirspaceOptions.tsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleAirspace3d } from '../../redux/slices/airspaceSlice';
import { AppState } from '../../redux/store';

const AirspaceOptions: React.FC = () => {
  const dispatch = useDispatch();
  const { airspace3dEnabled } = useSelector((state: AppState) => state.airspace);

  return (
    <div>
      <h2 className="text-lg font-semibold ">Experimental Features</h2>
      <div className="flex items-center mt-4">
        <label htmlFor="airspace-toggle" className="mr-2">
          Show 3D Airspace
        </label>
        <input
          id="airport-toggle"
          type="checkbox"
          checked={airspace3dEnabled}
          onChange={() => dispatch(toggleAirspace3d())}
          className="toggle toggle-primary"
        />
      </div>
      <div className="p-4 mt-4 rounded-md shadow-md bg-base-300">
        <p className="text-primary-content">
          Please note that the 3D airspace visualization is an experimental feature in its early
          stages of development. When enabled, a loading screen will appear initially, and it may
          take some time for the airspace polygons to load fully. We are researching ways to provide
          this sort of data more optimally.
        </p>
        <p className="text-primary-content">
          Please note that the 3D airspace data currently displayed may not be up-to-date. The data
          is provided by{' '}
          <a
            className="text-blue-600 underline hover:text-blue-800"
            href="https://3dairspace.org.uk"
            target="_blank"
            rel="noopener noreferrer"
          >
            3dairspace.org.uk
          </a>
        </p>
      </div>
    </div>
  );
};

export default AirspaceOptions;
