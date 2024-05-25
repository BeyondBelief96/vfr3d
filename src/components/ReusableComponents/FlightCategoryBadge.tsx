// MetarFlightCategoryBadge.tsx
import React from 'react';
import { useGetMetarForAirportQuery } from '../../redux/api/vfr3d/weatherApi';
import { Airport } from '../../redux/api/faa/faa.interface';

interface MetarFlightCategoryBadgeProps {
  airport: Airport;
}

const MetarFlightCategoryBadge: React.FC<MetarFlightCategoryBadgeProps> = ({ airport }) => {
  const icaoCodeOrIdent = airport?.ICAO_ID || airport?.IDENT;

  const {
    data: metar,
    isLoading: isLoadingMetar,
    error: metarError,
  } = useGetMetarForAirportQuery(icaoCodeOrIdent || '', {
    skip: !icaoCodeOrIdent,
  });

  if (isLoadingMetar || metarError || !metar) {
    return null;
  }

  let badgeClass = '';
  const textClass = 'text-white';

  switch (metar.flightCategory) {
    case 'VFR':
      badgeClass = 'bg-green-500';
      break;
    case 'MVFR':
      badgeClass = 'bg-blue-500';
      break;
    case 'IFR':
      badgeClass = 'bg-red-500';
      break;
    case 'LIFR':
      badgeClass = 'bg-purple-500';
      break;
    default:
      badgeClass = 'bg-gray-500';
  }

  return (
    <span className={`badge items-center ${badgeClass} ${textClass}`}>{metar.flightCategory}</span>
  );
};

export default MetarFlightCategoryBadge;
