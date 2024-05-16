// components/Navigation.tsx
import React from 'react';

const Navigation: React.FC = () => {
  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    event.preventDefault();
    const element = document.querySelector(id);
    if (element) {
      window.scrollTo({
        top: element.getBoundingClientRect().top + window.scrollY,
        behavior: 'smooth',
      });
    }
  };

  return (
    <nav className="p-4 bg-base-200 rounded-box">
      <ul className="menu menu-compact">
        <li>
          <a href="#introduction" onClick={(event) => handleClick(event, '#introduction')}>
            Introduction
          </a>
        </li>
        <li>
          <a href="#getting-started" onClick={(event) => handleClick(event, '#getting-started')}>
            Getting Started
          </a>
        </li>
        <li>
          <a href="#features" onClick={(event) => handleClick(event, '#features')}>
            Features
          </a>
          <ul>
            <li>
              <a href="#search-bar" onClick={(event) => handleClick(event, '#search-bar')}>
                Search Bar
              </a>
            </li>
            <li>
              <a
                href="#imagery-controls"
                onClick={(event) => handleClick(event, '#imagery-controls')}
              >
                Imagery Controls
              </a>
            </li>
            <li>
              <a href="#airports" onClick={(event) => handleClick(event, '#airports')}>
                Airports
              </a>
            </li>
            <li>
              <a
                href="#vfr-navigation-log"
                onClick={(event) => handleClick(event, '#vfr-navigation-log')}
              >
                VFR Navigation Log
              </a>
            </li>
            <li>
              <a
                href="#airspace-visualization"
                onClick={(event) => handleClick(event, '#airspace-visualization')}
              >
                3D Airspace Visualization
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
