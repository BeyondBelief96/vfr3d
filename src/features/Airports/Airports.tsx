// VisibleAirports.tsx
import { useEffect, useState } from 'react';
import {
  useGetAirportsByIcaoCodesOrIdentsQuery,
  useGetAirportsByStatesQuery,
} from '../../redux/api/vfr3d/airportsSlice';
import { useGetMetarsByStatesQuery } from '../../redux/api/vfr3d/weatherApi';
import { AppState } from '../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedState, setShowAirports } from '../../redux/slices/airportsSlice';
import AirportEntities from './AirportEntities';
import { useAuthenticatedQuery } from '../../hooks/useAuthenticatedQuery';

const Airports: React.FC = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useAuthenticatedQuery();
  const airportQuery = useSelector((state: AppState) => state.search.airportQuery);
  const { route } = useSelector((state: AppState) => state.route);
  const { showAirports, selectedState } = useSelector((state: AppState) => state.airport);
  const [airportsToQuery, setAirportsToQuery] = useState<string[]>([airportQuery]);
  const [statesToQuery, setStatesToQuery] = useState<string[]>([selectedState]);

  useEffect(() => {
    const potentialAirportsToQuery = route.routePoints
      .map((point) => point.name)
      .filter((name): name is string => name !== undefined);

    setAirportsToQuery([airportQuery, ...potentialAirportsToQuery]);
  }, [airportQuery, route.routePoints]);

  const { data: searchedAirports } = useGetAirportsByIcaoCodesOrIdentsQuery(airportsToQuery, {
    skip: !airportsToQuery,
  });

  const { data: visibleAirports = [], refetch: refetchAirportsByState } =
    useGetAirportsByStatesQuery(statesToQuery, {
      skip: !statesToQuery || !isAuthenticated,
    });

  const {
    data: metarData = [],
    refetch: refetchMetars,
    isFetching: isMetarFetching,
  } = useGetMetarsByStatesQuery(statesToQuery, {
    skip: (!showAirports && !statesToQuery) || !isAuthenticated,
  });

  useEffect(() => {
    const stateCodesFromAirports = searchedAirports?.map((airport) => airport.stateCode) || [];
    const uniqueStateCodes = Array.from(new Set([...stateCodesFromAirports, selectedState]));
    setStatesToQuery(uniqueStateCodes);
  }, [searchedAirports, selectedState]);

  useEffect(() => {
    if (airportQuery) {
      dispatch(setSelectedState(selectedState));
      dispatch(setShowAirports(true));
    }
  }, [dispatch, selectedState, airportQuery]);

  useEffect(() => {
    let intervalId: NodeJS.Timeout | undefined;
    if (showAirports && !isMetarFetching && statesToQuery.length > 0) {
      intervalId = setInterval(() => {
        refetchMetars();
      }, 300000); // 5 minutes in milliseconds
    }
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [refetchMetars, showAirports, isMetarFetching, statesToQuery]);

  useEffect(() => {
    if (isAuthenticated) {
      refetchAirportsByState();
    }
  }, [isAuthenticated, refetchAirportsByState]);

  const metarMap = new Map(
    metarData
      .filter((metar) => metar.stationId !== undefined)
      .map((metar) => [metar.stationId as string, metar])
  );

  if (!showAirports) {
    return null;
  }

  return <AirportEntities airports={visibleAirports} metarMap={metarMap} />;
};

export default Airports;