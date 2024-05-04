// AirportEntity.tsx
import { Entity, PointGraphics, Color, ConstantProperty, NearFarScalar } from 'cesium';
import { useEffect, useRef } from 'react';
import { useCesium } from 'resium';
import { mapAirportDataToCartesian3 } from '../../utility/utils';
import { MetarDTO } from 'vfr3d-shared';
import { FlightCategories } from '../../utility/constants';
import React from 'react';
import { Airport } from '../../redux/api/faa/faa.interface';

interface AirportEntityProps {
  airport: Airport;
  metar?: MetarDTO;
}

const AirportEntity: React.FC<AirportEntityProps> = React.memo(({ airport, metar }) => {
  const { viewer } = useCesium();
  const entityRef = useRef<Entity | null>(null);

  useEffect(() => {
    if (!viewer) return;

    const position = mapAirportDataToCartesian3(airport);
    if (!position) return;

    let color = Color.WHITE;
    if (metar) {
      switch (metar.flightCategory) {
        case FlightCategories.VFR:
          color = Color.GREEN;
          break;
        case FlightCategories.MVFR:
          color = Color.BLUE;
          break;
        case FlightCategories.IFR:
          color = Color.RED;
          break;
        case FlightCategories.LIFR:
          color = Color.PURPLE;
          break;
      }
    }

    const entity = viewer.entities.add({
      position,
      point: new PointGraphics({
        color: new ConstantProperty(color),
        pixelSize: new ConstantProperty(20),
        scaleByDistance: new NearFarScalar(1000000, 1, 5000000, 0.5),
      }),
      id: airport.GLOBAL_ID,
    });

    entityRef.current = entity;

    return () => {
      if (viewer && entity) {
        viewer.entities.remove(entity);
      }
    };
  }, [viewer, airport, metar]);

  return null;
});

export default AirportEntity;
