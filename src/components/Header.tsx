// Header.tsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { toggleSidebar } from '../redux/slices/sidebarSlice';
import { AppState } from '../redux/store';
import DonationButton from './ReusableComponents/DonationButton';
import SearchBar from './ReusableComponents/SearchBar';
import HamburgerToggle from './ReusableComponents/HamburgerToggle';
import { useAuth0 } from '@auth0/auth0-react';

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, logout } = useAuth0();
  const location = useLocation();
  const isOpen = useSelector((state: AppState) => state.sidebar.isOpen);
  const isViewerPage = location.pathname === '/viewer';
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    logout({ logoutParams: { returnTo: import.meta.env.VITE_AUTH0_LOGOUT_URI } });
  };

  return (
    <header className="flex items-center justify-between px-4 py-2 bg-neutral text-neutral-content">
      {isViewerPage ? (
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center">
            <HamburgerToggle isOpen={isOpen} onClick={() => dispatch(toggleSidebar())} />
            <SearchBar />
          </div>
          <div className="justify-center flex-grow hidden sm:flex">
            <Link to="/">
              <img src="logo_2.png" width={200} height={200} alt="Logo" />
            </Link>
          </div>
          <div className="flex items-center justify-end">
            {isAuthenticated && (
              <button className="btn btn-primary" onClick={handleLogout}>
                Logout
              </button>
            )}
          </div>
        </div>
      ) : (
        <>
          <div>
            <Link to="/">
              <img src="logo_2.png" width={200} height={200} alt="Logo" />
            </Link>
          </div>
          <div className="flex items-center">
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
                {isMenuOpen && (
                  <ul
                    tabIndex={0}
                    className="p-2 mt-3 shadow menu dropdown-content bg-neutral rounded-box w-52"
                  >
                    <li>
                      <Link to="/contact">Report an Issue</Link>
                    </li>
                    <li>
                      <Link to="https://www.buymeacoffee.com/bberisford">Buy me a coffee!</Link>
                    </li>
                  </ul>
                )}
              </div>
            </div>
            <div className="items-center hidden gap-2 lg:flex">
              <Link to="/contact" className="mr-4 btn btn-ghost btn-sm">
                Report an Issue
              </Link>
              <DonationButton />
            </div>
          </div>
        </>
      )}
    </header>
  );
};

export default Header;
