import React from 'react';
import { useMediaQuery } from 'react-responsive';
import MobileSidebar from './MobileSidebar';
import DesktopSidebar from './DesktopSidebar';

interface SidebarProps {
  imageryLayerOptions: { value: string; label: string }[];
}

const Sidebar: React.FC<SidebarProps> = ({ imageryLayerOptions }) => {
  const isDesktop = useMediaQuery({ minWidth: 768 }); 
  return (
    <>
      {isDesktop ? (
        <DesktopSidebar imageryLayerOptions={imageryLayerOptions} />
      ) : (
        <MobileSidebar imageryLayerOptions={imageryLayerOptions} />
      )}
    </>
  );
};

export default Sidebar;
