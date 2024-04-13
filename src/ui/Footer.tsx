import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="p-4 footer footer-center bg-base-300 text-base-content">
      <div>
        <p>
          &copy; {new Date().getFullYear()} VFR3D.com. All rights reserved.
          <br />
          The source code is available under the{' '}
          <a href="https://opensource.org/licenses/MIT" target="_blank" rel="noopener noreferrer">
            MIT License
          </a>
          .
        </p>
      </div>
    </footer>
  );
};

export default Footer;
