import { useCallback, useEffect, useRef, useState } from 'react';
import useSearchAndFlyTo from '../hooks/useSearchAndFlyTo';

const SearchBar = () => {
  const [icaoCode, setIcaoCode] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const searchAndFlyTo = useSearchAndFlyTo();

  const handleSearch = useCallback(async () => {
    searchAndFlyTo(icaoCode);
  }, [searchAndFlyTo, icaoCode]);

  useEffect(() => {
    const handleKeyDown = async (e: KeyboardEvent) => {
      if (e.key === 'Enter' && document.activeElement === inputRef.current) {
        await handleSearch();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleSearch]);
  return (
    <div className="absolute z-10 flex flex-col items-center sm:flex-row top-3 left-4 right-4 sm:right-auto">
      <label className="mt-2 mb-2 text-white sm:mb-0 sm:mr-2 label">
        Search for Airport (ICAO Code):
      </label>
      <div className="rounded-lg form-control">
        <div className="input-group">
          <input
            ref={inputRef}
            type="text"
            placeholder="Enter ICAO code"
            value={icaoCode}
            onChange={(e) => setIcaoCode(e.target.value)}
            className="input input-bordered"
          />
          <button
            onClick={handleSearch}
            className="relative rounded-lg top-1.5 left-2 btn btn-square"
          >
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
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
