import { Cartesian3 } from 'cesium';
import { Airport } from '../api/types';

const convertDMSToDecimal = (dms: string): number => {
  const hemisphere = dms.slice(-1);
  const [degrees, minutes, seconds] = dms.slice(0, -1).split('-').map(parseFloat);

  let decimalDegrees = degrees + minutes / 60 + seconds / 3600;

  if (hemisphere === 'S' || hemisphere === 'W') {
    decimalDegrees *= -1;
  }

  return decimalDegrees;
};

export const mapAirportDataToCartesian3 = (airport: Airport): Cartesian3 | null => {
  const longitude = convertDMSToDecimal(airport.LONGITUDE);
  const latitude = convertDMSToDecimal(airport.LATITUDE);
  const elevation = airport.ELEVATION;

  if (
    longitude === null ||
    latitude === null ||
    elevation === null ||
    isNaN(latitude) ||
    isNaN(longitude) ||
    isNaN(elevation)
  ) {
    return null;
  }

  return Cartesian3.fromDegrees(longitude, latitude, elevation);
};
