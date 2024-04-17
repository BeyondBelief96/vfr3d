import {
  Cartesian3,
  Color,
  ConstantProperty,
  Entity,
  JulianDate,
  ScreenSpaceEventHandler,
  Viewer,
  defined,
} from 'cesium';
import { updateCurrentRouteEntityIds } from '../redux/slices/entitiesSlice';
import { AppDispatch } from '../redux/store';

export const createPolylineEntity = (
  viewer: Viewer,
  fromPosition: Cartesian3,
  toPosition: Cartesian3,
  lineColor: string
): Entity => {
  return viewer.entities.add({
    polyline: {
      positions: [fromPosition, toPosition],
      width: 3,
      material: Color.fromCssColorString(lineColor),
    },
  });
};

export const createPointEntity = (viewer: Viewer, position: Cartesian3, color: string): Entity => {
  return viewer.entities.add({
    position,
    point: { pixelSize: 10, color: Color.fromCssColorString(color) },
  });
};

export const addPointToPolyline = (
  viewer: Viewer,
  event: ScreenSpaceEventHandler.PositionedEvent,
  polylineEntity: Entity,
  endPointColor: string,
  routePointEntityIds: React.MutableRefObject<string[]>,
  dispatch: AppDispatch
) => {
  const pickedObject = viewer.scene.pick(event.position);
  if (defined(pickedObject) && defined(pickedObject.id) && pickedObject.id === polylineEntity) {
    const ray = viewer.camera.getPickRay(event.position);
    if (defined(ray)) {
      const globe = viewer.scene.globe;
      const cartesian = globe.pick(ray, viewer.scene);
      if (defined(cartesian)) {
        const newPointEntity = createPointEntity(viewer, cartesian, endPointColor);
        const positions = polylineEntity.polyline?.positions?.getValue(JulianDate.now()) || [];
        const newPositions = [...positions];

        // Find the index to insert the new point
        const index = findInsertionIndex(cartesian, positions);

        // Insert the new point at the correct index
        newPositions.splice(index, 0, cartesian);

        if (polylineEntity.polyline) {
          polylineEntity.polyline.positions = new ConstantProperty(newPositions);
        }

        // Insert the new point entity ID at the correct index in routePointEntityIds
        routePointEntityIds.current.splice(index, 0, newPointEntity.id);

        dispatch(updateCurrentRouteEntityIds([...routePointEntityIds.current]));
      }
    }
  }
};

export const removeEntities = (
  viewer: Viewer | undefined,
  entityRefs: Record<string, Entity>,
  routePointEntityIds: string[]
) => {
  [
    ...Object.values(entityRefs),
    ...routePointEntityIds.map((id) => viewer?.entities.getById(id)),
  ].forEach((entity) => {
    if (entity) {
      viewer?.entities.remove(entity);
    }
  });
};

const findInsertionIndex = (cartesian: Cartesian3, positions: Cartesian3[]) => {
  let closestIndex = -1;
  let closestDistance = Number.MAX_VALUE;
  for (let i = 0; i < positions.length - 1; i++) {
    const distance = Cartesian3.distanceSquared(cartesian, positions[i]);
    if (distance < closestDistance) {
      closestIndex = i;
      closestDistance = distance;
    }
  }
  return closestIndex + 1;
};
