import {
  Cartesian3,
  Color,
  ConstantProperty,
  Entity,
  JulianDate,
  ScreenSpaceEventHandler,
  ScreenSpaceEventType,
  defined,
} from 'cesium';
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
  const routePointEntityIds = useRef<string[]>([]);

  useEffect(() => {
    // Remove existing entities
    [
      ...Object.values(entityRefs.current),
      ...routePointEntityIds.current.map((id) => viewer?.entities.getById(id)),
    ].forEach((entity) => {
      if (entity) {
        viewer?.entities.remove(entity);
      }
    });
    entityRefs.current = {};
    routePointEntityIds.current = [];

    if (!viewer || !currentRoute) {
      routePointEntityIds.current = []; // Clear route entity IDs
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

    // Add double-click event handler
    viewer.screenSpaceEventHandler.setInputAction(
      (event: ScreenSpaceEventHandler.PositionedEvent) => {
        const pickedObject = viewer.scene.pick(event.position);
        if (
          defined(pickedObject) &&
          defined(pickedObject.id) &&
          pickedObject.id === polylineEntity
        ) {
          const ray = viewer.camera.getPickRay(event.position);
          if (defined(ray)) {
            const globe = viewer.scene.globe;
            const cartesian = globe.pick(ray, viewer.scene);
            if (defined(cartesian)) {
              const newPointEntity = viewer.entities.add({
                position: cartesian,
                point: { pixelSize: 10, color: Color.fromCssColorString(endPointColor) },
              });

              // Update polyline positions
              const positions =
                polylineEntity.polyline?.positions?.getValue(JulianDate.now()) || [];
              const newPositions = [...positions];
              const index = findClosestIndex(cartesian, positions);
              newPositions.splice(index + 1, 0, cartesian);
              if (polylineEntity.polyline)
                polylineEntity.polyline.positions = new ConstantProperty(newPositions);

              // Update route entity IDs and point entity IDs
              routePointEntityIds.current = [...routePointEntityIds.current, newPointEntity.id];
              dispatch(setRouteEntityIds([...routePointEntityIds.current]));
            }
          }
        }
      },
      ScreenSpaceEventType.LEFT_DOUBLE_CLICK
    );

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

    routePointEntityIds.current = newRouteEntityIds;
    dispatch(setRouteEntityIds(newRouteEntityIds));

    // Cleanup function
    return () => {
      [
        ...Object.values(entityRefs.current),
        ...routePointEntityIds.current.map((id) => viewer?.entities.getById(id)),
      ].forEach((entity) => {
        if (entity) {
          viewer?.entities.remove(entity);
        }
      });
      entityRefs.current = {};
      routePointEntityIds.current = [];

      // Remove double-click event handler
      viewer?.screenSpaceEventHandler.removeInputAction(ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
    };
  }, [viewer, currentRoute, lineColor, endPointColor, dispatch]);

  // Helper function to find the closest index to insert the new point
  const findClosestIndex = (cartesian: Cartesian3, positions: Cartesian3[]) => {
    let closestIndex = -1;
    let closestDistance = Number.MAX_VALUE;
    for (let i = 0; i < positions.length - 1; i++) {
      const distance = Cartesian3.distanceSquared(cartesian, positions[i]);
      if (distance < closestDistance) {
        closestIndex = i;
        closestDistance = distance;
      }
    }
    return closestIndex;
  };

  return null;
};

export default RouteComponent;
