import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Entity } from 'resium';
import { fetchAirportsByState } from '../../redux/slices/airportsSlice';
import { updateCurrentAirportEntityIds } from '../../redux/slices/entitiesSlice';
import { AppDispatch, RootState } from '../../redux/store';
import { mapAirportDataToCartesian3 } from '../../utility/utils';

const VisibleAirports: React.FC = () => {
  const {
    showAirports,
    visibleAirports,
    selectedState: selectedStateAirports,
  } = useSelector((state: RootState) => state.airport);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchAirportsByState(selectedStateAirports));
  }, [dispatch, selectedStateAirports]);

  useEffect(() => {
    if (showAirports) {
      const newEntityIds = visibleAirports.map((airport) => airport.GLOBAL_ID);
      dispatch(updateCurrentAirportEntityIds(newEntityIds));
    } else {
      dispatch(updateCurrentAirportEntityIds([]));
    }
  }, [showAirports, visibleAirports, dispatch]);

  if (!showAirports) return null;
  return (
    <>
      {visibleAirports.map((airport) => {
        const position = mapAirportDataToCartesian3(airport);
        if (!position) return null;

        return (
          <Entity
            key={airport.GLOBAL_ID}
            id={airport.GLOBAL_ID}
            position={position}
            point={{ pixelSize: 10 }}
            show={showAirports}
          />
        );
      })}
    </>
  );
};

export default VisibleAirports;
