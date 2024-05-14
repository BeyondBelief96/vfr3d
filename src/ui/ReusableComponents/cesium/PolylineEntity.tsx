import { Cartesian3, Color, ConstantProperty, Entity, PolylineGraphics } from 'cesium';
import { useEffect, useRef } from 'react';
import { useCesium } from 'resium';

interface PolylineEntityProps {
  positions: Cartesian3[];
  color?: Color;
  width?: number;
  id: string;
}

export const PolylineEntity: React.FC<PolylineEntityProps> = ({
  positions,
  color = Color.BLUE,
  width = 3,
  id,
}) => {
  const { viewer } = useCesium();
  const entityRef = useRef<Entity | null>(null);

  useEffect(() => {
    if (!viewer) return;
    const polylineGraphics = new PolylineGraphics({
      positions: new ConstantProperty(positions),
      material: color,
      width: new ConstantProperty(width),
    });

    const entity = viewer.entities.add({
      polyline: polylineGraphics,
      id,
    });

    entityRef.current = entity;

    return () => {
      if (viewer && entity) {
        viewer.entities.remove(entity);
      }
    };
  }, [viewer, positions, color, width, id]);

  return null;
};
