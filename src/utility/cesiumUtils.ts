import { Cartesian3, Cartographic, Math as CesiumMath, Viewer } from 'cesium';
import { Airport } from '../redux/api/faa/faa.interface';
import { convertAirportDMSToDD } from './utils';
import { Pirep, Waypoint } from 'vfr3d-shared';

export const flyToPoint = (viewer: Viewer | undefined, point: Cartesian3) => {
  if (point && viewer) {
    viewer.camera.setView({
      destination: point,
      orientation: {
        heading: CesiumMath.toRadians(0),
        pitch: CesiumMath.toRadians(-90),
        roll: 0,
      },
    });
    viewer.camera.moveBackward(100000);
  }
};

export const mapAirportDataToCartesian3 = (airport: Airport): Cartesian3 | null => {
  const longitude = convertAirportDMSToDD(airport.LONGITUDE);
  const latitude = convertAirportDMSToDD(airport.LATITUDE);
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

export const mapPirepToCartesian3 = (pirep: Pirep): Cartesian3 | null => {
  if (!pirep.latitude || !pirep.longitude) return null;
  const longitude = pirep.longitude;
  const latitude = pirep.latitude;
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
  return Cartesian3.fromDegrees(waypoint.longitude, waypoint.latitude, waypoint.altitude);
};

export const mapWaypointToCartesian3Flat = (waypoint: Waypoint): Cartesian3 | null => {
  return Cartesian3.fromDegrees(waypoint.longitude, waypoint.latitude);
};

export const isSameLocationWaypointCartesian = (
  cartesian: Cartesian3,
  waypoint: Waypoint
): boolean => {
  if (!cartesian || !waypoint) {
    return false;
  }

  const cartographic = Cartographic.fromCartesian(cartesian);

  const cartesianLatitude = CesiumMath.toDegrees(cartographic.latitude);
  const cartesianLongitude = CesiumMath.toDegrees(cartographic.longitude);

  const epsilon = 0.0000001; // Adjust the tolerance as needed

  const latitudeDifference = Math.abs(cartesianLatitude - waypoint.latitude);
  const longitudeDifference = Math.abs(cartesianLongitude - waypoint.longitude);

  return latitudeDifference < epsilon && longitudeDifference < epsilon;
};
