// AirportWeather.tsx

import { MetarDTO, TafDTO } from 'vfr3d-shared';
import MetarSection from './MetarSection';
import TafSection from './TafSection';

interface AirportWeatherProps {
  metar: MetarDTO | null;
  taf: TafDTO | null;
  isLoadingMetar: boolean;
  isLoadingTaf: boolean;
}

const AirportWeather: React.FC<AirportWeatherProps> = ({
  metar,
  taf,
  isLoadingMetar,
  isLoadingTaf,
}) => {
  return (
    <div className="space-y-8">
      <MetarSection metar={metar} isLoadingMetar={isLoadingMetar} />
      <TafSection taf={taf} isLoadingTaf={isLoadingTaf} />
    </div>
  );
};

export default AirportWeather;
