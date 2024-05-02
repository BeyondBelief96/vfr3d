// AirportInfoPopup.tsx
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MetarDTO, TafDTO } from 'vfr3d-shared';
import { getMetarForAirport, getTafForAirport } from '../../../api/vfr3d-api/vfr3d.api';
import { setSelectedAirport } from '../../../redux/slices/airportsSlice';
import { RootState } from '../../../redux/store';

// Components
import AirportInfo from './AirportInfo';
import AirportWeather from './Weather/AirportWeather';
import AirportRunways from './AirportRunways';

const AirportInfoPopup: React.FC = () => {
  const dispatch = useDispatch();
  const selectedAirport = useSelector((state: RootState) => state.airport.selectedAirport);
  const [metar, setMetar] = useState<MetarDTO | null>(null);
  const [taf, setTaf] = useState<TafDTO | null>(null);
  const [activeTab, setActiveTab] = useState('info');
  const [isLoadingMetar, setIsLoadingMetar] = useState(false);
  const [isLoadingTaf, setIsLoadingTaf] = useState(false);

  useEffect(() => {
    const fetchMetarData = async () => {
      if (selectedAirport) {
        try {
          const icaoCodeOrIdent = selectedAirport.ICAO_ID || selectedAirport.IDENT;
          if (icaoCodeOrIdent) {
            setIsLoadingMetar(true);
            const metarData = await getMetarForAirport(icaoCodeOrIdent);
            setMetar(metarData);
          } else {
            console.error('No ICAO code or IDENT available for the airport.');
          }
        } catch (error) {
          setMetar(null);
          console.error('Error fetching METAR data:', error);
        } finally {
          setIsLoadingMetar(false);
        }
      }
    };

    const fetchTafData = async () => {
      if (selectedAirport) {
        try {
          const icaoCodeOrIdent = selectedAirport.ICAO_ID || selectedAirport.IDENT;
          if (icaoCodeOrIdent) {
            setIsLoadingTaf(true);
            const tafData = await getTafForAirport(icaoCodeOrIdent);
            setTaf(tafData);
          } else {
            console.error('No ICAO code or IDENT available for the airport.');
          }
        } catch (error) {
          setTaf(null);
          console.error('Error fetching TAF data:', error);
        } finally {
          setIsLoadingTaf(false);
        }
      }
    };

    fetchMetarData();
    fetchTafData();
  }, [selectedAirport]);

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
            <button className="btn btn-sm btn-circle btn-ghost" onClick={handleClose}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
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
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AirportInfoPopup;
