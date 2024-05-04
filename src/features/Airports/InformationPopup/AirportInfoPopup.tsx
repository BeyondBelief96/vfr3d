// AirportInfoPopup.tsx
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedAirport } from '../../../redux/slices/airportsSlice';
import { RootState } from '../../../redux/store';

// Components
import AirportInfo from './AirportInfo';
import AirportWeather from './Weather/AirportWeather';
import MetarFlightCategoryBadge from '../../../ui/ReusableComponents/FlightCategoryBadge';
import {
  useGetMetarForAirportQuery,
  useGetTafForAirportQuery,
} from '../../../redux/api/vfr3d/weatherApi';
import { CloseButton } from '../../../ui/ReusableComponents/CloseButton';
import { ApiError } from '../../../redux/api/types';

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
        <div className="px-4 py-2 bg-primary text-primary-content">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">{selectedAirport.NAME}</h2>
            <div className="flex flex-col items-end">
              {metar && <MetarFlightCategoryBadge metar={metar} />}
              <CloseButton handleClose={handleClose} />
            </div>
          </div>
        </div>
        <div className="tabs tabs-boxed bg-base-200">
          <a
            className={`tab ${activeTab === 'info' ? 'tab-active' : ''}`}
            onClick={() => setActiveTab('info')}
          >
            Info
          </a>
          <a
            className={`tab ${activeTab === 'weather' ? 'tab-active' : ''}`}
            onClick={() => setActiveTab('weather')}
          >
            Weather
          </a>
        </div>
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
