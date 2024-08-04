import { AirportDTO } from 'vfr3d-shared';
import { CollapsibleSection } from '../../../../components/ReusableComponents/CollapsableSection';
import { InfoItem } from './InfoItem';

export const LocationInformation: React.FC<{
  airport: AirportDTO;
  expanded: boolean;
  toggleSection: () => void;
}> = ({ airport, expanded, toggleSection }) => (
  <CollapsibleSection title="Location" expanded={expanded} toggleSection={toggleSection}>
    <InfoItem label="Latitude" value={airport.latDecimal} />
    <InfoItem label="Longitude" value={airport.longDecimal} />
    <InfoItem label="Elevation" value={airport.elev ? `${airport.elev} ft` : undefined} />
    <InfoItem label="City" value={airport.city} />
    <InfoItem label="State" value={airport.stateName} />
    <InfoItem label="Country" value={airport.countryCode} />
  </CollapsibleSection>
);
