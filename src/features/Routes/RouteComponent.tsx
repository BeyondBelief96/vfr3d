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
  const navlog = useSelector((state: AppState) => state.navlog.navlog);
  const isNavlogReady = useSelector((state: AppState) => state.navlog.isNavlogReady);
  const renderPoints = isNavlogReady
    ? navlog.legs.flatMap((leg) => [leg.legStartPoint, leg.legEndPoint])
    : routePoints;
  return (
    <>
      {renderPoints?.map((point: Waypoint, index: number) => {
        const position = mapWaypointToCartesian3(point);
        if (!position) return null;
        const isStartPoint = index % 2 === 0;
        const legIndex = isStartPoint ? index / 2 : (index - 1) / 2;
        const legId = `leg-${legIndex}`;

        const entityKey = `${point.id}-${legId}-${isStartPoint ? 'start' : 'end'}`;
        return (
          <PointEntity
            key={entityKey}
            position={position}
            color={Color.fromCssColorString(endPointColor)}
            id={`route-point-${entityKey}`}
          />
        );
      })}

      {renderPoints?.map((point: Waypoint, index: number) => {
        if (index === 0) return null;

        const prevPoint = renderPoints[index - 1];
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
