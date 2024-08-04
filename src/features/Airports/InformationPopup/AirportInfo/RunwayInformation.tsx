import { CollapsibleSection } from '../../../../components/ReusableComponents/CollapsableSection';
import { Runway } from '../../../../redux/api/faa/faa.interface';
import { InfoItem } from './InfoItem';

export const RunwayInformation: React.FC<{
  runwayInformation: Runway[] | undefined;
  expanded: boolean;
  toggleSection: () => void;
}> = ({ runwayInformation, expanded, toggleSection }) => (
  <CollapsibleSection title="Runway Information" expanded={expanded} toggleSection={toggleSection}>
    {runwayInformation && runwayInformation.length > 0 ? (
      runwayInformation.map((runway: Runway) => (
        <div key={runway.OBJECTID} className="mb-4 last:mb-0">
          <h4 className="mb-2 font-semibold">Runway {runway.DESIGNATOR}</h4>
          <div className="pl-4">
            <InfoItem label="Length" value={`${runway.LENGTH} ${runway.DIM_UOM}`} />
            <InfoItem label="Width" value={`${runway.WIDTH} ${runway.DIM_UOM}`} />
            <InfoItem label="Surface" value={runway.COMP_CODE} />
            {runway.LIGHTACTV !== null && (
              <InfoItem label="Lighting" value={runway.LIGHTACTV ? 'Available' : 'Not Available'} />
            )}
          </div>
        </div>
      ))
    ) : (
      <div>No runway information available</div>
    )}
  </CollapsibleSection>
);
