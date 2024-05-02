import { Entity, ScreenSpaceEventHandler, ScreenSpaceEventType } from 'cesium';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useCesium } from 'resium';
import {
  clearVisibleAirports,
  fetchAirportsByState,
  setSelectedAirport,
} from '../../redux/slices/airportsSlice';
import { AppDispatch, RootState } from '../../redux/store';
import { mapAirportDataToCartesian3 } from '../../utility/utils';

const VisibleAirports: React.FC = () => {
  const { showAirports, visibleAirports, selectedState } = useSelector(
    (state: RootState) => state.airport
  );
  const dispatch = useDispatch<AppDispatch>();
  const { viewer } = useCesium();
  const entityRefs = useRef<Record<string, Entity>>({});

  useEffect(() => {
    if (showAirports) {
      dispatch(fetchAirportsByState(selectedState));
    } else {
      dispatch(clearVisibleAirports());
    }
  }, [dispatch, selectedState, showAirports]);

  useEffect(() => {
    if (!viewer) return;

    // Remove existing entities
    Object.values(entityRefs.current).forEach((entity) => viewer.entities.remove(entity));
    entityRefs.current = {};

    if (!showAirports) return;

    // Add new entities
    visibleAirports.forEach((airport) => {
      const position = mapAirportDataToCartesian3(airport);
      if (!position) return;

      const entity = viewer?.entities.add({
        position,
        point: { pixelSize: 10 },
        id: airport.GLOBAL_ID,
      });
      entityRefs.current[airport.GLOBAL_ID] = entity;
    });
  }, [showAirports, viewer, visibleAirports]);

  useEffect(() => {
    const handleClickAirport = (event: ScreenSpaceEventHandler.PositionedEvent) => {
      const pickedObject = viewer?.scene.pick(event.position);
      if (pickedObject && pickedObject.id) {
        const airportEntity = pickedObject.id as Entity;
        const airportEntityId = airportEntity.id;
        if (entityRefs.current[airportEntityId]) {
          const airport = visibleAirports.find((airport) => airport.GLOBAL_ID === airportEntityId);
          dispatch(setSelectedAirport(airport || null));
        } else {
          dispatch(setSelectedAirport(null));
        }
      }
    };

    viewer?.screenSpaceEventHandler.setInputAction(
      handleClickAirport,
      ScreenSpaceEventType.LEFT_CLICK
    );

    return () => {
      viewer?.screenSpaceEventHandler.removeInputAction(ScreenSpaceEventType.LEFT_CLICK);
    };
  }, [viewer, visibleAirports, dispatch]);

  return null;
};

export default VisibleAirports;
