import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import AirportInfo from './AirportInfo';
import AirportWeather from './Weather/AirportWeather';
import {
  useGetMetarForAirportQuery,
  useGetTafForAirportQuery,
} from '../../../redux/api/vfr3d/weatherApi';
import { ApiError } from '../../../redux/api/types';
import EntityInfoPopup from '../../../components/ReusableComponents/EntityInfoPopup';
import AirportHeader from './AirportInfoHeader';
import { Airport } from '../../../redux/api/faa/faa.interface';
import { setSelectedEntity } from '../../../redux/slices/selectedEntitySlice';

interface AirportInfoPopupProps {
  selectedAirport: Airport;
}

const AirportInfoPopup: React.FC<AirportInfoPopupProps> = ({ selectedAirport }) => {
  const dispatch = useDispatch();
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
    dispatch(setSelectedEntity({ entity: null, type: null }));
  };

  if (!selectedAirport) return null;

  const tabs = [
    { id: 'info', label: 'Airport Info' },
    { id: 'weather', label: 'Weather' },
  ];

  const renderContent = (airport: Airport) => {
    switch (activeTab) {
      case 'info':
        return <AirportInfo airport={airport} />;
      case 'weather':
        return (
          <AirportWeather
            metar={metar}
            taf={taf}
            isLoadingMetar={isLoadingMetar}
            isLoadingTaf={isLoadingTaf}
            metarError={metarError as ApiError}
            tafError={tafError as ApiError}
          />
        );
      default:
        return null;
    }
  };

  const renderAirportHeader = (airport: Airport) => (
    <AirportHeader
      airport={airport}
      metar={metar}
      metarError={metarError}
      handleClose={handleClose}
    />
  );

  return (
    <EntityInfoPopup
      selectedEntity={selectedAirport}
      tabs={tabs}
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      renderContent={renderContent}
      renderHeader={renderAirportHeader}
    />
  );
};

export default AirportInfoPopup;
