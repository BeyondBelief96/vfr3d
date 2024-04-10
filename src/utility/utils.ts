import { Cartesian3, Ellipsoid } from 'cesium';
import { Airport } from '../api/types';

export const mapAirportDataToCartesian3 = (airport: Airport): Cartesian3 | undefined => {
  if (airport.latitudeAirport && airport.longitudeAirport) {
    return Cartesian3.fromDegrees(
      airport.longitudeAirport,
      airport.latitudeAirport,
      0,
      Ellipsoid.WGS84
    );
  }

  return undefined;
};
