import React, { useEffect, useCallback } from 'react';
import { ScreenSpaceEventHandler, ScreenSpaceEventType } from 'cesium';
import { useCesium } from 'resium';
import { Airport } from '../../redux/api/faa/faa.interface';
import { MetarDTO } from 'vfr3d-shared';
import AirportEntity from './AirportEntity';
import { getAirportEntityIdFromAirport } from '../../utility/entityIdUtils';
import { useAppDispatch } from '../../hooks/reduxHooks';
import { setSelectedEntity } from '../../redux/slices/selectedEntitySlice';

interface AirportEntitiesProps {
  airports: Airport[];
  metarMap: Map<string, MetarDTO>;
}

const AirportEntities: React.FC<AirportEntitiesProps> = ({ airports, metarMap }) => {
  const { viewer } = useCesium();
  const dispatch = useAppDispatch();

  const handleClick = useCallback(
    (movement: ScreenSpaceEventHandler.PositionedEvent) => {
      if (!viewer) return;
      const pickedObject = viewer.scene.pick(movement.position);
      if (pickedObject?.id) {
        const airport = airports.find(
          (airport) => getAirportEntityIdFromAirport(airport) === pickedObject.id.id
        );
        if (airport) {
          dispatch(setSelectedEntity({ entity: airport, type: 'Airport' }));
        }
      }
    },
    [viewer, airports, dispatch]
  );

  useEffect(() => {
    if (!viewer) return;
    const handler = new ScreenSpaceEventHandler(viewer.scene.canvas);
    handler.setInputAction(handleClick, ScreenSpaceEventType.LEFT_CLICK);
    return () => handler.destroy();
  }, [viewer, handleClick]);

  return (
    <>
      {airports.map((airport) => (
        <AirportEntity
          key={airport.GLOBAL_ID}
          airport={airport}
          metar={metarMap.get(airport.ICAO_ID || 'K' + airport.IDENT)}
        />
      ))}
    </>
  );
};

export default AirportEntities;
