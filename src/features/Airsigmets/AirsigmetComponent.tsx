import React, { useEffect } from 'react';
import { Color } from 'cesium';
import { useDispatch } from 'react-redux';
import { useGetAllAirsigmetsQuery } from '../../redux/api/vfr3d/weatherApi';
import { PolygonEntity } from '../../components/ReusableComponents/cesium/PolygonEntity';
import { AppState } from '../../redux/store';
import { HazardType, setSelectedAirsigmet } from '../../redux/slices/airsigmetsSlice';
import { setSelectedPirep } from '../../redux/slices/pirepsSlice';
import { setSelectedAirport } from '../../redux/slices/airportsSlice';
import { useAuthenticatedQuery } from '../../hooks/useAuthenticatedQuery';
import { useAppSelector } from '../../hooks/reduxHooks';

export const AirsigmetComponent: React.FC = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useAuthenticatedQuery();
  const visibleHazards = useAppSelector((state: AppState) => state.airsigmet.visibleHazards);
  const { data: airsigmets, refetch } = useGetAllAirsigmetsQuery(undefined, {
    skip: !isAuthenticated,
    pollingInterval: 1810 * 1000,
  });

  const getColorForHazard = (hazardType: HazardType, severity: string): Color => {
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
  };

  useEffect(() => {
    if (isAuthenticated) {
      refetch();
    }
  }, [isAuthenticated, refetch]);

  return (
    <>
      {airsigmets?.map((airsigmet, index) => {
        if (
          !airsigmet.area ||
          !airsigmet.area.points ||
          airsigmet.area.points.length < 3 ||
          !airsigmet.hazard?.type ||
          !visibleHazards[airsigmet.hazard.type as HazardType]
        ) {
          return null;
        }

        return (
          <PolygonEntity
            key={`airsigmet-${index}`}
            id={`airsigmet-${index}`}
            airsigmet={airsigmet}
            color={getColorForHazard(
              airsigmet.hazard.type as HazardType,
              airsigmet.hazard.severity || ''
            )}
            onLeftClick={() => {
              dispatch(setSelectedAirsigmet(airsigmet));
              dispatch(setSelectedPirep(null));
              dispatch(setSelectedAirport(null));
            }}
          />
        );
      })}
    </>
  );
};

export default AirsigmetComponent;
