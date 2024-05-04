import { Math } from 'cesium';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useCesium } from 'resium';
import { getAirportByIcaoCodeOrIdent } from '../../api/faa-api/faa.api';
import { RootState } from '../../redux/store';
import { mapAirportDataToCartesian3 } from '../../utility/utils';
import { setSelectedAirport } from '../../redux/slices/airportsSlice';

const FlyTo = () => {
  const { viewer } = useCesium();
  const searchQuery = useSelector((state: RootState) => state.search.airportQuery);
  const triggerSearchCount = useSelector((state: RootState) => state.search.triggerSearchCount);
  const dispatch = useDispatch();

  useEffect(() => {
    const searchAndFlyTo = async () => {
      try {
        const airport = await getAirportByIcaoCodeOrIdent(searchQuery);
        if (airport) {
          dispatch(setSelectedAirport(airport));
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
  }, [triggerSearchCount, searchQuery, viewer, dispatch]);

  return null;
};

export default FlyTo;
