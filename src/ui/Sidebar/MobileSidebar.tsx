import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSidebar } from '../../redux/slices/sidebarSlice';
import MapOptions from './MapOptions';
import AirportOptions from './AirportOptions';
import AirspaceOptions from './AirspaceOptions';
import HamburgerToggle from '../ReusableComponents/HamburgerToggle';
import { RootState } from '../../redux/store';
import RouteOptions from './RouteOptions';

interface MobileSidebarProps {
  imageryLayerOptions: { value: string; label: string }[];
}

const MobileSidebar: React.FC<MobileSidebarProps> = ({ imageryLayerOptions }) => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state: RootState) => state.sidebar.isOpen);

  const toggleSidebarHandler = () => {
    dispatch(toggleSidebar());
  };

  return (
    <div
      className={`fixed inset-y-0 left-0 z-30 w-full px-4 py-8 overflow-y-auto transition-transform duration-300 ease-in-out transform bg-base-100 lg:hidden ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="flex justify-end mb-4">
        <HamburgerToggle isOpen={isOpen} onClick={toggleSidebarHandler} />
      </div>
      <div className="p-4">
        <MapOptions imageryLayerOptions={imageryLayerOptions} />
        <AirportOptions />
        <RouteOptions />
        <AirspaceOptions />
      </div>
    </div>
  );
};

export default MobileSidebar;
