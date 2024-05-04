// AirportInfoPopup.tsx
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedAirport } from '../../../redux/slices/airportsSlice';
import { RootState } from '../../../redux/store';
import AirportInfo from './AirportInfo';
import AirportWeather from './Weather/AirportWeather';
import {
  useGetMetarForAirportQuery,
  useGetTafForAirportQuery,
} from '../../../redux/api/vfr3d/weatherApi';
import { ApiError } from '../../../redux/api/types';
import AirportHeader from './AirportInfoHeader';
import AirportTabs from './AirportInfoTabs';

const AirportInfoPopup: React.FC = () => {
  const dispatch = useDispatch();
  const selectedAirport = useSelector((state: RootState) => state.airport.selectedAirport);
  const [activeTab, setActiveTab] = useState('info');
  const icaoCodeOrIdent = selectedAirport?.ICAO_ID || selectedAirport?.IDENT;

  const {
    data: metar,
    isLoading: isLoadingMetar,
    error: metarError,
    refetch: refetchMetar,
  } = useGetMetarForAirportQuery(icaoCodeOrIdent || '', {
    skip: !icaoCodeOrIdent,
  });

  const {
    data: taf,
    isLoading: isLoadingTaf,
    error: tafError,
    refetch: refetchTaf,
  } = useGetTafForAirportQuery(icaoCodeOrIdent || '', {
    skip: !icaoCodeOrIdent,
  });

  useEffect(() => {
    if (selectedAirport) {
      refetchMetar();
      refetchTaf();
    }
  }, [selectedAirport, refetchMetar, refetchTaf]);

  const handleClose = () => {
    dispatch(setSelectedAirport(null));
  };

  if (!selectedAirport) return null;

  return (
    <div className="fixed top-1/2 right-4 transform -translate-y-1/2 w-96 h-[calc(50vh)] bg-base-100 rounded-lg shadow-lg overflow-hidden">
      <div className="flex flex-col h-full">
        <AirportHeader airport={selectedAirport} metar={metar} handleClose={handleClose} />
        <AirportTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="flex-1 p-4 overflow-y-auto">
          {activeTab === 'info' && <AirportInfo airport={selectedAirport} />}
          {activeTab === 'weather' && (
            <AirportWeather
              metar={metar}
              taf={taf}
              isLoadingMetar={isLoadingMetar}
              isLoadingTaf={isLoadingTaf}
              metarError={metarError as ApiError}
              tafError={tafError as ApiError}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AirportInfoPopup;
