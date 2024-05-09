import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import MapOptions from './MapOptions';
import AirportOptions from './AirportOptions';
import RouteOptions from './RouteOptions';
import AirspaceOptions from './AirspaceOptions';

interface DesktopSidebarProps {
  imageryLayerOptions: { value: string; label: string }[];
}

const DesktopSidebar: React.FC<DesktopSidebarProps> = ({ imageryLayerOptions }) => {
  const isOpen = useSelector((state: RootState) => state.sidebar.isOpen);

  return (
    <div
      className={`h-full py-8 overflow-hidden transition-all ease-in-out bg-base-100 ${
        isOpen ? 'w-96' : 'w-0'
      }`}
    >
      <div
        className={`h-full overflow-scroll transition-transform ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-96'
        }`}
      >
        <div className="p-4">
          <MapOptions imageryLayerOptions={imageryLayerOptions} />
          <AirportOptions />
          <RouteOptions />
          <AirspaceOptions />
        </div>
      </div>
    </div>
  );
};

export default DesktopSidebar;
