import { Color } from 'cesium';
import { RoutePoint, RoutePointType } from '../features/Routes/route.types';
import { AirportDTO, Waypoint } from 'vfr3d-shared';

export const convertAirportDMSToDD = (dms: string): number => {
  const hemisphere = dms.slice(-1);
  const [degrees, minutes, seconds] = dms.slice(0, -1).split('-').map(parseFloat);

  let decimalDegrees = degrees + minutes / 60 + seconds / 3600;

  if (hemisphere === 'S' || hemisphere === 'W') {
    decimalDegrees *= -1;
  }

  return decimalDegrees;
};

export function getMetarStationIdFromAirport(airport: AirportDTO): string | undefined {
  const { icaoId, arptId } = airport;

  if (icaoId) {
    return icaoId;
  }

  if (arptId) {
    if (arptId.startsWith('K') || arptId.startsWith('P')) {
      return arptId;
    } else {
      return `K${arptId}`;
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

export function mapAirportsToWaypoints(airports: AirportDTO[]): RoutePoint[] {
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

export const mapAirportToRoutePoint = (airport: AirportDTO): RoutePoint => {
  const routePoint: RoutePoint = {
    id: airport.siteNo,
    name: airport.icaoId || airport.arptId || '',
    latitude: airport.latDecimal ?? 0,
    longitude: airport.longDecimal ?? 0,
    altitude: airport.elev ?? 0,
    shouldDisplay: false,
    type: 'AIRPORT',
  };

  return routePoint;
};
