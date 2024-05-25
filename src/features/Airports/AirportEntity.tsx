// AirportEntity.tsx
import { Cartesian2, Color, NearFarScalar } from 'cesium';
import React from 'react';
import { MetarDTO } from 'vfr3d-shared';
import { FlightCategories } from '../../utility/constants';
import { Airport } from '../../redux/api/faa/faa.interface';
import { PointEntity } from '../../components/ReusableComponents/cesium/PointEntity';
import { mapAirportDataToCartesian3 } from '../../utility/cesiumUtils';
import { getAirportEntityIdFromAirport } from '../../utility/entityIdUtils';
import { useSelector } from 'react-redux';
import { AppState } from '../../redux/store';

interface AirportEntityProps {
  airport: Airport;
  metar?: MetarDTO;
}

const AirportEntity: React.FC<AirportEntityProps> = ({ airport, metar }) => {
  const showCloudBases = useSelector((state: AppState) => state.airport.showCloudBases);
  const position = mapAirportDataToCartesian3(airport);
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
      id={getAirportEntityIdFromAirport(airport)}
      scaleByDistance={new NearFarScalar(1000000, 1.5, 5000000, 1)}
      {...(showCloudBases &&
        metar?.skyConditions?.[0]?.cloudBaseFtAgl && {
          labelText: metar.skyConditions[0].cloudBaseFtAgl.toString(),
          labelBackgroundColor: color,
          labelPixelOffset: new Cartesian2(0, -20),
          labelScaleByDistance: new NearFarScalar(100000, 0.5, 500000, 0.3),
        })}
    />
  ) : null;
};

export default AirportEntity;
