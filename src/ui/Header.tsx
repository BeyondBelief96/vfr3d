import { Link } from 'react-router-dom';
import ThemeController from './ThemeController';

const Header: React.FC = () => {
  return (
    <header
      className="h-35 auto navbar bg-neutral text-neutral-content"
      style={{ minHeight: 'unset' }}
    >
      <div className="navbar-start">
        <Link to="/" className="text-xl normal-case btn btn-ghost">
          VFR3D
        </Link>
      </div>
      <div className="navbar-center">
        <ul className="px-1 menu menu-horizontal">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/viewer">Viewer</Link>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <ThemeController />
      </div>
    </header>
  );
};

export default Header;
