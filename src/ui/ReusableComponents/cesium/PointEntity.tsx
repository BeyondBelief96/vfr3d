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
  onRightClick?: (positionEvent: ScreenSpaceEventHandler.PositionedEvent, pointId: string) => void;
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
  onRightClick,
}) => {
  const { viewer } = useCesium();
  const entityRef = useRef<Entity | null>(null);
  const handlerRef = useRef<ScreenSpaceEventHandler | null>(null);

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
      handlerRef.current = handler;

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

        if (onRightClick && handlerRef.current) {
          handlerRef.current.removeInputAction(ScreenSpaceEventType.RIGHT_CLICK);
          handlerRef.current.destroy();
          handlerRef.current = null;
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
  ]);

  return null;
};
