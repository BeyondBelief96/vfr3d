import { PirepDTO } from 'vfr3d-shared';
import { mapPirepToCartesian3 } from '../../utility/cesiumUtils';
import { NearFarScalar } from 'cesium';
import { BillboardEntity } from '../../components/ReusableComponents/cesium/BillboardEntity';

interface PirepEntityProps {
  pirep: PirepDTO;
}

export const PirepEntity: React.FC<PirepEntityProps> = ({ pirep }) => {
  if (!pirep) return;
  const position = mapPirepToCartesian3(pirep);
  return position ? (
    <BillboardEntity
      image={'./pirepsymbol.png'}
      id={pirep.id.toString()}
      position={position}
      scaleByDistance={new NearFarScalar(1000000, 0.07, 5000000, 0.05)}
    />
  ) : null;
};
