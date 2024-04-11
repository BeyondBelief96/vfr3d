import { Math } from 'cesium';
import { useCallback } from 'react';
import { useCesium } from 'resium';
import { getAirportByIcaoCode } from '../api/faa-airports';
import { mapAirportDataToCartesian3 } from '../utility/utils';

const useSearchAndFlyTo = () => {
  const { viewer } = useCesium();

  const searchAndFlyTo = useCallback(
    async (icaoCode: string) => {
      try {
        const airport = await getAirportByIcaoCode(icaoCode);
        if (airport) {
          const position = mapAirportDataToCartesian3(airport);
          if (position && viewer) {
            viewer.camera.setView({
              destination: position,
              orientation: {
                heading: Math.toRadians(0),
                pitch: Math.toRadians(-90),
                roll: 0,
              },
            });
            viewer.camera.moveBackward(30000);
          }
        } else {
          console.log('Airport not found');
        }
      } catch (error) {
        console.error('Error searching for airport:', error);
      }
    },
    [viewer]
  );

  return searchAndFlyTo;
};

export default useSearchAndFlyTo;
