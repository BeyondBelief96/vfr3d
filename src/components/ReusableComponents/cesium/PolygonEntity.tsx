// PolygonEntity.tsx
import { Cartesian3, Color, Entity, PolygonGraphics, PolygonHierarchy } from 'cesium';
import React, { useEffect, useRef, useMemo } from 'react';
import { useCesium } from 'resium';
import { AirsigmetDTO, PointDTO } from 'vfr3d-shared';

interface PolygonEntityProps {
  airsigmet: AirsigmetDTO;
  color?: Color;
  outlineColor?: Color;
  outlineWidth?: number;
  id: string;
}

export const PolygonEntity: React.FC<PolygonEntityProps> = React.memo(
  ({
    airsigmet,
    color = Color.BLUE.withAlpha(0.5),
    outlineColor = Color.WHITE,
    outlineWidth = 2,
    id,
  }) => {
    const { viewer } = useCesium();
    const entityRef = useRef<Entity | null>(null);

    const polygonHierarchy = useMemo(() => {
      if (!airsigmet.area || !airsigmet.area.points || airsigmet.area.points.length < 3) {
        return null;
      }
      const positions = airsigmet.area.points.map((point: PointDTO) =>
        Cartesian3.fromDegrees(Number(point.longitude), Number(point.latitude))
      );
      return new PolygonHierarchy(positions);
    }, [airsigmet.area]);

    useEffect(() => {
      if (!viewer || !polygonHierarchy) {
        return;
      }

      const minHeight = airsigmet.altitude?.minFtMsl || 0;
      const maxHeight = airsigmet.altitude?.maxFtMsl || minHeight + 1000;

      const polygonGraphics = new PolygonGraphics({
        hierarchy: polygonHierarchy,
        material: color,
        outline: true,
        outlineColor: outlineColor,
        outlineWidth: outlineWidth,
        height: minHeight * 0.3048,
        extrudedHeight: maxHeight * 0.3048,
        fill: true,
        closeBottom: true,
        closeTop: true,
      });

      const entity = viewer.entities.add({
        polygon: polygonGraphics,
        id,
      });

      entityRef.current = entity;

      return () => {
        if (viewer && entityRef.current) {
          viewer.entities.remove(entityRef.current);
          entityRef.current = null;
        }
      };
    }, [viewer, polygonHierarchy, color, outlineColor, outlineWidth, id, airsigmet.altitude]);

    return null;
  }
);

export default PolygonEntity;
