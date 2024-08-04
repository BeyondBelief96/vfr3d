import React, { useState, useEffect, useRef } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { IoCloseSharp } from 'react-icons/io5';
import { Link } from 'react-router-dom';

interface MobileMenuProps {
  className?: string;
}

const MobileHamburgerMenu: React.FC<MobileMenuProps> = ({ className = '' }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        closeMenu();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={`dropdown dropdown-end ${className}`} ref={menuRef}>
      <label tabIndex={0} className="btn btn-ghost btn-circle" onClick={toggleMenu}>
        {isMenuOpen ? <IoCloseSharp size={20} /> : <GiHamburgerMenu size={20} />}
      </label>
      {isMenuOpen && (
        <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
          <li>
            <Link to="/contact" onClick={closeMenu}>
              Report an Issue
            </Link>
          </li>
          <li>
            <a href="https://www.buymeacoffee.com/bberisford" onClick={closeMenu}>
              Buy me a coffee!
            </a>
          </li>
        </ul>
      )}
    </div>
  );
};

export default MobileHamburgerMenu;
