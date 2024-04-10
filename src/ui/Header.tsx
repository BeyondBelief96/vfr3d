import { Link } from 'react-router-dom';
import DonationButton from './DonationButton';
import ThemeController from './ThemeController';

const Header: React.FC = () => {
  return (
    <header
      className="h-35 auto navbar bg-neutral text-neutral-content"
      style={{ minHeight: 'unset' }}
    >
      <div className="navbar-start"></div>
      <div className="navbar-center">
        <ul className="px-1 menu menu-horizontal">
          <Link to="/" className="text-xl normal-case btn btn-ghost">
            VFR3D
          </Link>
        </ul>
      </div>
      <div className="navbar-end">
        <DonationButton />
        <ThemeController />
      </div>
    </header>
  );
};

export default Header;
