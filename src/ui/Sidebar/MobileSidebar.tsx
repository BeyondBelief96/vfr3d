// MobileSidebar.tsx
import React from 'react';
import { useDispatch } from 'react-redux';
import { toggleSidebar } from '../../redux/slices/sidebarSlice';
import MapOptions from './MapOptions';
import AirportOptions from './AirportOptions';
import RouteForm from '../../features/Routes/RouteForm';
import AirspaceOptions from './AirspaceOptions';

interface MobileSidebarProps {
  isOpen: boolean;
  imageryLayerOptions: { value: string; label: string }[];
}

const MobileSidebar: React.FC<MobileSidebarProps> = ({ isOpen, imageryLayerOptions }) => {
  const dispatch = useDispatch();

  return (
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
      <div className="p-4">
        <MapOptions imageryLayerOptions={imageryLayerOptions} />
        <AirportOptions />
        <RouteForm />
        <AirspaceOptions />
      </div>
    </div>
  );
};

export default MobileSidebar;
