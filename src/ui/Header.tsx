import { Link, useLocation } from 'react-router-dom';

import DonationButton from './DonationButton';
import ThemeController from './ThemeController';

const Header: React.FC = () => {
  const location = useLocation();

  const isViewerPage = location.pathname === '/viewer';

  return (
    <header
      className="h-35 auto navbar bg-neutral text-neutral-content"
      style={{ minHeight: 'unset' }}
    >
      <div className="navbar-start">
        {!isViewerPage && (
          <Link to="/contact" className="text-sm normal-case btn btn-info">
            Report an Issue
          </Link>
        )}
      </div>

      <div className="navbar-center">
        <ul className="px-1 menu menu-horizontal">
          <Link to="/" className="text-xl normal-case btn btn-ghost">
            VFR3D
          </Link>
        </ul>
      </div>

      <div className="space-x-4 navbar-end">
        {isViewerPage && (
          <Link to="/contact" className="text-sm normal-case btn btn-info">
            Report an Issue
          </Link>
        )}
        <DonationButton />
        <ThemeController />
      </div>
    </header>
  );
};

export default Header;
