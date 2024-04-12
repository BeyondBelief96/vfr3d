import { Airport } from '../../api/types';

export interface Route {
  id: number;
  fromAirport: Airport;
  toAirport: Airport;
}
