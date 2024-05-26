// PirepInfo.tsx
import { PirepDTO } from 'vfr3d-shared';
import PirepRawText from './PirepRawText';
import PirepDecodedData from './PirepDecodedData';

interface PirepInfoProps {
  pirep: PirepDTO;
}

const PirepInfo: React.FC<PirepInfoProps> = ({ pirep }) => {
  return (
    <div className="space-y-4">
      <PirepRawText rawText={pirep.rawText || ''} />
      <div className="divider"></div>
      <PirepDecodedData pirep={pirep} />
    </div>
  );
};

export default PirepInfo;
