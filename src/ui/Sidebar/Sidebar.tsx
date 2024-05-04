// Sidebar.tsx
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import MobileSidebar from './MobileSidebar';
import DesktopSidebar from './DesktopSidebar';

interface SidebarProps {
  imageryLayerOptions: { value: string; label: string }[];
}

const Sidebar: React.FC<SidebarProps> = ({ imageryLayerOptions }) => {
  const { isOpen } = useSelector((state: RootState) => state.sidebar);

  return (
    <>
      <MobileSidebar isOpen={isOpen} imageryLayerOptions={imageryLayerOptions} />
      <DesktopSidebar imageryLayerOptions={imageryLayerOptions} />
    </>
  );
};

export default Sidebar;
