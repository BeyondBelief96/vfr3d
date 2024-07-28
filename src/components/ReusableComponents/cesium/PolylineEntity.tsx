import {
  Cartesian3,
  Color,
  ConstantProperty,
  Entity,
  PolylineGraphics,
  ScreenSpaceEventHandler,
  ScreenSpaceEventType,
} from 'cesium';
import { useEffect, useRef } from 'react';
import { useCesium } from 'resium';

interface PolylineEntityProps {
  positions: Cartesian3[];
  color?: Color;
  width?: number;
  id: string;
  onLeftClick: (
    position: ScreenSpaceEventHandler.PositionedEvent,
    polylinePoints: Cartesian3[]
  ) => void;
}

export const PolylineEntity: React.FC<PolylineEntityProps> = ({
  positions,
  color = Color.BLUE,
  width = 3,
  id,
  onLeftClick,
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

    const handler = new ScreenSpaceEventHandler(viewer.scene.canvas);

    handler.setInputAction((movement: ScreenSpaceEventHandler.PositionedEvent) => {
      const pickedObject = viewer.scene.pick(movement.position);
      if (pickedObject && pickedObject.id === entity) {
        onLeftClick(movement, positions);
      }
    }, ScreenSpaceEventType.LEFT_CLICK);

    return () => {
      if (viewer && entity) {
        viewer.entities.remove(entity);
        entityRef.current = null;
        handler.removeInputAction(ScreenSpaceEventType.LEFT_CLICK);
      }
    };
  }, [viewer, positions, color, width, id, onLeftClick]);

  return null;
};
