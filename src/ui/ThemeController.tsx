import { useEffect, useState } from 'react';

const ThemeController: React.FC = () => {
  const [selectedTheme, setSelectedTheme] = useState('business');

  const handleThemeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedTheme(event.target.value);
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', selectedTheme);
  }, [selectedTheme]);

  return (
    <div className="dropdown">
      <div tabIndex={0} role="button" className="m-1 mr-5 btn btn-info">
        Theme
        <svg
          width="12px"
          height="12px"
          className="inline-block w-2 h-2 fill-current opacity-60"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 2048 2048"
        >
          <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
        </svg>
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content z-[1] p-2 shadow-2xl bg-base-300 rounded-box w-28"
      >
        <li>
          <input
            type="radio"
            name="theme-dropdown"
            className="justify-start theme-controller btn btn-sm btn-block btn-ghost"
            aria-label="Business"
            value="business"
            checked={selectedTheme === 'Business'}
            onChange={handleThemeChange}
          />
        </li>
        <li>
          <input
            type="radio"
            name="theme-dropdown"
            className="justify-start theme-controller btn btn-sm btn-block btn-ghost"
            aria-label="Coffee"
            value="coffee"
            checked={selectedTheme === 'Coffee'}
            onChange={handleThemeChange}
          />
        </li>
        <li>
          <input
            type="radio"
            name="theme-dropdown"
            className="justify-start theme-controller btn btn-sm btn-block btn-ghost"
            aria-label="Dim"
            value="Dim"
            checked={selectedTheme === 'Dim'}
            onChange={handleThemeChange}
          />
        </li>
      </ul>
    </div>
  );
};

export default ThemeController;
