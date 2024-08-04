import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Cartesian2,
  Cartesian3,
  Cartographic,
  Color,
  Math as CesiumMath,
  ScreenSpaceEventHandler,
  NearFarScalar,
} from 'cesium';
import { AppState } from '../../redux/store';
import { PointEntity } from '../../components/ReusableComponents/cesium/PointEntity';
import {
  isSameLocationWaypointCartesian,
  mapWaypointToCartesian3,
  mapWaypointToCartesian3Flat,
} from '../../utility/cesiumUtils';
import { Waypoint } from 'vfr3d-shared';
import AddWaypointContextMenu from './AddWaypointContextMenu';
import { useCesium } from 'resium';
import { EditDeleteWaypointContextMenu } from './EditDeleteWaypointContextMenu';
import { updateWaypointPositionFlat } from '../../redux/slices/routeSlice';
import { PolylineEntity } from '../../components/ReusableComponents/cesium/PolylineEntity';
import { RoutePoint } from './route.types';
import { mapWaypointToRoutePoint } from '../../utility/utils';

const RouteComponent: React.FC = () => {
  const dispatch = useDispatch();
  const { viewer, camera, scene } = useCesium();
  const routePoints = useSelector((state: AppState) => state.route.route?.routePoints);
  const { lineColor, pointColor: endPointColor } = useSelector((state: AppState) => state.route);
  const navlog = useSelector((state: AppState) => state.navlog.navlog);
  const isNavlogReady = useSelector((state: AppState) => state.navlog.isNavlogReady);

  const renderPoints: RoutePoint[] = isNavlogReady
    ? navlog.legs
        .flatMap((leg) => [leg.legStartPoint, leg.legEndPoint])
        .filter((point, index, self) => self.findIndex((p) => p.id === point.id) === index)
        .map((wp) => mapWaypointToRoutePoint(wp, true, 'CUSTOM_WAYPOINT'))
    : routePoints;

  const [showAddWaypointMenu, setShowAddWaypointMenu] = useState(false);
  const [addWaypointMenuPosition, setAddWaypointMenuPosition] = useState<Cartesian3 | null>(null);
  const [addWaypointIndex, setAddWaypointIndex] = useState<number>(0);
  const [showDeleteWaypointMenu, setShowDeleteWaypointMenu] = useState(false);
  const [deleteWaypointMenuPosition, setDeleteWaypointMenuPosition] = useState<Cartesian2 | null>(
    null
  );
  const [deleteWaypointId, setDeleteWaypointId] = useState<string>('');

  const handleRouteLeftClick = (
    event: ScreenSpaceEventHandler.PositionedEvent,
    polylinePoints: Cartesian3[]
  ) => {
    if (!viewer || !scene || !camera || isNavlogReady) return;
    const pickRay = scene.camera.getPickRay(event.position);
    if (pickRay) {
      const position = scene.globe.pick(pickRay, scene);

      if (!position) return;

      // Find the index of the first point of the clicked polyline segment
      const startPointIndex = renderPoints.findIndex((point) =>
        isSameLocationWaypointCartesian(polylinePoints[0], point)
      );

      setAddWaypointMenuPosition(position);
      setShowAddWaypointMenu(true);
      setAddWaypointIndex(startPointIndex + 1); // Set the index to add the new waypoint
    }
  };

  const handleWaypointRightClick = (
    event: ScreenSpaceEventHandler.PositionedEvent,
    pointId: string
  ) => {
    if (!viewer || !scene || !camera || isNavlogReady) return;
    setShowDeleteWaypointMenu(true);
    setDeleteWaypointId(pointId);
    setDeleteWaypointMenuPosition(event.position);
  };

  const closeAddWaypointMenu = () => {
    setShowAddWaypointMenu(false);
    setAddWaypointMenuPosition(null);
  };

  const closeDeleteWaypointMenu = () => {
    setShowDeleteWaypointMenu(false);
    setDeleteWaypointMenuPosition(null);
  };

  const handleWaypointDrag = (waypointId: string, position: Cartesian3) => {
    const cartographic = Cartographic.fromCartesian(position);
    const latitude = CesiumMath.toDegrees(cartographic.latitude);
    const longitude = CesiumMath.toDegrees(cartographic.longitude);

    dispatch(
      updateWaypointPositionFlat({
        waypointId,
        position: {
          latitude,
          longitude,
        },
      })
    );
  };

  const handleWaypointDragEnd = (waypointId: string, position: Cartesian3) => {
    const cartographic = Cartographic.fromCartesian(position);
    const latitude = CesiumMath.toDegrees(cartographic.latitude);
    const longitude = CesiumMath.toDegrees(cartographic.longitude);

    dispatch(
      updateWaypointPositionFlat({
        waypointId,
        position: {
          latitude,
          longitude,
        },
      })
    );
  };

  const mapWaypointToPosition = isNavlogReady
    ? mapWaypointToCartesian3
    : mapWaypointToCartesian3Flat;

  return (
    <>
      {renderPoints?.map((point: RoutePoint, index: number) => {
        const position = mapWaypointToPosition(point);
        if (!position || !point.shouldDisplay) return;

        const isStartPoint = index % 2 === 0;
        const legIndex = isStartPoint ? index / 2 : (index - 1) / 2;
        const legId = `leg-${legIndex}`;
        const entityKey = `${point.id}-${legId}-${isStartPoint ? 'start' : 'end'}`;

        const pointId = isNavlogReady ? `navlog-leg${legIndex} + ${point.id}` : point.id;

        return (
          <PointEntity
            key={entityKey}
            pixelSize={15}
            position={position}
            color={Color.fromCssColorString(endPointColor)}
            id={pointId}
            onRightClick={handleWaypointRightClick}
            draggable={true}
            onDrag={handleWaypointDrag}
            onDragEnd={handleWaypointDragEnd}
            labelText={point.name}
            labelBackgroundColor={Color.fromCssColorString(endPointColor)}
            labelScaleByDistance={new NearFarScalar(100000, 0.5, 500000, 0.3)}
            labelPixelOffset={new Cartesian2(0, -20)}
          />
        );
      })}

      {renderPoints?.map((point: Waypoint, index: number) => {
        if (index === 0) return null;

        const prevPoint = renderPoints[index - 1];
        const prevPosition = mapWaypointToPosition(prevPoint);
        const currPosition = mapWaypointToPosition(point);
        if (!prevPosition || !currPosition) return null;

        const polylineId = `route-polyline-${prevPoint.id}-${point.id}`;

        return (
          <PolylineEntity
            key={polylineId}
            positions={[prevPosition, currPosition]}
            color={Color.fromCssColorString(lineColor)}
            id={polylineId}
            width={6}
            onLeftClick={handleRouteLeftClick}
          />
        );
      })}

      {showAddWaypointMenu && addWaypointMenuPosition && (
        <AddWaypointContextMenu
          position={addWaypointMenuPosition}
          onClose={closeAddWaypointMenu}
          waypointIndex={addWaypointIndex}
        />
      )}

      {showDeleteWaypointMenu && deleteWaypointMenuPosition && (
        <EditDeleteWaypointContextMenu
          waypointId={deleteWaypointId}
          screenPosition={deleteWaypointMenuPosition}
          onClose={closeDeleteWaypointMenu}
        />
      )}
    </>
  );
};

export default RouteComponent;
