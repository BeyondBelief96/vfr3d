import { Entity } from 'cesium';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useCesium } from 'resium';
import { fetchAirportsByState } from '../../redux/slices/airportsSlice';
import { AppDispatch, RootState } from '../../redux/store';
import { mapAirportDataToCartesian3 } from '../../utility/utils';

const VisibleAirports: React.FC = () => {
  const { showAirports, visibleAirports, selectedStateAirports } = useSelector(
    (state: RootState) => state.airport
  );
  const dispatch = useDispatch<AppDispatch>();
  const { viewer } = useCesium();
  const entityRefs = useRef<Record<string, Entity>>({});

  useEffect(() => {
    dispatch(fetchAirportsByState(selectedStateAirports));
  }, [dispatch, selectedStateAirports]);

  useEffect(() => {
    // Remove existing entities
    Object.values(entityRefs.current).forEach((entity) => viewer?.entities.remove(entity));
    entityRefs.current = {};

    if (!showAirports || !viewer) return;

    // Add new entities
    visibleAirports.forEach((airport) => {
      const position = mapAirportDataToCartesian3(airport);
      if (!position) return;

      const entity = viewer.entities.add({
        position,
        point: { pixelSize: 10 },
      });
      entityRefs.current[airport.GLOBAL_ID] = entity;
    });
  }, [showAirports, viewer, visibleAirports]);

  return null;
};

export default VisibleAirports;
