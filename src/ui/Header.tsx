// Header.tsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { toggleSidebar } from '../redux/slices/sidebarSlice';
import { RootState } from '../redux/store';
import DonationButton from './DonationButton';
import SearchBar from './SearchBar';
import ThemeController from './ThemeController';

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const isOpen = useSelector((state: RootState) => state.sidebar.isOpen);
  const isViewerPage = location.pathname === '/viewer';
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="flex items-center justify-between px-4 py-2 bg-neutral text-neutral-content">
      <div className="flex items-center">
        {isViewerPage && (
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
        )}

        {isViewerPage && <SearchBar />}

        {!isViewerPage && (
          <div>
            <Link to="/">VFR3D</Link>
          </div>
        )}
      </div>

      <div className="flex justify-center">
        {isViewerPage && (
          <div>
            <Link to="/">VFR3D</Link>
          </div>
        )}
      </div>

      {!isViewerPage && (
        <div className="items-center lg:hidden">
          <div className="dropdown dropdown-end">
            <button className="btn btn-ghost btn-sm" onClick={toggleMenu}>
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
                  d={isMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 8h16M4 16h16'}
                />
              </svg>
            </button>
            {isMenuOpen && !isViewerPage && (
              <ul
                tabIndex={0}
                className="p-2 mt-3 shadow menu dropdown-content bg-neutral rounded-box w-52"
              >
                <li>
                  <Link to="/contact">Report an Issue</Link>
                </li>
                <li>
                  <DonationButton />
                </li>
              </ul>
            )}
          </div>
        </div>
      )}

      <div className="items-center hidden lg:flex">
        <Link to="/contact" className="mr-4 btn btn-ghost btn-sm">
          Report an Issue
        </Link>
        <DonationButton />
        <ThemeController />
      </div>
    </header>
  );
};

export default Header;
