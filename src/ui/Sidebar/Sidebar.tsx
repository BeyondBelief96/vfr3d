// Sidebar.tsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ImageryControls from '../../features/Imagery/ImageryControls';
import RouteForm from '../../features/Routes/RouteForm';
import {
  setImageryAlpha,
  setImageryBrightness,
  setSelectedLayer,
} from '../../redux/slices/ViewerSlice';
import { setSelectedState, toggleShowAirports } from '../../redux/slices/airportsSlice';
import { toggleAirspace3d } from '../../redux/slices/airspaceSlice';
import { toggleSidebar } from '../../redux/slices/sidebarSlice';
import { RootState } from '../../redux/store';
import { states } from '../../utility/states';

interface SidebarProps {
  imageryLayerOptions: { value: string; label: string }[];
}

const Sidebar: React.FC<SidebarProps> = ({ imageryLayerOptions }) => {
  const dispatch = useDispatch();
  const { selectedImageryLayer } = useSelector((state: RootState) => state.viewer);
  const { isOpen } = useSelector((state: RootState) => state.sidebar);
  const { showAirports, selectedState: selectedStateAirports } = useSelector(
    (state: RootState) => state.airport
  );
  const { airspace3dEnabled } = useSelector((state: RootState) => state.airspace);

  return (
    <>
      {/* Mobile sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-30 w-full px-4 py-8 overflow-y-auto transition-transform duration-300 ease-in-out transform bg-base-100 lg:hidden ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex justify-end mb-4">
          <button className="btn btn-ghost" onClick={() => dispatch(toggleSidebar())}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        {/* ... sidebar content */}
        <div className="p-4">
          {/* Map Options */}
          <div className="mb-6">
            <h2 className="mb-2 text-lg font-semibold">Map Options</h2>
            <div className="mb-4">
              <label htmlFor="layer-select" className="block mb-2">
                Aviation Chart Layer
              </label>
              <select
                id="layer-select"
                className="w-full select select-bordered"
                value={selectedImageryLayer}
                onChange={(e) => dispatch(setSelectedLayer(e.target.value))}
              >
                {imageryLayerOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <ImageryControls
              onAlphaChange={(alpha) => dispatch(setImageryAlpha(alpha))}
              onBrightnessChange={(brightness) => dispatch(setImageryBrightness(brightness))}
            />
          </div>

          {/* State Selection */}
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
          {/* Show Airports Toggle */}
          <div className="mb-6">
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
          </div>
          {/* Route Form */}
          <div>
            <RouteForm />
          </div>
          {/* Show Airspace Toggle */}
          <div className="mt-6 mb-6">
            <h2 className="mb-2 text-lg font-semibold">Experimental Features</h2>
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
              <h3 className="mb-2 text-lg font-semibold text-neutral-content">
                3D Airspace Visualization (Experimental Feature)
              </h3>
              <p className="mb-2 text-info">
                Please note that the 3D airspace visualization is an experimental feature in its
                early stages of development. When enabled, a loading screen will appear initially,
                and it may take up to 2 minutes for the airspace polygons to load fully. Subsequent
                enabling or disabling of this feature should be faster.
              </p>
              <p className="mb-2 text-info">
                We are actively working on optimizing the data loading process to reduce loading
                times, including exploring the possibility of loading data by state or region.
              </p>
              <p className="text-info">
                Please note that the 3D airspace data currently displayed may not be up-to-date. The
                data is provided by{' '}
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
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden px-4 py-8 overflow-y-auto w-85 bg-base-100 lg:block">
        {/* ... sidebar content */}
        <div className="p-4">
          {/* Map Options */}
          <div className="mb-6">
            <h2 className="mb-2 text-lg font-semibold">Map Options</h2>
            <div className="mb-4">
              <label htmlFor="layer-select-desktop" className="block mb-2">
                Aviation Chart Layer
              </label>
              <select
                id="layer-select-desktop"
                className="w-full select select-bordered"
                value={selectedImageryLayer}
                onChange={(e) => dispatch(setSelectedLayer(e.target.value))}
              >
                {imageryLayerOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <ImageryControls
              onAlphaChange={(alpha) => dispatch(setImageryAlpha(alpha))}
              onBrightnessChange={(brightness) => dispatch(setImageryBrightness(brightness))}
            />
          </div>

          {/* State Selection */}
          <div className="mb-6">
            <h2 className="mb-2 text-lg font-semibold">Airports</h2>
            <div className="mt-4">
              <label htmlFor="state-select-desktop" className="block mb-2">
                Select State
              </label>
              <select
                id="state-select-desktop"
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
          {/* Show Airports Toggle */}
          <div className="mb-6">
            <div className="flex items-center mt-4">
              <label htmlFor="airport-toggle-desktop" className="mr-2">
                Show Airports
              </label>
              <input
                id="airport-toggle-desktop"
                type="checkbox"
                checked={showAirports}
                onChange={() => dispatch(toggleShowAirports())}
                className="toggle toggle-primary"
              />
            </div>
          </div>
          {/* Route Form */}
          <div>
            <RouteForm />
          </div>
          {/* Show Airspace Toggle */}
          <div className="mt-6 mb-6">
            <h2 className="mb-2 text-lg font-semibold">Experimental Features</h2>
            <div className="flex items-center mt-4">
              <label htmlFor="airspace-toggle-desktop" className="mr-2">
                Show 3D Airspace
              </label>
              <input
                id="airport-toggle-desktop"
                type="checkbox"
                checked={airspace3dEnabled}
                onChange={() => dispatch(toggleAirspace3d())}
                className="toggle toggle-primary"
              />
            </div>
            <div className="p-4 mt-4 rounded-md shadow-md bg-base-300">
              <h3 className="mb-2 text-lg font-semibold text-neutral-content">
                3D Airspace Visualization (Experimental Feature)
              </h3>
              <p className="mb-2 text-info">
                Please note that the 3D airspace visualization is an experimental feature in its
                early stages of development. When enabled, a loading screen will appear initially,
                and it may take up to 2 minutes for the airspace polygons to load fully. Subsequent
                enabling or disabling of this feature should be faster.
              </p>
              <p className="mb-2 text-info">
                We are actively working on optimizing the data loading process to reduce loading
                times, including exploring the possibility of loading data by state or region.
              </p>
              <p className="text-info">
                Please note that the 3D airspace data currently displayed may not be up-to-date. The
                data is provided by{' '}
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
        </div>
      </div>
    </>
  );
};

export default Sidebar;
