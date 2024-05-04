// AirportWeather.tsx
import { MetarDTO, TafDTO } from 'vfr3d-shared';
import MetarSection from './MetarSection';
import TafSection from './TafSection';
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
      {isLoadingMetar && <div className="text-info">Loading METAR...</div>}
      {metarError && <div className="text-error">{metarError.message}</div>}
      {metar && !metarError && <MetarSection metar={metar} />}

      {isLoadingTaf && <div className="text-info">Loading TAF...</div>}
      {tafError && <div className="text-error">{tafError.message}</div>}
      {taf && !tafError && <TafSection taf={taf} />}
    </div>
  );
};

export default AirportWeather;
