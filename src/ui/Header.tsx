import { Link, useLocation } from 'react-router-dom';
import DonationButton from './DonationButton';
import ThemeController from './ThemeController';

const Header: React.FC = () => {
  const location = useLocation();
  const isViewerPage = location.pathname === '/viewer';

  return (
    <header className="navbar bg-neutral text-neutral-content">
      <div className="navbar-start">
        <div className="flex-1">
          <Link to="/" className="text-xl normal-case btn btn-ghost">
            VFR3D
          </Link>
        </div>
      </div>

      <div className="navbar-end">
        <div className="items-center hidden space-x-2 sm:flex">
          {!isViewerPage && (
            <Link to="/contact" className="text-sm normal-case btn btn-info">
              Report an Issue
            </Link>
          )}
          {isViewerPage && (
            <Link to="/contact" className="text-sm normal-case btn btn-info">
              Report an Issue
            </Link>
          )}
          <DonationButton />
          <ThemeController />
        </div>

        <div className="sm:hidden dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-square btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-6 h-6 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="p-2 mt-3 shadow menu dropdown-content bg-base-100 rounded-box w-52"
          >
            {!isViewerPage && (
              <li>
                <Link to="/contact" className="text-sm">
                  Report an Issue
                </Link>
              </li>
            )}
            {isViewerPage && (
              <li>
                <Link to="/contact" className="text-sm">
                  Report an Issue
                </Link>
              </li>
            )}
            <li>
              <DonationButton />
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
