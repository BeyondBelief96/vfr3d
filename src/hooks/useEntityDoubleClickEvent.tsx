// useEntityDoubleClickEvent.ts
import { Entity, ScreenSpaceEventHandler, ScreenSpaceEventType } from 'cesium';
import { useEffect } from 'react';
import { useCesium } from 'resium';

type DoubleClickCallback = (
  movement: ScreenSpaceEventHandler.PositionedEvent,
  entity: Entity
) => void;

export const useEntityDoubleClickEvent = (
  callback: DoubleClickCallback,
  entity: Entity | undefined
) => {
  const { viewer } = useCesium();

  useEffect(() => {
    if (!viewer || !entity) return;

    const handler = new ScreenSpaceEventHandler(viewer.scene.canvas);
    handler.setInputAction((event: ScreenSpaceEventHandler.PositionedEvent) => {
      const pickedObject = viewer.scene.pick(event.position);
      if (pickedObject && pickedObject.id === entity) {
        callback(event, entity);
      }
    }, ScreenSpaceEventType.LEFT_DOUBLE_CLICK);

    return () => {
      handler.destroy();
    };
  }, [viewer, entity, callback]);
};
