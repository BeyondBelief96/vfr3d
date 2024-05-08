import { MetarDTO } from 'vfr3d-shared';
import { useState } from 'react';
import MetarRawText from './MetarRawText';
import DecodedMetarTitle from './DecodedMetarTitle';
import MetarDecodedData from './DecodedMetar';

interface MetarSectionProps {
  metar: MetarDTO;
}

const MetarSection: React.FC<MetarSectionProps> = ({ metar }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="space-y-4">
      <MetarRawText rawText={metar.rawText ?? ''} />
      <div className="divider"></div>
      <div className="collapse collapse-arrow" onClick={toggleExpand}>
        <input type="checkbox" className="peer" checked={isExpanded} readOnly />
        <div className="font-medium collapse-title peer-checked:bg-base-200 peer-checked:text-info">
          <DecodedMetarTitle flightCategory={metar.flightCategory ?? ''} />
        </div>
        <div className="collapse-content peer-checked:bg-base-200 peer-checked:text-primary-content">
          <MetarDecodedData metar={metar} />
        </div>
      </div>
    </div>
  );
};

export default MetarSection;
