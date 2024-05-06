// useEntityMouseMoveEvent.ts
import { Entity, ScreenSpaceEventHandler, ScreenSpaceEventType } from 'cesium';
import { useEffect } from 'react';
import { useCesium } from 'resium';

type MouseMoveCallback = (movement: ScreenSpaceEventHandler.MotionEvent, entity: Entity) => void;

export const useEntityMouseMoveEvent = (
  callback: MouseMoveCallback,
  entity: Entity | undefined
) => {
  const { viewer } = useCesium();

  useEffect(() => {
    if (!viewer || !entity) return;

    const handler = new ScreenSpaceEventHandler(viewer.scene.canvas);
    handler.setInputAction((event: ScreenSpaceEventHandler.MotionEvent) => {
      const pickedObject = viewer.scene.pick(event.endPosition);
      if (pickedObject && pickedObject.id === entity) {
        callback(event, entity);
      }
    }, ScreenSpaceEventType.MOUSE_MOVE);

    return () => {
      handler.destroy();
    };
  }, [viewer, entity, callback]);
};
