import { Cartesian3, Cartographic, Math as CesiumMath, Viewer } from 'cesium';
import { AirportDTO, PirepDTO, Waypoint } from 'vfr3d-shared';

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

export const convertToCartesian3 = (
  longitude: number | null,
  latitude: number | null,
  elevation: number = 0
): Cartesian3 | null => {
  if (
    longitude === null ||
    latitude === null ||
    isNaN(latitude) ||
    isNaN(longitude) ||
    isNaN(elevation)
  ) {
    return null;
  }
  return Cartesian3.fromDegrees(longitude, latitude, elevation);
};

export const mapAirportDataToCartesian3 = (airport: AirportDTO): Cartesian3 | null => {
  const longitude = airport.longDecimal;
  const latitude = airport.latDecimal;

  if (latitude && longitude) {
    return convertToCartesian3(longitude, latitude);
  }

  return null;
};

export const mapPirepToCartesian3 = (pirep: PirepDTO): Cartesian3 | null => {
  if (!pirep.latitude || !pirep.longitude) return null;
  return convertToCartesian3(pirep.longitude, pirep.latitude, pirep.altitudeFtMsl);
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

export function calculateMenuPosition(
  x: number,
  y: number,
  menuWidth: number,
  menuHeight: number,
  offsetX: number = 0,
  offsetY: number = 0
): { left: number; top: number } {
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  // Apply offsets
  let left = x + offsetX;
  let top = y + offsetY;

  // Adjust horizontal position if menu goes off the right edge
  if (left + menuWidth > viewportWidth) {
    left = Math.max(0, viewportWidth - menuWidth);
  }

  // Adjust horizontal position if menu goes off the left edge
  if (left < 0) {
    left = 0;
  }

  // Adjust vertical position if menu goes off the bottom edge
  if (top + menuHeight > viewportHeight) {
    top = Math.max(0, viewportHeight - menuHeight);
  }

  // Adjust vertical position if menu goes off the top edge
  if (top < 0) {
    top = 0;
  }

  return { left, top };
}
