import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedAirport } from '../../../redux/slices/airportsSlice';
import { AppState } from '../../../redux/store';
import AirportInfo from './AirportInfo';
import AirportWeather from './Weather/AirportWeather';
import {
  useGetMetarForAirportQuery,
  useGetTafForAirportQuery,
} from '../../../redux/api/vfr3d/weatherApi';
import { ApiError } from '../../../redux/api/types';
import AirportHeader from './AirportInfoHeader';
import Tabs from '../../../ui/ReusableComponents/Tabs';

const AirportInfoPopup: React.FC = () => {
  const dispatch = useDispatch();
  const selectedAirport = useSelector((state: AppState) => state.airport.selectedAirport);
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

  const tabs = [
    { id: 'info', label: 'Airport Info' },
    { id: 'weather', label: 'Weather' },
  ];

  return (
    <div className="fixed top-0 bottom-0 sm:bottom-10 sm:right-4 sm:top-auto sm:transform-none w-full sm:w-96 h-screen sm:h-[calc(80vh)] bg-base-100 rounded-lg overflow-hidden shadow-lg">
      <div className="flex flex-col h-full">
        <AirportHeader airport={selectedAirport} metar={metar} handleClose={handleClose} />
        <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
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
