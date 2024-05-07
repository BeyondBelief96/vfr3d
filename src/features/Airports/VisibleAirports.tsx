// VisibleAirports.tsx
import { useEffect } from 'react';
import AirportEntity from './AirportEntity';
import { getMetarStationIdFromAirport } from '../../utility/utils';
import {
  useGetAirportByIcaoCodeOrIdentQuery,
  useGetAirportsByStateQuery,
} from '../../redux/api/faa/faaApi';
import { useGetMetarsByStateQuery } from '../../redux/api/vfr3d/weatherApi';
import { RootState } from '../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedState, setShowAirports } from '../../redux/slices/airportsSlice';

const VisibleAirports: React.FC = () => {
  const dispatch = useDispatch();
  const airportQuery = useSelector((state: RootState) => state.search.airportQuery);
  const { showAirports, selectedState, selectedAirport, refetchMETARs } = useSelector(
    (state: RootState) => state.airport
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

  const metarMap = new Map(metarData.map((metar) => [metar.stationId, metar]));

  if (!showAirports) {
    return null;
  }

  return (
    <>
      {visibleAirports.map((airport) => {
        const stationId = getMetarStationIdFromAirport(airport);
        let metar;
        if (stationId) {
          metar = metarMap.get(stationId);
        }
        return <AirportEntity key={airport.GLOBAL_ID} airport={airport} metar={metar} />;
      })}
    </>
  );
};

export default VisibleAirports;
