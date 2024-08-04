import { AirportDTO } from 'vfr3d-shared';
import { CollapsibleSection } from '../../../../components/ReusableComponents/CollapsableSection';
import { InfoItem } from './InfoItem';

export const OperationalInformation: React.FC<{
  airport: AirportDTO;
  expanded: boolean;
  toggleSection: () => void;
}> = ({ airport, expanded, toggleSection }) => (
  <CollapsibleSection
    title="Operational Information"
    expanded={expanded}
    toggleSection={toggleSection}
  >
    <InfoItem label="Fuel Types" value={airport.fuelTypes} />
    <InfoItem label="Customs" value={airport.customsFlag === 'Y' ? 'Available' : 'Not Available'} />
    <InfoItem
      label="Landing Rights"
      value={airport.lndgRightsFlag === 'Y' ? 'Available' : 'Not Available'}
    />
    <InfoItem label="Joint Use" value={airport.jointUseFlag === 'Y' ? 'Yes' : 'No'} />
    <InfoItem
      label="Military Landing"
      value={airport.milLndgFlag === 'Y' ? 'Allowed' : 'Not Allowed'}
    />
  </CollapsibleSection>
);
