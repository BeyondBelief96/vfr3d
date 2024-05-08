// AirportHeader.tsx
import MetarFlightCategoryBadge from '../../../ui/ReusableComponents/FlightCategoryBadge';
import { CloseButton } from '../../../ui/ReusableComponents/CloseButton';
import { MetarDTO } from 'vfr3d-shared';
import { Airport } from '../../../redux/api/faa/faa.interface';

interface AirportHeaderProps {
  airport: Airport;
  metar?: MetarDTO;
  handleClose: () => void;
}

const AirportHeader: React.FC<AirportHeaderProps> = ({ airport, metar, handleClose }) => {
  return (
    <div className="px-4 py-2 bg-primary text-primary-content">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <h1 className="text-xl">{airport.ICAO_ID || airport.IDENT}</h1>
          <h2 className="text-xl font-bold">{airport.NAME}</h2>
        </div>

        <div className="flex flex-col items-end">
          {metar && <MetarFlightCategoryBadge metar={metar} />}
          <CloseButton handleClose={handleClose} />
        </div>
      </div>
    </div>
  );
};

export default AirportHeader;
