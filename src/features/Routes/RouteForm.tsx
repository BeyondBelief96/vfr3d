import { useState } from 'react';
import { getAirportByIcaoCode } from '../../api/faa-airports';
import { Airport } from '../../api/types';

interface RouteFormProps {
  onRouteChange: (fromAirport: Airport, toAirport: Airport) => void;
}

const RouteForm: React.FC<RouteFormProps> = ({ onRouteChange }) => {
  const [fromIcaoCode, setFromIcaoCode] = useState('');
  const [toIcaoCode, setToIcaoCode] = useState('');
  const [fromAirportError, setFromAirportError] = useState(false);
  const [toAirportError, setToAirportError] = useState(false);

  const handleFromIcaoCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFromIcaoCode(e.target.value);
    setFromAirportError(false);
  };

  const handleToIcaoCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setToIcaoCode(e.target.value);
    setToAirportError(false);
  };

  const handleRouteSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const fromAirportData = await getAirportByIcaoCode(fromIcaoCode);
      const toAirportData = await getAirportByIcaoCode(toIcaoCode);

      if (!fromAirportData) {
        setFromAirportError(true);
      } else if (!toAirportData) {
        setToAirportError(true);
      } else {
        onRouteChange(fromAirportData, toAirportData);
      }
    } catch (error) {
      console.error('Error fetching airport data:', error);
    }
  };

  return (
    <form onSubmit={handleRouteSubmit} className="mt-4">
      <div className="mb-4">
        <label htmlFor="from-icao-code" className="block mb-2">
          From Airport (ICAO Code)
        </label>
        <input
          id="from-icao-code"
          type="text"
          className={`w-full input input-bordered ${fromAirportError ? 'input-error' : ''}`}
          value={fromIcaoCode}
          onChange={handleFromIcaoCodeChange}
          placeholder="Enter ICAO code"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="to-icao-code" className="block mb-2">
          To Airport (ICAO Code)
        </label>
        <input
          id="to-icao-code"
          type="text"
          className={`w-full input input-bordered ${toAirportError ? 'input-error' : ''}`}
          value={toIcaoCode}
          onChange={handleToIcaoCodeChange}
          placeholder="Enter ICAO code"
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Plot Route
      </button>
    </form>
  );
};

export default RouteForm;
