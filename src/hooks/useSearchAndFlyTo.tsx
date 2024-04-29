import { Math } from 'cesium';
import { useCallback } from 'react';
import { useCesium } from 'resium';
import { getAirportByIcaoCode, getAirportByIdent } from '../api/faa-api/faa-airports';
import { mapAirportDataToCartesian3 } from '../utility/utils';

const useSearchAndFlyTo = () => {
  const { viewer } = useCesium();

  const searchAndFlyTo = useCallback(
    async (icaoCode: string) => {
      try {
        let airport = await getAirportByIcaoCode(icaoCode);
        // If ICAO code fails, search by IDENT. Usually smaller airports don't have an ICAO code,
        //but have some other identifier name.
        if (!airport) airport = await getAirportByIdent(icaoCode);
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
