import React from 'react';
import { useMediaQuery } from 'react-responsive';
import MobileSidebar from './MobileSidebar';
import DesktopSidebar from './DesktopSidebar';

const Sidebar: React.FC = () => {
  const isDesktop = useMediaQuery({ minWidth: 768 });
  return <div className="z-30">{isDesktop ? <DesktopSidebar /> : <MobileSidebar />}</div>;
};

export default Sidebar;
