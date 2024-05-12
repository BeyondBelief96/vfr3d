import { useSelector } from 'react-redux';
import { Color } from 'cesium';
import { AppState } from '../../redux/store';
import { PointEntity } from '../../ui/ReusableComponents/cesium/PointEntity';
import { PolylineEntity } from '../../ui/ReusableComponents/cesium/PolylineEntity';
import { mapWaypointToCartesian3 } from '../../utility/cesiumUtils';
import { Waypoint } from 'vfr3d-shared';

const RouteComponent: React.FC = () => {
  const routePoints = useSelector((state: AppState) => state.route.route?.routePoints);
  const { lineColor, pointColor: endPointColor } = useSelector((state: AppState) => state.route);
  return (
    <>
      {routePoints?.map((point: Waypoint) => {
        const position = mapWaypointToCartesian3(point);
        if (!position) return null;

        return (
          <PointEntity
            key={point.id}
            position={position}
            color={Color.fromCssColorString(endPointColor)}
            id={`route-point-${point.id}`}
          />
        );
      })}

      {routePoints?.map((point: Waypoint, index: number) => {
        if (index === 0) return null;

        const prevPoint = routePoints[index - 1];
        const prevPosition = mapWaypointToCartesian3(prevPoint);
        const currPosition = mapWaypointToCartesian3(point);

        if (!prevPosition || !currPosition) return null;

        const polylineId = `route-polyline-${prevPoint.id}-${point.id}`;

        return (
          <PolylineEntity
            key={polylineId}
            positions={[prevPosition, currPosition]}
            color={Color.fromCssColorString(lineColor)}
            id={polylineId}
          />
        );
      })}
    </>
  );
};

export default RouteComponent;
