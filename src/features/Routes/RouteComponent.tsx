import { useSelector } from 'react-redux';
import { Color } from 'cesium';
import { AppState } from '../../redux/store';
import { PointEntity } from '../../ui/ReusableComponents/cesium/PointEntity';
import { PolylineEntity } from '../../ui/ReusableComponents/cesium/PolylineEntity';
import { mapAirportDataToCartesian3 } from '../../utility/cesiumUtils';

const RouteComponent: React.FC = () => {
  const routePoints = useSelector((state: AppState) => state.route.routePoints);
  const { lineColor, pointColor: endPointColor } = useSelector((state: AppState) => state.route);

  return (
    <>
      {routePoints.map((point) => {
        const position = mapAirportDataToCartesian3(point);
        if (!position) return null;

        return (
          <PointEntity
            key={point.GLOBAL_ID}
            position={position}
            color={Color.fromCssColorString(endPointColor)}
            id={`route-point-${point.GLOBAL_ID}`}
          />
        );
      })}

      {routePoints.map((point, index) => {
        if (index === 0) return null;

        const prevPoint = routePoints[index - 1];
        const prevPosition = mapAirportDataToCartesian3(prevPoint);
        const currPosition = mapAirportDataToCartesian3(point);

        if (!prevPosition || !currPosition) return null;

        const polylineId = `route-polyline-${prevPoint.GLOBAL_ID}-${point.GLOBAL_ID}`;

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
