import { Math } from 'cesium';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useCesium } from 'resium';
import { RootState } from '../../redux/store';
import { mapAirportDataToCartesian3 } from '../../utility/utils';
import { setSelectedAirport } from '../../redux/slices/airportsSlice';
import { useGetAirportByIcaoCodeOrIdentQuery } from '../../redux/api/faa/faaApi';

const FlyTo = () => {
  const { viewer } = useCesium();
  const searchQuery = useSelector((state: RootState) => state.search.airportQuery);
  const triggerSearchCount = useSelector((state: RootState) => state.search.triggerSearchCount);
  const dispatch = useDispatch();

  const { data: airport } = useGetAirportByIcaoCodeOrIdentQuery(searchQuery, {
    skip: !searchQuery,
  });

  useEffect(() => {
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
    }
  }, [airport, viewer, dispatch, triggerSearchCount]);

  return null;
};

export default FlyTo;
