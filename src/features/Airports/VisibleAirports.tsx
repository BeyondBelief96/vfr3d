// VisibleAirports.tsx
import { useEffect } from 'react';
import {
  useGetAirportByIcaoCodeOrIdentQuery,
  useGetAirportsByStateQuery,
} from '../../redux/api/faa/faaApi';
import { useGetMetarsByStateQuery } from '../../redux/api/vfr3d/weatherApi';
import { AppState } from '../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedState, setShowAirports } from '../../redux/slices/airportsSlice';
import AirportEntities from './AirportEntities';

const VisibleAirports: React.FC = () => {
  const dispatch = useDispatch();
  const airportQuery = useSelector((state: AppState) => state.search.airportQuery);
  const { showAirports, selectedState, selectedAirport, refetchMETARs } = useSelector(
    (state: AppState) => state.airport
  );

  const { data: searchedAirport } = useGetAirportByIcaoCodeOrIdentQuery(airportQuery, {
    skip: !airportQuery,
  });

  const { data: visibleAirports = [] } = useGetAirportsByStateQuery(selectedState, {
    skip: !showAirports,
  });

  const {
    data: metarData = [],
    refetch: refetchMetars,
    isFetching: isMetarFetching,
  } = useGetMetarsByStateQuery(selectedState, {
    skip: !showAirports,
  });

  useEffect(() => {
    if (searchedAirport) {
      dispatch(setSelectedState(searchedAirport.STATE));
      dispatch(setShowAirports(true));
    }
  }, [dispatch, searchedAirport]);

  useEffect(() => {
    if (refetchMETARs && showAirports && !isMetarFetching) {
      refetchMetars();
    }
  }, [refetchMETARs, refetchMetars, showAirports, selectedAirport, isMetarFetching]);

  useEffect(() => {
    let intervalId: NodeJS.Timeout | undefined;

    if (showAirports && !isMetarFetching) {
      intervalId = setInterval(() => {
        refetchMetars();
      }, 300000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [refetchMetars, showAirports, isMetarFetching]);

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

export default VisibleAirports;
