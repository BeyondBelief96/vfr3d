import {
  Cartesian3,
  Color,
  Entity,
  PolygonGraphics,
  ScreenSpaceEventHandler,
  ScreenSpaceEventType,
  PolygonHierarchy,
} from 'cesium';
import React, { useEffect, useRef } from 'react';
import { useCesium } from 'resium';
import { AirsigmetDTO, PointDTO } from 'vfr3d-shared';

interface PolygonEntityProps {
  airsigmet: AirsigmetDTO;
  color?: Color;
  outlineColor?: Color;
  outlineWidth?: number;
  id: string;
  onLeftClick?: (position: ScreenSpaceEventHandler.PositionedEvent, polygonId: string) => void;
}

export const PolygonEntity: React.FC<PolygonEntityProps> = ({
  airsigmet,
  color = Color.BLUE.withAlpha(0.5),
  outlineColor = Color.WHITE,
  outlineWidth = 2,
  id,
  onLeftClick,
}) => {
  const { viewer } = useCesium();
  const entityRef = useRef<Entity | null>(null);

  useEffect(() => {
    if (!viewer || !airsigmet.area || !airsigmet.area.points || airsigmet.area.points.length < 3)
      return;

    const positions = airsigmet.area.points.map((point: PointDTO) =>
      Cartesian3.fromDegrees(Number(point.longitude), Number(point.latitude))
    );

    const polygonHierarchy = new PolygonHierarchy(positions);

    const minHeight = airsigmet.altitude?.minFtMsl || 0;
    const maxHeight = airsigmet.altitude?.maxFtMsl || minHeight + 1000; // Default to 1000 ft above min if max not provided

    const polygonGraphics = new PolygonGraphics({
      hierarchy: polygonHierarchy,
      material: color,
      outline: true,
      outlineColor: outlineColor,
      outlineWidth: outlineWidth,
      height: minHeight * 0.3048, // Convert feet to meters
      extrudedHeight: maxHeight * 0.3048, // Convert feet to meters
      fill: true,
      closeBottom: true,
      closeTop: true,
    });

    const entity = viewer.entities.add({
      polygon: polygonGraphics,
      id,
    });

    entityRef.current = entity;

    if (onLeftClick) {
      const handler = new ScreenSpaceEventHandler(viewer.scene.canvas);
      handler.setInputAction((movement: ScreenSpaceEventHandler.PositionedEvent) => {
        const pickedObject = viewer.scene.pick(movement.position);
        if (pickedObject && pickedObject.id === entity) {
          onLeftClick(movement, id);
        }
      }, ScreenSpaceEventType.LEFT_CLICK);

      return () => {
        if (viewer && entity) {
          viewer.entities.remove(entity);
          handler.removeInputAction(ScreenSpaceEventType.LEFT_CLICK);
        }
      };
    }

    return () => {
      if (viewer && entity) {
        viewer.entities.remove(entity);
      }
    };
  }, [viewer, airsigmet, color, outlineColor, outlineWidth, id, onLeftClick]);

  return null;
};
