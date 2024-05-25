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
    <div className="z-30">
      {isDesktop ? (
        <DesktopSidebar imageryLayerOptions={imageryLayerOptions} />
      ) : (
        <MobileSidebar imageryLayerOptions={imageryLayerOptions} />
      )}
    </div>
  );
};

export default Sidebar;
