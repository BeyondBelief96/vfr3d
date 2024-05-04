import { Airport } from '../../redux/api/faa/faa.interface';

export interface Route {
  id: number;
  fromAirport: Airport;
  toAirport: Airport;
}
