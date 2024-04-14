// Header.tsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSidebar } from '../redux/slices/sidebarSlice';
import { RootState } from '../redux/store';
import DonationButton from './DonationButton';
import SearchBar from './SearchBar';
import ThemeController from './ThemeController';

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state: RootState) => state.sidebar.isOpen);

  return (
    <header className="flex items-center justify-between px-4 py-2 bg-neutral text-neutral-content">
      <div className="flex items-center">
        <button className="block mr-4 lg:hidden" onClick={() => dispatch(toggleSidebar())}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
            />
          </svg>
        </button>
        <div className="flex-1 lg:mr-4">
          <SearchBar />
        </div>
      </div>
      <div className="items-center hidden lg:flex">
        <a href="/contact" className="mr-4 btn btn-ghost btn-sm">
          Report an Issue
        </a>
        <DonationButton />
        <ThemeController />
      </div>
    </header>
  );
};

export default Header;
