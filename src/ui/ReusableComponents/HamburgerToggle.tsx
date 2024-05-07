// HamburgerToggle.tsx
import React from 'react';

interface HamburgerToggleProps {
  isOpen: boolean;
  onClick: () => void;
}

const HamburgerToggle: React.FC<HamburgerToggleProps> = ({ isOpen, onClick }) => {
  return (
    <button className="block mr-4 btn btn-ghost " onClick={onClick}>
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
  );
};

export default HamburgerToggle;
