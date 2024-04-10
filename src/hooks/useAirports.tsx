import { useEffect, useState } from 'react';
import { getAirportsByCountryCode } from '../api/aviation-edge';
import { Airport } from '../api/types';

const useAirportsCountry = (iataCountryCode: string) => {
  const [airports, setAirports] = useState<Airport[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchAirportsByCountryCode = async () => {
      try {
        const airportData = await getAirportsByCountryCode(iataCountryCode);
        setAirports(() => [...airportData]);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(error as Error);
      }
    };

    fetchAirportsByCountryCode();
  }, [iataCountryCode]);

  return { airports, loading, error };
};

export default useAirportsCountry;
