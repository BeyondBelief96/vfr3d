import { Waypoint } from 'vfr3d-shared';

export interface Route {
  id: string;
  name?: string;
  routePoints: RoutePoint[];
}

export type RoutePointType = 'AIRPORT' | 'CUSTOM_WAYPOINT';

export interface RoutePoint extends Waypoint {
  type: RoutePointType;
  shouldDisplay: boolean;
}
