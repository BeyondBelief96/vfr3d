// DesktopSidebar.tsx
import React from 'react';
import MapOptions from './MapOptions';
import AirportOptions from './AirportOptions';
import RouteForm from '../../features/Routes/RouteForm';
import AirspaceOptions from './AirspaceOptions';

interface DesktopSidebarProps {
  imageryLayerOptions: { value: string; label: string }[];
}

const DesktopSidebar: React.FC<DesktopSidebarProps> = ({ imageryLayerOptions }) => {
  return (
    <div className="hidden px-4 py-8 overflow-y-auto w-85 bg-base-100 lg:block">
      <div className="p-4">
        <MapOptions imageryLayerOptions={imageryLayerOptions} />
        <AirportOptions />
        <RouteForm />
        <AirspaceOptions />
      </div>
    </div>
  );
};

export default DesktopSidebar;
