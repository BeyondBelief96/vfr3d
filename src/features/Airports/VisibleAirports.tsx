import { Entity } from 'cesium';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useCesium } from 'resium';
import { fetchAirportsByState } from '../../redux/slices/airportsSlice';
import { setAirportEntityIds } from '../../redux/slices/entitiesSlice';
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

    if (!showAirports || !viewer) {
      dispatch(setAirportEntityIds([])); // Clear airport entity IDs in the store
      return;
    }

    // Add new entities
    const newEntityIds: string[] = [];
    visibleAirports.forEach((airport) => {
      const position = mapAirportDataToCartesian3(airport);
      if (!position) return;

      const entity = viewer.entities.add({
        position,
        point: { pixelSize: 10 },
      });
      entityRefs.current[airport.GLOBAL_ID] = entity;
      newEntityIds.push(airport.GLOBAL_ID);
    });

    dispatch(setAirportEntityIds(newEntityIds)); // Update airport entity IDs in the store
  }, [showAirports, viewer, visibleAirports, dispatch]);

  return null;
};

export default VisibleAirports;
