import { AirportDTO } from 'vfr3d-shared';
import { CollapsibleSection } from '../../../../components/ReusableComponents/CollapsableSection';
import { InfoItem } from './InfoItem';

export const ContactInformation: React.FC<{
  airport: AirportDTO;
  expanded: boolean;
  toggleSection: () => void;
}> = ({ airport, expanded, toggleSection }) => (
  <CollapsibleSection title="Contact Information" expanded={expanded} toggleSection={toggleSection}>
    <InfoItem label="Contact Title" value={airport.contactTitle} />
    <InfoItem label="Contact Name" value={airport.contactName} />
    <InfoItem label="Address" value={airport.contactAddress1} />
    {airport.contactAddress2 && <InfoItem label="Address 2" value={airport.contactAddress2} />}
    <InfoItem label="City" value={airport.contactCity} />
    <InfoItem label="State" value={airport.contactState} />
    <InfoItem
      label="Zip Code"
      value={`${airport.contactZipCode}${airport.conactZipPlusFour ? '-' + airport.conactZipPlusFour : ''}`}
    />
    <InfoItem label="Phone" value={airport.contactPhoneNumber} />
  </CollapsibleSection>
);
