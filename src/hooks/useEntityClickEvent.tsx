// useEntityClickEvent.ts
import { ScreenSpaceEventHandler, ScreenSpaceEventType } from 'cesium';
import { useEffect } from 'react';
import { useCesium } from 'resium';

type ClickCallback = (movement: ScreenSpaceEventHandler.PositionedEvent) => void;

export const useEntityClickEvent = (callback: ClickCallback) => {
  const { viewer } = useCesium();

  useEffect(() => {
    if (!viewer) return;
    
    const handler = new ScreenSpaceEventHandler(viewer.scene.canvas);
    handler.setInputAction(callback, ScreenSpaceEventType.LEFT_CLICK);

    return () => {
      handler.destroy();
    };
  }, [viewer, callback]);
};
