import { AirportDTO } from 'vfr3d-shared';
import { CollapsibleSection } from '../../../../components/ReusableComponents/CollapsableSection';
import { InfoItem } from './InfoItem';

export const GeneralInformation: React.FC<{
  airport: AirportDTO;
  expanded: boolean;
  toggleSection: () => void;
}> = ({ airport, expanded, toggleSection }) => (
  <CollapsibleSection title="General Information" expanded={expanded} toggleSection={toggleSection}>
    <InfoItem label="IDENT" value={airport.arptId} />
    <InfoItem label="ICAO Code" value={airport.icaoId} />
    <InfoItem label="Type" value={airport.siteTypeCode} />
  </CollapsibleSection>
);
