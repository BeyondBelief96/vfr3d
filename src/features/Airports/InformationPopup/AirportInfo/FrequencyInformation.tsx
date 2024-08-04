import { CommunicationFrequencyDto } from 'vfr3d-shared';
import { CollapsibleSection } from '../../../../components/ReusableComponents/CollapsableSection';

const FrequencyTable: React.FC<{ frequencies: CommunicationFrequencyDto[] }> = ({
  frequencies,
}) => {
  const groupedFrequencies = frequencies.reduce(
    (acc, freq) => {
      const sector = freq.sectorization || 'No Sector';
      if (!acc[sector]) {
        acc[sector] = [];
      }
      acc[sector].push(freq);
      return acc;
    },
    {} as Record<string, CommunicationFrequencyDto[]>
  );

  const sortedSectors = Object.keys(groupedFrequencies).sort();

  const sortFrequencies = (freqs: CommunicationFrequencyDto[]) => {
    const order = [
      'APCH/P',
      'DEP/P',
      'LCL/P',
      'GND/P',
      'EMERG',
      'UNICOM',
      'CD PRE TAXI CLNC',
      'D-ATIS',
      'ALCP',
    ];
    return freqs.sort((a, b) => {
      const indexA = order.indexOf(a.frequencyUse ?? '');
      const indexB = order.indexOf(b.frequencyUse ?? '');
      if (indexA === -1 && indexB === -1) return 0;
      if (indexA === -1) return 1;
      if (indexB === -1) return -1;
      return indexA - indexB;
    });
  };

  return (
    <div className="overflow-x-auto">
      {sortedSectors.map((sector) => (
        <div key={sector} className="mb-4">
          <h3 className="mb-2 text-lg font-semibold">{sector}</h3>
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-base-300">
                <th className="px-2 py-2 text-sm text-left">Use</th>
                <th className="px-2 py-2 text-sm text-left">Frequency</th>
                <th className="px-2 py-2 text-sm text-left">Tower Hours</th>
                <th className="px-2 py-2 text-sm text-left">Remarks</th>
              </tr>
            </thead>
            <tbody>
              {sortFrequencies(groupedFrequencies[sector]).map((freq, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-base-100' : 'bg-base-200'}>
                  <td className="px-2 py-1 text-sm">{translateFreqUse(freq.frequencyUse ?? '')}</td>
                  <td className="px-2 py-1 text-sm">{freq.frequency}</td>
                  <td className="px-2 py-1 text-sm">{freq.towerHours || 'N/A'}</td>
                  <td className="px-2 py-1 text-sm">
                    {freq.remark ? (
                      <div className="overflow-y-auto max-h-20">
                        <span className="text-xs lowercase first-letter:uppercase">
                          {freq.remark}
                        </span>
                      </div>
                    ) : (
                      'N/A'
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

const translateFreqUse = (freqUse: string | null): string => {
  const translations: { [key: string]: string } = {
    'APCH/P': 'APCH',
    'DEP/P': 'DEP',
    'LCL/P': 'TWR',
    'GND/P': 'GND',
  };
  return translations[freqUse || ''] || freqUse || 'Unknown';
};

export const FrequencyInformation: React.FC<{
  frequencies: CommunicationFrequencyDto[] | undefined;
  expanded: boolean;
  toggleSection: () => void;
}> = ({ frequencies, expanded, toggleSection }) => (
  <CollapsibleSection title="Frequencies" expanded={expanded} toggleSection={toggleSection}>
    {frequencies && frequencies.length > 0 ? (
      <FrequencyTable frequencies={frequencies} />
    ) : (
      <div>No frequency information available</div>
    )}
  </CollapsibleSection>
);
