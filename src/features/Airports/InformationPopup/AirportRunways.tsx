// AirportRunways.tsx=
import { Airport } from '../../../api/faa-api/faa.dto';

interface AirportRunwaysProps {
  airport: Airport;
}

const AirportRunways: React.FC<AirportRunwaysProps> = ({ airport }) => {
  return (
    <div>
      {/* Display runway information */}
      <p>Runway information goes here.</p>
    </div>
  );
};

export default AirportRunways;
