// AirportEntities.tsx
import { ScreenSpaceEventHandler, ScreenSpaceEventType } from 'cesium';
import React, { useEffect, useRef } from 'react';
import { useCesium } from 'resium';
import { useDispatch } from 'react-redux';
import { setSelectedAirport } from '../../redux/slices/airportsSlice';
import { Airport } from '../../redux/api/faa/faa.interface';
import AirportEntity from './AirportEntity';
import { MetarDTO } from 'vfr3d-shared';

interface AirportEntitiesProps {
  airports: Airport[];
  metarMap: Map<string, MetarDTO>;
}

const AirportEntities: React.FC<AirportEntitiesProps> = ({ airports, metarMap }) => {
  const { viewer } = useCesium();
  const dispatch = useDispatch();
  const handlerRef = useRef<ScreenSpaceEventHandler | null>(null);

  useEffect(() => {
    if (!viewer) return;

    const handler = new ScreenSpaceEventHandler(viewer.scene.canvas);
    handlerRef.current = handler;

    const handleClick = (movement: ScreenSpaceEventHandler.PositionedEvent) => {
      if (!viewer) return;

      const pickedObject = viewer.scene.pick(movement.position);

      if (pickedObject && pickedObject.id) {
        const airport = airports.find((a) => a.GLOBAL_ID === pickedObject.id.id);
        if (airport) {
          dispatch(setSelectedAirport(airport));
        }
      }
    };

    handler.setInputAction(handleClick, ScreenSpaceEventType.LEFT_CLICK);

    return () => {
      handler.destroy();
    };
  }, [viewer, airports, dispatch]);

  return (
    <>
      {airports.map((airport) => {
        const metar = metarMap.get(airport.ICAO_ID || 'K' + airport.IDENT);
        return <AirportEntity key={airport.GLOBAL_ID} airport={airport} metar={metar} />;
      })}
    </>
  );
};

export default AirportEntities;
