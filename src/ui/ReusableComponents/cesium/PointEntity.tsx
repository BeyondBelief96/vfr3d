// PointEntity.tsx
import {
  PointGraphics,
  Color,
  ConstantProperty,
  NearFarScalar,
  Entity,
  HeightReference,
  ScreenSpaceEventHandler,
  DistanceDisplayCondition,
  Cartesian3,
  Property,
} from 'cesium';
import React, { useEffect, useRef } from 'react';
import { useCesium } from 'resium';
import { useEntityClickEvent } from '../../../hooks/useEntityClickEvent';

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
  onClick?: (entity: Entity) => void;
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
  onClick,
}) => {
  const { viewer } = useCesium();
  const entityRef = useRef<Entity | null>(null);

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

    return () => {
      if (viewer && entity) {
        viewer.entities.remove(entity);
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
  ]);

  const handleClick = (movement: ScreenSpaceEventHandler.PositionedEvent) => {
    if (!entityRef.current) return;

    const pickedObject = viewer?.scene.pick(movement.position);
    if (pickedObject && pickedObject.id === entityRef.current) {
      onClick && onClick(entityRef.current);
    }
  };

  useEntityClickEvent(handleClick);

  return null;
};
