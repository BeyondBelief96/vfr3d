import { MetarDTO, TafDTO } from 'vfr3d-shared';
import MetarSection from './MetarSection/MetarSection';
import TafSection from './TafSection/TafSection';
import { ApiError } from '../../../../redux/api/types';

interface AirportWeatherProps {
  metar?: MetarDTO;
  taf?: TafDTO;
  isLoadingMetar: boolean;
  isLoadingTaf: boolean;
  metarError?: ApiError;
  tafError?: ApiError;
}

const AirportWeather: React.FC<AirportWeatherProps> = ({
  metar,
  taf,
  isLoadingMetar,
  isLoadingTaf,
  metarError,
  tafError,
}) => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="mb-4 text-2xl font-bold">METAR</h2>
        {isLoadingMetar && (
          <div className="flex items-center space-x-2">
            <div className="loading loading-spinner text-primary"></div>
            <span>Loading METAR...</span>
          </div>
        )}
        {metarError && (
          <div className="p-4 bg-error text-error-content">
            <span>{metarError.message}</span>
          </div>
        )}
        {metar && !metarError && <MetarSection metar={metar} />}
      </div>
      <div className="divider"></div>
      <div>
        <h2 className="mb-4 text-2xl font-bold">TAF</h2>
        {isLoadingTaf && (
          <div className="flex items-center space-x-2">
            <div className="loading loading-spinner text-primary"></div>
            <span>Loading TAF...</span>
          </div>
        )}
        {tafError && (
          <div className="p-4 bg-error text-error-content">
            <span>{tafError.message}</span>
          </div>
        )}
        {taf && !tafError && <TafSection taf={taf} />}
      </div>
    </div>
  );
};

export default AirportWeather;
