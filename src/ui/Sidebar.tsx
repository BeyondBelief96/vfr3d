import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ImageryControls from '../features/Imagery/ImageryControls';
import { setSelectedStateAirports, toggleShowAirports } from '../redux/slices/airportsSlice';
import { RootState } from '../redux/store';
import { states } from '../utility/states';

interface SidebarProps {
  imageryLayerOptions: { value: string; label: string }[];
  onLayerChange: (layer: string) => void;
  onAlphaChange: (alpha: number) => void;
  onBrightnessChange: (brightness: number) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  imageryLayerOptions,
  onLayerChange,
  onAlphaChange,
  onBrightnessChange,
}) => {
  const dispatch = useDispatch();
  const { selectedImageryLayer } = useSelector((state: RootState) => state.viewer);

  const { showAirports, selectedStateAirports } = useSelector((state: RootState) => state.airport);

  return (
    <div className="p-4 w-80 bg-base-100">
      <h2 className="mb-4 text-4xl font-bold text-base-content">Map Options</h2>
      <div className="mb-4">
        <label htmlFor="layer-select" className="block mb-2">
          Imagery Layer
        </label>
        <select
          id="layer-select"
          className="w-full select select-bordered"
          value={selectedImageryLayer}
          onChange={(e) => onLayerChange(e.target.value)}
        >
          {imageryLayerOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <ImageryControls onAlphaChange={onAlphaChange} onBrightnessChange={onBrightnessChange} />
      <div className="mt-4">
        <label htmlFor="state-select" className="block mb-2">
          Select State
        </label>
        <select
          id="state-select"
          className="w-full select select-bordered"
          value={selectedStateAirports}
          onChange={(e) => dispatch(setSelectedStateAirports(e.target.value))}
        >
          <option value="">All</option>
          {states.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>
      </div>
      <div className="flex items-center mt-4">
        <label htmlFor="airport-toggle" className="mr-2">
          Show Airports
        </label>
        <input
          id="airport-toggle"
          type="checkbox"
          checked={showAirports}
          onChange={() => dispatch(toggleShowAirports())}
          className="toggle toggle-primary"
        />
      </div>
      {/* <RouteForm onRouteChange={onRouteChange} /> */}
    </div>
  );
};

export default Sidebar;
