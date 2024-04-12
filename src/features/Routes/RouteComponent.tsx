import { Color, Entity } from 'cesium';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useCesium } from 'resium';
import { setRouteEntityIds } from '../../redux/slices/entitiesSlice';
import { AppDispatch, RootState } from '../../redux/store';
import { mapAirportDataToCartesian3 } from '../../utility/utils';

const RouteComponent: React.FC = () => {
  const { viewer } = useCesium();
  const dispatch = useDispatch<AppDispatch>();
  const currentRoute = useSelector((state: RootState) => state.route.currentRoute);
  const { lineColor, endPointColor } = useSelector((state: RootState) => state.route);
  const entityRefs = useRef<Record<string, Entity>>({});

  useEffect(() => {
    // Remove existing entities
    Object.values(entityRefs.current).forEach((entity) => {
      if (entity) {
        viewer?.entities.remove(entity);
      }
    });
    entityRefs.current = {};

    if (!viewer || !currentRoute) {
      dispatch(setRouteEntityIds([])); // Clear route entity IDs in the store
      return;
    }

    // Add new route entities
    const { fromAirport, toAirport } = currentRoute;
    const fromPosition = mapAirportDataToCartesian3(fromAirport);
    const toPosition = mapAirportDataToCartesian3(toAirport);

    if (!fromPosition || !toPosition) return;

    // Add polyline entity
    const polylineEntity = viewer.entities.add({
      polyline: {
        positions: [fromPosition, toPosition],
        width: 3,
        material: Color.fromCssColorString(lineColor),
      },
    });

    // Add start and end point entities
    const fromPointEntity = viewer.entities.add({
      position: fromPosition,
      point: { pixelSize: 10, color: Color.fromCssColorString(endPointColor) },
    });
    const toPointEntity = viewer.entities.add({
      position: toPosition,
      point: { pixelSize: 10, color: Color.fromCssColorString(endPointColor) },
    });

    const newRouteEntityIds = [
      `polyline-${fromAirport.GLOBAL_ID}-${toAirport.GLOBAL_ID}`,
      fromAirport.GLOBAL_ID,
      toAirport.GLOBAL_ID,
    ];
    entityRefs.current[`polyline-${fromAirport.GLOBAL_ID}-${toAirport.GLOBAL_ID}`] = polylineEntity;
    entityRefs.current[fromAirport.GLOBAL_ID] = fromPointEntity;
    entityRefs.current[toAirport.GLOBAL_ID] = toPointEntity;

    dispatch(setRouteEntityIds(newRouteEntityIds));
  }, [viewer, currentRoute, dispatch, lineColor, endPointColor]);

  return null;
};

export default RouteComponent;
