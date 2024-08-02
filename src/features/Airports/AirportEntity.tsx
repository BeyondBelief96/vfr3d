import React, { memo } from 'react';
import { Cartesian2, Color, NearFarScalar } from 'cesium';
import { AirportDTO, MetarDTO } from 'vfr3d-shared';
import { FlightCategories } from '../../utility/enums';
import { PointEntity } from '../../components/ReusableComponents/cesium/PointEntity';
import { mapAirportDataToCartesian3 } from '../../utility/cesiumUtils';
import { getAirportEntityIdFromAirport } from '../../utility/entityIdUtils';
import { useAppSelector } from '../../hooks/reduxHooks';

interface AirportEntityProps {
  airport: AirportDTO;
  metar?: MetarDTO;
}

const AirportEntity: React.FC<AirportEntityProps> = memo(({ airport, metar }) => {
  const showCloudBases = useAppSelector((state) => state.airport.showCloudBases);
  const position = mapAirportDataToCartesian3(airport);

  if (!position) return null;

  function getColorForMetar(metar?: MetarDTO): Color {
    if (!metar) return Color.WHITE;

    switch (metar.flightCategory) {
      case FlightCategories.VFR:
        return Color.GREEN;
      case FlightCategories.MVFR:
        return Color.BLUE;
      case FlightCategories.IFR:
        return Color.RED;
      case FlightCategories.LIFR:
        return Color.PURPLE;
      default:
        return Color.WHITE;
    }
  }

  function getCloudBaseLabel(showCloudBases: boolean, metar?: MetarDTO, color?: Color) {
    if (!showCloudBases || !metar?.skyConditions?.[0]?.cloudBaseFtAgl) return {};

    return {
      labelText: metar.skyConditions[0].cloudBaseFtAgl.toString(),
      labelBackgroundColor: color,
      labelPixelOffset: new Cartesian2(0, -20),
      labelScaleByDistance: new NearFarScalar(100000, 0.5, 500000, 0.3),
    };
  }

  const color = getColorForMetar(metar);
  const cloudBaseLabel = getCloudBaseLabel(showCloudBases, metar, color);

  return (
    <PointEntity
      position={position}
      color={color}
      id={getAirportEntityIdFromAirport(airport)}
      scaleByDistance={new NearFarScalar(1000000, 1.5, 5000000, 1)}
      {...cloudBaseLabel}
    />
  );
});

export default AirportEntity;
