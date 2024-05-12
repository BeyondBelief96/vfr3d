export interface Route {
  id: string;
  name?: string;
  routePoints: Waypoint[];
}

export interface Waypoint {
  id: string;
  name?: string;
  latitude: string;
  longitude: string;
  altitude: number;
}
