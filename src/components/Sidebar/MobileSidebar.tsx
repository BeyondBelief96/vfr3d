import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSidebar } from '../../redux/slices/sidebarSlice';
import MapOptions from './MapOptions';
import AirportOptions from './AirportOptions';
import { AppState } from '../../redux/store';
import RouteOptions from './RouteOptions';
import { PirepOptions } from './PirepOptions';
import AirsigmetOptions from './AirsigmetOptions';
import { CloseButton } from '../ReusableComponents/CloseButton';

const MobileSidebar: React.FC = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state: AppState) => state.sidebar.isOpen);

  const toggleSidebarHandler = () => {
    dispatch(toggleSidebar());
  };

  return (
    <div
      className={`fixed inset-y-0 left-0 z-30 w-full px-4  overflow-y-auto transition-transform duration-300 ease-in-out transform bg-base-100 lg:hidden ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="flex justify-end mt-4">
        <CloseButton handleClose={toggleSidebarHandler} />
      </div>
      <div className="flex flex-col p-4 space-y-2">
        <MapOptions />
        <AirportOptions />
        <RouteOptions />
        <PirepOptions />
        <AirsigmetOptions />
      </div>
    </div>
  );
};

export default MobileSidebar;
