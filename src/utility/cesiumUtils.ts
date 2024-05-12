import { Cartesian3, Math, Viewer } from 'cesium';
import { Airport } from '../redux/api/faa/faa.interface';
import { convertDMSToDD } from './utils';
import { Waypoint } from 'vfr3d-shared';

export const flyToPoint = (viewer: Viewer | undefined, point: Cartesian3) => {
  if (point && viewer) {
    viewer.camera.setView({
      destination: point,
      orientation: {
        heading: Math.toRadians(0),
        pitch: Math.toRadians(-90),
        roll: 0,
      },
    });
    viewer.camera.moveBackward(100000);
  }
};

export const mapAirportDataToCartesian3 = (airport: Airport): Cartesian3 | null => {
  const longitude = convertDMSToDD(airport.LONGITUDE);
  const latitude = convertDMSToDD(airport.LATITUDE);
  const elevation = 0;

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

export const mapWaypointToCartesian3 = (waypoint: Waypoint): Cartesian3 | null => {
  const longitude = convertDMSToDD(waypoint.longitude.toString());
  const latitude = convertDMSToDD(waypoint.latitude.toString());
  const elevation = waypoint.altitude;

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
