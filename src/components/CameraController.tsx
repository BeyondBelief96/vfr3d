import { Camera, Cartesian2, ScreenSpaceEventHandler, ScreenSpaceEventType } from 'cesium';
import { useEffect, useRef } from 'react';
import { useCesium } from 'resium';

export const CameraController = () => {
  const { scene, camera } = useCesium();
  const previousDistanceRef = useRef<number | null>(null);
  const isPinchingRef = useRef(false);

  useEffect(() => {
    if (!scene || !camera) return;

    const handler = new ScreenSpaceEventHandler(scene.canvas);

    handler.setInputAction((movement: ScreenSpaceEventHandler.TwoPointMotionEvent) => {
      const startDistance = Cartesian2.distance(
        movement.previousPosition1,
        movement.previousPosition2
      );
      const endDistance = Cartesian2.distance(movement.position1, movement.position2);

      if (previousDistanceRef.current !== null) {
        const delta = endDistance - startDistance;
        const zoomFactor = Math.pow(1.1, delta / 10);

        camera.zoomIn(camera.defaultZoomAmount * (zoomFactor - 1));
        scene.screenSpaceCameraController.enableRotate = false;

        isPinchingRef.current = true;
      }

      previousDistanceRef.current = endDistance;
    }, ScreenSpaceEventType.PINCH_MOVE);

    handler.setInputAction(() => {
      previousDistanceRef.current = null;
      isPinchingRef.current = false;
      scene.screenSpaceCameraController.enableRotate = true;
    }, ScreenSpaceEventType.PINCH_END);

    // Prevent rotation during pinch
    const originalRotate = camera.rotate;
    camera.rotate = function (this: Camera, ...args: Parameters<Camera['rotate']>) {
      if (!isPinchingRef.current) {
        originalRotate.apply(this, args);
      }
    };

    return () => {
      handler.destroy();
      camera.rotate = originalRotate;
    };
  }, [scene, camera]);

  return null;
};
