import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Cartesian2,
  Cartesian3,
  Cartographic,
  Color,
  Math as CesiumMath,
  ScreenSpaceEventHandler,
} from 'cesium';
import { AppState } from '../../redux/store';
import { PointEntity } from '../../ui/ReusableComponents/cesium/PointEntity';
import { PolylineEntity } from '../../ui/ReusableComponents/cesium/PolylineEntity';
import { mapWaypointToCartesian3, mapWaypointToCartesian3Flat } from '../../utility/cesiumUtils';
import { Waypoint } from 'vfr3d-shared';
import AddWaypointContextMenu from './AddWaypointContextMenu';
import { useCesium } from 'resium';
import { DeleteWaypointContextMenu } from './RoutesPanel/DeleteWaypointContextMenu';
import { updateWaypointPositionFlat } from '../../redux/slices/routeSlice';

const RouteComponent: React.FC = () => {
  const dispatch = useDispatch();
  const { viewer, camera, scene } = useCesium();
  const routePoints = useSelector((state: AppState) => state.route.route?.routePoints);
  const { lineColor, pointColor: endPointColor } = useSelector((state: AppState) => state.route);
  const navlog = useSelector((state: AppState) => state.navlog.navlog);
  const isNavlogReady = useSelector((state: AppState) => state.navlog.isNavlogReady);

  const renderPoints = isNavlogReady
    ? navlog.legs.flatMap((leg) => [leg.legStartPoint, leg.legEndPoint])
    : routePoints;

  const [showAddWaypointMenu, setShowAddWaypointMenu] = useState(false);
  const [addWaypointMenuPosition, setAddWaypointMenuPosition] = useState<Cartesian3 | null>(null);
  const [showDeleteWaypointMenu, setShowDeleteWaypointMenu] = useState(false);
  const [deleteWaypointMenuPosition, setDeleteWaypointMenuPosition] = useState<Cartesian2 | null>(
    null
  );
  const [deleteWaypointId, setDeleteWaypointId] = useState<string>('');

  const handleRouteLeftClick = (event: ScreenSpaceEventHandler.PositionedEvent) => {
    if (!viewer || !scene || !camera) return;

    // Check if the camera is directly top-down
    const cameraPosition = camera.position;
    const cameraDirection = camera.direction;
    const up = scene.globe.ellipsoid.geodeticSurfaceNormal(cameraPosition);
    const dot = Cartesian3.dot(cameraDirection, up);

    if (Math.abs(dot) > 0.99) {
      const pickRay = scene.camera.getPickRay(event.position);
      if (pickRay) {
        const position = scene.globe.pick(pickRay, scene);

        if (!position) return;

        setAddWaypointMenuPosition(position);
        setShowAddWaypointMenu(true);
      }
    }
  };

  const handleWaypointRightClick = (
    event: ScreenSpaceEventHandler.PositionedEvent,
    pointId: string
  ) => {
    if (!viewer || !scene || !camera) return;
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
      {renderPoints?.map((point: Waypoint, index: number) => {
        const position = mapWaypointToPosition(point);
        if (!position) return null;
        if (index === 0 || index === renderPoints.length - 1) return;

        const isStartPoint = index % 2 === 0;
        const legIndex = isStartPoint ? index / 2 : (index - 1) / 2;
        const legId = `leg-${legIndex}`;
        const entityKey = `${point.id}-${legId}-${isStartPoint ? 'start' : 'end'}`;

        return (
          <PointEntity
            key={entityKey}
            pixelSize={15}
            position={position}
            color={Color.fromCssColorString(endPointColor)}
            id={point.id}
            onRightClick={handleWaypointRightClick}
            draggable={true}
            onDragEnd={handleWaypointDragEnd}
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
        <AddWaypointContextMenu position={addWaypointMenuPosition} onClose={closeAddWaypointMenu} />
      )}

      {showDeleteWaypointMenu && deleteWaypointMenuPosition && (
        <DeleteWaypointContextMenu
          waypointId={deleteWaypointId}
          screenPosition={deleteWaypointMenuPosition}
          onClose={closeDeleteWaypointMenu}
        />
      )}
    </>
  );
};

export default RouteComponent;
