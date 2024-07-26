// AirsigmetOptions.tsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, AppState } from '../../redux/store';
import { HazardType, toggleHazardVisibility } from '../../redux/slices/airsigmetsSlice';

const AirsigmetOptions: React.FC = () => {
  const visibleHazards = useSelector((state: AppState) => state.airsigmet.visibleHazards);
  const dispatch = useDispatch<AppDispatch>();

  const hazardTypes: HazardType[] = ['CONVECTIVE', 'ICE', 'TURB', 'IFR', 'MTN OBSCN'];

  return (
    <form>
      <div className="mt-4 mr-4">
        <h2 className="mb-2 text-lg font-semibold">Airmet/Sigmet Options</h2>
        {hazardTypes.map((hazardType) => (
          <div key={hazardType} className="flex items-center mb-2">
            <input
              type="checkbox"
              id={`hazard-${hazardType}`}
              checked={visibleHazards[hazardType]}
              onChange={() => dispatch(toggleHazardVisibility(hazardType))}
              className="mr-2"
            />
            <label htmlFor={`hazard-${hazardType}`}>{hazardType}</label>
          </div>
        ))}
      </div>
    </form>
  );
};

export default AirsigmetOptions;
