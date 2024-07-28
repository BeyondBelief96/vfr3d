import { Color } from 'cesium';
import { Airport } from '../redux/api/faa/faa.interface';
import { RoutePoint, RoutePointType } from '../features/Routes/route.types';
import { Waypoint } from 'vfr3d-shared';

export const convertAirportDMSToDD = (dms: string): number => {
  const hemisphere = dms.slice(-1);
  const [degrees, minutes, seconds] = dms.slice(0, -1).split('-').map(parseFloat);

  let decimalDegrees = degrees + minutes / 60 + seconds / 3600;

  if (hemisphere === 'S' || hemisphere === 'W') {
    decimalDegrees *= -1;
  }

  return decimalDegrees;
};

export function getMetarStationIdFromAirport(airport: Airport): string | undefined {
  const { ICAO_ID, IDENT } = airport;

  if (ICAO_ID) {
    return ICAO_ID;
  }

  if (IDENT) {
    if (IDENT.startsWith('K') || IDENT.startsWith('P')) {
      return IDENT;
    } else {
      return `K${IDENT}`;
    }
  }

  return undefined;
}

export const colorSerializer = {
  serialize: (color: Color) => {
    return {
      red: color.red,
      green: color.green,
      blue: color.blue,
      alpha: color.alpha,
    };
  },
  deserialize: (colorData: Record<string, number>) => {
    return new Color(colorData.red, colorData.green, colorData.blue, colorData.alpha);
  },
};

export function mapAirportsToWaypoints(airports: Airport[]): RoutePoint[] {
  const waypoints: RoutePoint[] = [];
  for (let i = 0; i < airports.length - 1; i++) {
    const waypoint = mapAirportToRoutePoint(airports[i]);
    waypoints.push(waypoint);
  }

  return waypoints;
}

export function mapWaypointToRoutePoint(
  waypoint: Waypoint,
  shouldDisplay: boolean,
  type: RoutePointType
): RoutePoint {
  const routePoint: RoutePoint = {
    ...waypoint,
    shouldDisplay,
    type,
  };

  return routePoint;
}

export const mapAirportToRoutePoint = (airport: Airport): RoutePoint => {
  const routePoint: RoutePoint = {
    id: airport.GLOBAL_ID,
    name: airport.ICAO_ID || airport.IDENT,
    latitude: convertAirportDMSToDD(airport.LATITUDE),
    longitude: convertAirportDMSToDD(airport.LONGITUDE),
    altitude: airport.ELEVATION,
    shouldDisplay: false,
    type: 'AIRPORT',
  };

  return routePoint;
};
