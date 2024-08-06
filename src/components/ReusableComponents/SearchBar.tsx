import Fuse from 'fuse.js';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAuthenticatedQuery } from '../../hooks/useAuthenticatedQuery';
import { setSearchAirportQuery, triggerSearch } from '../../redux/slices/searchSlice';
import { fetchAdditionalAirports } from '../../redux/thunks/airports';
import { useGetAllAirportsQuery } from '../../redux/api/vfr3d/airportsSlice.api';

const SearchBar = () => {
  const { isAuthenticated } = useAuthenticatedQuery();
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState('');
  const [showAutocomplete, setShowAutocomplete] = useState(false);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(-1);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const {
    data: allAirports,
    isLoading,
    isError,
  } = useGetAllAirportsQuery(searchQuery ?? 'KJW', {
    skip: !isAuthenticated,
  });
  console.log(isError);

  useEffect(() => {
    if (isAuthenticated && searchQuery.length > 1) {
      //@ts-expect-error for some reason, typescript isn't liking the dispatching of thunks
      dispatch(fetchAdditionalAirports(searchQuery));
    }
  }, [searchQuery, dispatch, isAuthenticated]);

  const fuse = useMemo(() => {
    return new Fuse(allAirports ?? [], { keys: ['icaoId', 'arptId'], threshold: 0.3 });
  }, [allAirports]);

  const filteredAirports = useMemo(() => {
    return searchQuery ? fuse.search(searchQuery).map((result) => result.item) : [];
  }, [searchQuery, fuse]);

  const handleSearch = useCallback(() => {
    dispatch(setSearchAirportQuery(searchQuery));
    dispatch(triggerSearch());
    setSearchQuery('');
    setShowAutocomplete(false);
  }, [dispatch, searchQuery]);

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const query = event.target.value;
      setSearchQuery(query);
      setShowAutocomplete(query.length > 0);
    },
    [setSearchQuery]
  );

  const handleAutocompleteSelect = useCallback(
    (airportCode: string) => {
      setSearchQuery(airportCode);
      setShowAutocomplete(false);
      setSelectedOptionIndex(-1);
      dispatch(setSearchAirportQuery(airportCode));
      dispatch(triggerSearch());
    },
    [dispatch]
  );

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter' && searchInputRef.current === event.target) {
        if (selectedOptionIndex !== -1) {
          const selectedAirport = filteredAirports[selectedOptionIndex];
          handleAutocompleteSelect(selectedAirport.icaoId || selectedAirport.arptId || '');
        } else {
          handleSearch();
        }
        setShowAutocomplete(false);
      } else if (event.key === 'ArrowUp') {
        event.preventDefault();
        setSelectedOptionIndex((prevIndex) =>
          prevIndex <= 0 ? filteredAirports.length - 1 : prevIndex - 1
        );
      } else if (event.key === 'ArrowDown' || event.key === 'Tab') {
        event.preventDefault();
        setSelectedOptionIndex((prevIndex) =>
          prevIndex === filteredAirports.length - 1 ? 0 : prevIndex + 1
        );
      }
    },
    [filteredAirports, handleAutocompleteSelect, handleSearch, selectedOptionIndex]
  );

  return (
    <div className="flex items-center ">
      <div className="relative rounded-lg form-control">
        <div className="input-group">
          <input
            type="text"
            placeholder="Enter ICAO code"
            value={searchQuery}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            className={`w-44 sm:w-full pr-10 input input-bordered ${isError ? 'input-error' : ''}`}
            ref={searchInputRef}
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            {isLoading ? (
              <svg
                className="w-5 h-5 text-gray-400 animate-spin"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            ) : (
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
            )}
          </div>
        </div>

        {showAutocomplete && filteredAirports.length > 0 && (
          <ul className="absolute z-50 w-full mt-10 overflow-y-auto rounded-md shadow-lg border-base-content bg-base-100 max-h-60">
            {filteredAirports.map((airport, index) => (
              <li
                key={airport.siteNo}
                className={`px-4 py-2 cursor-pointer ${
                  index === selectedOptionIndex
                    ? 'bg-primary text-primary-content'
                    : 'hover:bg-primary'
                }`}
                onClick={() => handleAutocompleteSelect(airport.icaoId || airport.arptId || '')}
              >
                {airport.icaoId || airport.arptId || ''} - {airport.arptName}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
