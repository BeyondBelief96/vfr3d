import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './components/AppLayout/Header';

const AppLayout: React.FC = () => {
  const location = useLocation();
  const isViewerPage = location.pathname === '/viewer';

  return (
    <div className="flex flex-col h-screen">
      <nav>
        <Header />
      </nav>
      <div className={`flex-1 ${isViewerPage ? 'overflow-hidden' : ''}`}>
        <Outlet />
      </div>
    </div>
  );
};

export default AppLayout;
