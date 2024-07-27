// AirsigmetComponent.tsx
import React, { useEffect, useCallback, useMemo } from 'react';
import { Color, ScreenSpaceEventHandler, ScreenSpaceEventType } from 'cesium';
import { useDispatch } from 'react-redux';
import { useCesium } from 'resium';
import { useGetAllAirsigmetsQuery } from '../../redux/api/vfr3d/weatherApi';
import { PolygonEntity } from '../../components/ReusableComponents/cesium/PolygonEntity';
import { AppState } from '../../redux/store';
import { HazardType } from '../../redux/slices/airsigmetsSlice';
import { useAuthenticatedQuery } from '../../hooks/useAuthenticatedQuery';
import { useAppSelector } from '../../hooks/reduxHooks';
import { setSelectedEntity } from '../../redux/slices/selectedEntitySlice';
import { getAirsigmetEntityId } from '../../utility/entityIdUtils';

export const AirsigmetComponent: React.FC = () => {
  const dispatch = useDispatch();
  const { viewer } = useCesium();
  const { isAuthenticated } = useAuthenticatedQuery();
  const visibleHazards = useAppSelector((state: AppState) => state.airsigmet.visibleHazards);
  const { data: airsigmets, refetch } = useGetAllAirsigmetsQuery(undefined, {
    skip: !isAuthenticated,
    pollingInterval: 1810 * 1000,
  });

  const getColorForHazard = useCallback((hazardType: HazardType, severity: string): Color => {
    switch (hazardType) {
      case 'CONVECTIVE':
        return severity === 'SEV' ? Color.RED.withAlpha(0.2) : Color.YELLOW.withAlpha(0.2);
      case 'ICE':
        return Color.CYAN.withAlpha(0.2);
      case 'TURB':
        return Color.ORANGE.withAlpha(0.2);
      case 'IFR':
        return Color.GREEN.withAlpha(0.2);
      case 'MTN OBSCN':
        return Color.PURPLE.withAlpha(0.2);
      default:
        return Color.BLUE.withAlpha(0.2);
    }
  }, []);

  const visibleAirsigmets = useMemo(() => {
    return (
      airsigmets?.filter(
        (airsigmet) =>
          airsigmet.area &&
          airsigmet.area.points &&
          airsigmet.area.points.length >= 3 &&
          airsigmet.hazard?.type &&
          visibleHazards[airsigmet.hazard.type as HazardType]
      ) || []
    );
  }, [airsigmets, visibleHazards]);

  useEffect(() => {
    if (isAuthenticated) {
      refetch();
    }
  }, [isAuthenticated, refetch]);

  useEffect(() => {
    if (!viewer) return;

    const handler = new ScreenSpaceEventHandler(viewer.scene.canvas);

    handler.setInputAction((movement: ScreenSpaceEventHandler.PositionedEvent) => {
      const pickedObject = viewer.scene.pick(movement.position);
      if (pickedObject && pickedObject.id) {
        const clickedAirsigmet = airsigmets?.find(
          (a) => getAirsigmetEntityId(a) === pickedObject.id.id
        );
        if (clickedAirsigmet) {
          dispatch(setSelectedEntity({ entity: clickedAirsigmet, type: 'Airsigmet' }));
        }
      }
    }, ScreenSpaceEventType.LEFT_CLICK);

    return () => {
      handler.destroy();
    };
  }, [viewer, airsigmets, dispatch]);

  return (
    <>
      {visibleAirsigmets.map((airsigmet) => (
        <MemoizedPolygonEntity
          key={airsigmet.id}
          id={`airsigmet-${airsigmet.id}`}
          airsigmet={airsigmet}
          color={getColorForHazard(
            airsigmet.hazard?.type as HazardType,
            airsigmet.hazard?.severity || ''
          )}
        />
      ))}
    </>
  );
};

const MemoizedPolygonEntity = React.memo(PolygonEntity);

export default AirsigmetComponent;
