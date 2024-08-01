// AirportHeader.tsx
import MetarFlightCategoryBadge from '../../../components/ReusableComponents/FlightCategoryBadge';
import { CloseButton } from '../../../components/ReusableComponents/CloseButton';
import { AirportDTO, MetarDTO } from 'vfr3d-shared';
import { ApiError } from '../../../redux/api/types';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';

interface AirportHeaderProps {
  airport: AirportDTO;
  metar?: MetarDTO | { error: ApiError };
  metarError: FetchBaseQueryError | SerializedError | undefined;
  handleClose: () => void;
}

const AirportHeader: React.FC<AirportHeaderProps> = ({
  airport,
  metar,
  metarError,
  handleClose,
}) => {
  const hasValidMetar = metar && !metarError;

  return (
    <div className="px-4 py-2 bg-primary text-primary-content">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <h1 className="text-xl">{airport.icaoId || airport.arptId || ''}</h1>
          <h2 className="text-xl font-bold">{airport.arptName}</h2>
        </div>
        <div className="flex flex-col items-end">
          {hasValidMetar && <MetarFlightCategoryBadge airport={airport} />}
          <CloseButton handleClose={handleClose} />
        </div>
      </div>
    </div>
  );
};

export default AirportHeader;
