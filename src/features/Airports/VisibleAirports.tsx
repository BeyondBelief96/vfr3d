// VisibleAirports.tsx
import { useEffect } from 'react';
import AirportEntity from './AirportEntity';
import { getMetarStationIdFromAirport } from '../../utility/utils';
import { useGetAirportsByStateQuery } from '../../redux/api/faa/faaApi';
import { useGetMetarsByStateQuery } from '../../redux/api/vfr3d/weatherApi';
import { RootState } from '../../redux/store';
import { useSelector } from 'react-redux';

const VisibleAirports: React.FC = () => {
  const { showAirports, selectedState, refetchMETARs } = useSelector(
    (state: RootState) => state.airport
  );

  const { data: visibleAirports = [] } = useGetAirportsByStateQuery(selectedState, {
    skip: !showAirports,
  });

  const { data: metarData = [], refetch: refetchMetars } = useGetMetarsByStateQuery(selectedState, {
    skip: !showAirports,
  });

  useEffect(() => {
    if (refetchMETARs) {
      refetchMetars();
    }

    const intervalId = setInterval(() => {
      if (showAirports) {
        refetchMetars();
      }
    }, 300000);

    return () => {
      clearInterval(intervalId);
    };
  }, [refetchMETARs, refetchMetars, showAirports]);

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
