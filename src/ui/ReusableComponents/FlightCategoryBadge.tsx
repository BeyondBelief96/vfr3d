// MetarFlightCategoryBadge.tsx
import React from 'react';
import { MetarDTO } from 'vfr3d-shared';
import { ApiError } from '../../redux/api/types';

interface MetarFlightCategoryBadgeProps {
  metar?: MetarDTO | { error: ApiError };
}

const MetarFlightCategoryBadge: React.FC<MetarFlightCategoryBadgeProps> = ({ metar }) => {
  if (!metar || 'error' in metar) {
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
