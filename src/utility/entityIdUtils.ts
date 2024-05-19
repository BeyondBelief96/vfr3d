import { Waypoint } from 'vfr3d-shared';
import { Airport } from '../redux/api/faa/faa.interface';

export const getAirportEntityIdFromAirport = (airport: Airport) => {
  return `airport-${airport.GLOBAL_ID}`;
};
