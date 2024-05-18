// PointEntity.tsx
import {
  PointGraphics,
  Color,
  ConstantProperty,
  NearFarScalar,
  Entity,
  HeightReference,
  DistanceDisplayCondition,
  Cartesian3,
  Property,
  ScreenSpaceEventHandler,
  ScreenSpaceEventType,
} from 'cesium';
import React, { useEffect, useRef } from 'react';
import { useCesium } from 'resium';

interface PointEntityProps {
  position: Cartesian3;
  show?: boolean | Property;
  pixelSize?: number | Property;
  heightReference?: HeightReference | Property;
  color?: Color | Property;
  outlineColor?: Color | Property;
  outlineWidth?: number | Property;
  scaleByDistance?: NearFarScalar | Property;
  translucencyByDistance?: NearFarScalar | Property;
  distanceDisplayCondition?: DistanceDisplayCondition | Property;
  disableDepthTestDistance?: number | Property;
  id: string;
  draggable?: boolean;
  onRightClick?: (positionEvent: ScreenSpaceEventHandler.PositionedEvent, pointId: string) => void;
  onDragStart?: (pointId: string) => void;
  onDrag?: (pointId: string, dragPosition: Cartesian3) => void;
  onDragEnd?: (pointId: string, draggedPosition: Cartesian3) => void;
}

export const PointEntity: React.FC<PointEntityProps> = ({
  position,
  show = true,
  pixelSize = 10,
  heightReference = HeightReference.NONE,
  color = Color.WHITE,
  outlineColor = Color.BLACK,
  outlineWidth = 0,
  scaleByDistance,
  translucencyByDistance,
  distanceDisplayCondition,
  disableDepthTestDistance,
  id,
  draggable,
  onRightClick,
  onDragStart,
  onDrag,
  onDragEnd,
}) => {
  const { viewer } = useCesium();
  const entityRef = useRef<Entity | null>(null);
  const rightClickHandler = useRef<ScreenSpaceEventHandler | null>(null);
  const dragHandler = useRef<ScreenSpaceEventHandler | null>(null);

  useEffect(() => {
    if (!viewer) return;

    const pointGraphics = new PointGraphics({
      show: new ConstantProperty(show),
      pixelSize: new ConstantProperty(pixelSize),
      heightReference: new ConstantProperty(heightReference),
      color: new ConstantProperty(color),
      outlineColor: new ConstantProperty(outlineColor),
      outlineWidth: new ConstantProperty(outlineWidth),
      scaleByDistance:
        scaleByDistance instanceof NearFarScalar
          ? scaleByDistance
          : new ConstantProperty(scaleByDistance),
      translucencyByDistance:
        translucencyByDistance instanceof NearFarScalar
          ? translucencyByDistance
          : new ConstantProperty(translucencyByDistance),
      distanceDisplayCondition:
        distanceDisplayCondition instanceof DistanceDisplayCondition
          ? distanceDisplayCondition
          : new ConstantProperty(distanceDisplayCondition),
      disableDepthTestDistance: new ConstantProperty(disableDepthTestDistance),
    });

    const entity = viewer.entities.add({
      position,
      point: pointGraphics,
      id,
    });

    entityRef.current = entity;

    if (onRightClick) {
      const handler = new ScreenSpaceEventHandler(viewer.scene.canvas);
      rightClickHandler.current = handler;

      handler.setInputAction((movement: ScreenSpaceEventHandler.PositionedEvent) => {
        console.log('RIGHT_CLICK event triggered');
        const pickedObject = viewer.scene.pick(movement.position);

        if (pickedObject && pickedObject.id === entity) {
          onRightClick(movement, id);
        }
      }, ScreenSpaceEventType.RIGHT_CLICK);
    }

    return () => {
      if (viewer && entity) {
        viewer.entities.remove(entity);
        console.log(`removed entity: ${entity.id}`);

        if (onRightClick && rightClickHandler.current) {
          rightClickHandler.current.removeInputAction(ScreenSpaceEventType.RIGHT_CLICK);
          rightClickHandler.current.destroy();
          rightClickHandler.current = null;
        }
      }
    };
  }, [
    viewer,
    position,
    show,
    pixelSize,
    heightReference,
    color,
    outlineColor,
    outlineWidth,
    scaleByDistance,
    translucencyByDistance,
    distanceDisplayCondition,
    disableDepthTestDistance,
    id,
    onRightClick,
    onDragStart,
    onDrag,
    onDragEnd,
  ]);

  useEffect(() => {
    if (!viewer || !draggable) return;

    const handler = new ScreenSpaceEventHandler(viewer.scene.canvas);
    dragHandler.current = handler;

    let isDragging = false;

    handler.setInputAction((movement: ScreenSpaceEventHandler.PositionedEvent) => {
      const pickedObject = viewer.scene.pick(movement.position);
      if (pickedObject && pickedObject.id === entityRef.current) {
        isDragging = true;
        viewer.scene.screenSpaceCameraController.enableInputs = false;

        if (onDragStart) {
          onDragStart(id);
        }
      }
    }, ScreenSpaceEventType.LEFT_DOWN);

    handler.setInputAction((movement: ScreenSpaceEventHandler.MotionEvent) => {
      if (isDragging) {
        const ellipsoid = viewer.scene.globe.ellipsoid;
        const cartesian = viewer.camera.pickEllipsoid(movement.endPosition, ellipsoid);
        if (cartesian && onDrag) {
          onDrag(id, cartesian);
        }
      }
    }, ScreenSpaceEventType.MOUSE_MOVE);

    handler.setInputAction((event: ScreenSpaceEventHandler.PositionedEvent) => {
      if (isDragging) {
        isDragging = false;
        const ellipsoid = viewer.scene.globe.ellipsoid;
        const cartesian = viewer.camera.pickEllipsoid(event.position, ellipsoid);
        if (cartesian) {
          viewer.scene.screenSpaceCameraController.enableInputs = true;
          if (onDragEnd) {
            onDragEnd(id, cartesian);
          }
        }
      }
    }, ScreenSpaceEventType.LEFT_UP);

    return () => {
      if (dragHandler.current) {
        dragHandler.current.removeInputAction(ScreenSpaceEventType.LEFT_DOWN);
        dragHandler.current.removeInputAction(ScreenSpaceEventType.MOUSE_MOVE);
        dragHandler.current.removeInputAction(ScreenSpaceEventType.LEFT_UP);
        dragHandler.current.destroy();
        dragHandler.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [viewer]);

  return null;
};
