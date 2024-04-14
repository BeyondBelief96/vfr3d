import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setSearchAirportQuery } from '../redux/slices/searchSlice';

const SearchBar = () => {
  const dispatch = useDispatch();

  const handleSearch = useCallback(
    (searchQuery: string) => {
      dispatch(setSearchAirportQuery(searchQuery));
    },
    [dispatch]
  );

  return (
    <div className="flex items-center">
      <div className="relative rounded-lg form-control">
        <div className="input-group">
          <input
            type="text"
            placeholder="Enter ICAO code"
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full pr-10 input input-bordered"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 text-gray-400"
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
