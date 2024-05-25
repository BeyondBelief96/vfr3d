import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';

const AppLayout: React.FC = () => {
  return (
    <div>
      <nav>
        <Header />
      </nav>
      <Outlet />
    </div>
  );
};

export default AppLayout;
