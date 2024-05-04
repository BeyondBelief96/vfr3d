import { Airport } from '../../api/faa-api/faa.dto';

export interface Route {
  id: number;
  fromAirport: Airport;
  toAirport: Airport;
}
