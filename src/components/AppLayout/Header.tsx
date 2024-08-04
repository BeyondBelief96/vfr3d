// src/components/Header.tsx
import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { toggleSidebar } from '../../redux/slices/sidebarSlice';
import { AppState } from '../../redux/store';
import DonationButton from '../ReusableComponents/DonationButton';
import HamburgerToggle from '../ReusableComponents/HamburgerToggle';
import SearchBar from '../ReusableComponents/SearchBar';
import MobileHamburgerMenu from '../HomePage/MobileHamburgerMenu';

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, logout } = useAuth0();
  const location = useLocation();
  const isOpen = useSelector((state: AppState) => state.sidebar.isOpen);
  const isViewerPage = location.pathname === '/viewer';

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
            <MobileHamburgerMenu className="lg:hidden" />
            <div className="items-center hidden gap-2 lg:flex">
              <Link to="/contact" className="mr-4 btn btn-ghost btn-sm hover:scale-105">
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
