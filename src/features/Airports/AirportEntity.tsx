// AirportEntity.tsx
import { Color, NearFarScalar } from 'cesium';
import React, { useCallback } from 'react';
import { mapAirportDataToCartesian3 } from '../../utility/utils';
import { MetarDTO } from 'vfr3d-shared';
import { FlightCategories } from '../../utility/constants';
import { Airport } from '../../redux/api/faa/faa.interface';
import { useDispatch } from 'react-redux';
import { setSelectedAirport } from '../../redux/slices/airportsSlice';
import { PointEntity } from '../../ui/ReusableComponents/cesium/PointEntity';

interface AirportEntityProps {
  airport: Airport;
  metar?: MetarDTO;
}

const AirportEntity: React.FC<AirportEntityProps> = React.memo(({ airport, metar }) => {
  const dispatch = useDispatch();
  const position = mapAirportDataToCartesian3(airport);

  const handleClick = useCallback(() => {
    dispatch(setSelectedAirport(airport));
  }, [airport, dispatch]);

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

  return position ? (
    <PointEntity
      position={position}
      color={color}
      id={airport.GLOBAL_ID}
      scaleByDistance={new NearFarScalar(1000000, 2, 5000000, 1)}
      onClick={handleClick}
    />
  ) : null;
});

export default AirportEntity;
