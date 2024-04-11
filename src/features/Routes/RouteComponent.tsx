import { Color } from 'cesium';
import { Entity as ResiumEntity } from 'resium';
import { Airport } from '../../api/types';
import { mapAirportDataToCartesian3 } from '../../utility/utils';

interface RouteComponentProps {
  fromAirport: Airport | undefined;
  toAirport: Airport | undefined;
}

const RouteComponent: React.FC<RouteComponentProps> = ({ fromAirport, toAirport }) => {
  if (!fromAirport || !toAirport) return;
  const fromPosition = mapAirportDataToCartesian3(fromAirport);
  const toPosition = mapAirportDataToCartesian3(toAirport);
  if (!fromPosition || !toPosition) return null;
  return (
    <ResiumEntity
      polyline={{
        positions: [fromPosition, toPosition],
        width: 3,
        material: Color.AQUA,
      }}
    />
  );
};

export default RouteComponent;
