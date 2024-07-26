import React from 'react';
import { Color } from 'cesium';
import { useSelector } from 'react-redux';
import { useGetAllAirsigmetsQuery } from '../../redux/api/vfr3d/weatherApi';
import { PolygonEntity } from '../../components/ReusableComponents/cesium/PolygonEntity';
import { AppState } from '../../redux/store';
import { HazardType } from '../../redux/slices/airsigmetsSlice';

export const AirsigmetComponent: React.FC = () => {
  const { data: airsigmets } = useGetAllAirsigmetsQuery();
  const visibleHazards = useSelector((state: AppState) => state.airsigmet.visibleHazards);

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
            onLeftClick={(_, polygonId) => {
              console.log(`Clicked on airsigmet: ${polygonId}`);
              console.log('Airsigmet details:', airsigmet);
            }}
          />
        );
      })}
    </>
  );
};

export default AirsigmetComponent;
