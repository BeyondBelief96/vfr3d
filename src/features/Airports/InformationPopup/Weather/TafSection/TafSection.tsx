import { TafDTO } from 'vfr3d-shared';
import { useState } from 'react';
import TafRawText from './TafRawText';
import TafDecodedData from './TafDecodedData';

interface TafSectionProps {
  taf: TafDTO;
}

const TafSection: React.FC<TafSectionProps> = ({ taf }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="space-y-4">
      <TafRawText rawText={taf.rawText ?? ''} />
      <div className="divider"></div>
      <div className="collapse collapse-arrow" onClick={toggleExpand}>
        <input type="checkbox" className="peer" checked={isExpanded} readOnly />
        <div className="font-medium collapse-title peer-checked:bg-base-200 peer-checked:text-primary-content">
          Decoded TAF
        </div>
        <div className="collapse-content peer-checked:bg-base-200 peer-checked:text-primary-content">
          <TafDecodedData taf={taf} />
        </div>
      </div>
    </div>
  );
};

export default TafSection;
