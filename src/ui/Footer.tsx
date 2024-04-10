import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="p-4 footer footer-center bg-base-300 text-base-content">
      <div>
        <p>Copyright © {new Date().getFullYear()} - All right reserved by Airspace.io</p>
      </div>
    </footer>
  );
};

export default Footer;
