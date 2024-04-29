import { Math } from 'cesium';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useCesium } from 'resium';
import { getAirportByIcaoCode, getAirportByIdent } from '../../api/faa-api/faa-airports';
import { RootState } from '../../redux/store';
import { mapAirportDataToCartesian3 } from '../../utility/utils';

const FlyTo = () => {
  const { viewer } = useCesium();
  const searchQuery = useSelector((state: RootState) => state.search.airportQuery);

  useEffect(() => {
    const searchAndFlyTo = async () => {
      try {
        let airport = await getAirportByIcaoCode(searchQuery);

        if (!airport) {
          airport = await getAirportByIdent(searchQuery);
        }

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
    };

    if (searchQuery) {
      searchAndFlyTo();
    }
  }, [searchQuery, viewer]);

  return null;
};

export default FlyTo;
