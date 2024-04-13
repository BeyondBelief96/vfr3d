import { Entity, ScreenSpaceEventHandler, ScreenSpaceEventType } from 'cesium';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useCesium } from 'resium';
import { setRouteEntityIds } from '../../redux/slices/entitiesSlice';
import { AppDispatch, RootState } from '../../redux/store';
import {
  addPointToPolyline,
  createPointEntity,
  createPolylineEntity,
  removeEntities,
} from '../../utility/routeUtils';
import { mapAirportDataToCartesian3 } from '../../utility/utils';

const RouteComponent: React.FC = () => {
  const { viewer } = useCesium();
  const dispatch = useDispatch<AppDispatch>();
  const currentRoute = useSelector((state: RootState) => state.route.currentRoute);
  const { lineColor, endPointColor } = useSelector((state: RootState) => state.route);
  const entityRefs = useRef<Record<string, Entity>>({});
  const routePointEntityIds = useRef<string[]>([]);

  useEffect(() => {
    const cleanupEntities = () => {
      removeEntities(viewer, entityRefs.current, routePointEntityIds.current);
      entityRefs.current = {};
      routePointEntityIds.current = [];
      dispatch(setRouteEntityIds([]));
    };

    if (!viewer || !currentRoute) {
      cleanupEntities();
      return;
    }

    const { fromAirport, toAirport } = currentRoute;
    const fromPosition = mapAirportDataToCartesian3(fromAirport);
    const toPosition = mapAirportDataToCartesian3(toAirport);

    if (!fromPosition || !toPosition) return;

    const polylineEntity = createPolylineEntity(viewer, fromPosition, toPosition, lineColor);
    const fromPointEntity = createPointEntity(viewer, fromPosition, endPointColor);
    const toPointEntity = createPointEntity(viewer, toPosition, endPointColor);
    
    entityRefs.current = {
      [`polyline-${fromAirport.GLOBAL_ID}-${toAirport.GLOBAL_ID}`]: polylineEntity,
      [fromAirport.GLOBAL_ID]: fromPointEntity,
      [toAirport.GLOBAL_ID]: toPointEntity,
    };

    routePointEntityIds.current = [
      `polyline-${fromAirport.GLOBAL_ID}-${toAirport.GLOBAL_ID}`,
      fromAirport.GLOBAL_ID,
      toAirport.GLOBAL_ID,
    ];

    dispatch(setRouteEntityIds(routePointEntityIds.current));

    const doubleClickHandler = (event: ScreenSpaceEventHandler.PositionedEvent) => {
      addPointToPolyline(
        viewer,
        event,
        polylineEntity,
        endPointColor,
        routePointEntityIds,
        dispatch
      );
    };

    viewer.screenSpaceEventHandler.setInputAction(
      doubleClickHandler,
      ScreenSpaceEventType.LEFT_DOUBLE_CLICK
    );

    return () => {
      cleanupEntities();
      viewer.screenSpaceEventHandler.removeInputAction(ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
    };
  }, [viewer, currentRoute, lineColor, endPointColor, dispatch]);

  return null;
};

export default RouteComponent;
