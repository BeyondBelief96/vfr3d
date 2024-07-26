import React from 'react';
import { useSelector } from 'react-redux';
import { AppState } from '../../redux/store';
import MapOptions from './MapOptions';
import AirportOptions from './AirportOptions';
import RouteOptions from './RouteOptions';
import { PirepOptions } from './PirepOptions';
import AirspaceOptions from './AirspaceOptions';
import AirsigmetOptions from './AirsigmetOptions';

const DesktopSidebar: React.FC = () => {
  const isOpen = useSelector((state: AppState) => state.sidebar.isOpen);

  return (
    <div
      className={`h-full overflow-y-auto transition-all ease-in-out bg-base-100 ${
        isOpen ? 'w-96' : 'w-0'
      }`}
    >
      <div className="flex flex-col h-screen gap-3 p-4">
        <MapOptions />
        <AirportOptions />
        <RouteOptions />
        <PirepOptions />
        <AirsigmetOptions />
        <AirspaceOptions />
      </div>
    </div>
  );
};

export default DesktopSidebar;
