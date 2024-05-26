// PirepDecodedData.tsx
import { PirepDTO } from 'vfr3d-shared';

interface PirepDecodedDataProps {
  pirep: PirepDTO;
}

interface DecodedPirep {
  station: string;
  type: string;
  location: string;
  time: string;
  altitude: string;
  aircraftType: string;
  skyCondition?: string;
  weather?: string;
  temperature?: string;
  wind?: string;
  turbulence?: string;
  icing?: string;
}

function decodePirep(pirepText: string): DecodedPirep | null {
  const parts = pirepText.split('/');

  if (parts.length < 6) {
    return null;
  }

  const station = parts[0].trim();
  const type = parts[0].trim().slice(-2);
  const location = parts[1].split(' ')[1];
  const time = parts[2].split(' ')[1];
  const altitude = parts[3].slice(2);
  const aircraftType = parts[4].slice(2);

  const decodedPirep: DecodedPirep = {
    station,
    type,
    location,
    time,
    altitude,
    aircraftType,
  };

  let i = 5;
  while (i < parts.length) {
    const part = parts[i];
    if (part.startsWith('SK')) {
      decodedPirep.skyCondition = part.slice(2).trim();
      i++;
    } else if (part.startsWith('WX')) {
      decodedPirep.weather = part.slice(2).trim();
      i++;
    } else if (part.startsWith('TA')) {
      decodedPirep.temperature = part.slice(2).trim();
      i++;
    } else if (part.startsWith('WV')) {
      let wind = part.slice(2).trim();
      if (i + 1 < parts.length && parts[i + 1] === '+/-') {
        wind += ' +/-';
        i++;
      }
      decodedPirep.wind = wind;
      i++;
    } else if (part.startsWith('TB')) {
      decodedPirep.turbulence = part.slice(2).trim();
      i++;
    } else if (part.startsWith('IC')) {
      decodedPirep.icing = part.slice(2).trim();
      i++;
    } else {
      i++;
    }
  }

  return decodedPirep;
}

const PirepDecodedData: React.FC<PirepDecodedDataProps> = ({ pirep }) => {
  let decodedPirep = null;
  if (pirep.reportType === 'PIREP') {
    decodedPirep = decodePirep(pirep.rawText || '');
  }

  return (
    <div className="space-y-2">
      {decodedPirep && (
        <div className="flex items-center space-x-2">
          <span className="font-semibold">Station:</span>
          <span>{decodedPirep.station}</span>
        </div>
      )}

      {decodedPirep && (
        <div className="flex items-center space-x-2">
          <span className="font-semibold">Location:</span>
          <span>{decodedPirep.location}</span>
        </div>
      )}

      {pirep.observationTime && (
        <div className="flex items-center space-x-2">
          <span className="font-semibold">Observation Time:</span>
          <span>{pirep.observationTime.toString()}</span>
        </div>
      )}

      {pirep.altitudeFtMsl !== undefined && (
        <div className="flex items-center space-x-2">
          <span className="font-semibold">Altitude:</span>
          <span>{pirep.altitudeFtMsl} ft MSL</span>
        </div>
      )}

      {pirep.skyCondition && (
        <div>
          <span className="font-semibold">Sky Condition:</span>
          <div className="overflow-x-auto">
            <table className="table w-full">
              <tbody>
                <tr>
                  <th>Sky Cover</th>
                  <th>Cloud Top (ft MSL)</th>
                  <th>Cloud Base (ft MSL)</th>
                </tr>
                <tr>
                  <td>{pirep.skyCondition.skyCover}</td>
                  <td>{pirep.skyCondition.cloudTopFtMsl}</td>
                  <td>{pirep.skyCondition.cloudBaseFtMsl}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {decodedPirep?.skyCondition && (
        <div className="flex items-center space-x-2">
          <span className="font-semibold">SK:</span>
          <span>{decodedPirep.skyCondition}</span>
        </div>
      )}

      {pirep.skyCondition || decodedPirep?.skyCondition ? <div className="divider"></div> : null}

      {pirep.turbulenceCondition && (
        <div>
          <span className="font-semibold">Turbulence:</span>
          <div className="overflow-x-auto">
            <table className="table w-full">
              <tbody>
                <tr>
                  <th>Frequency</th>
                  <th>Type</th>
                  <th>Intensity</th>
                </tr>
                <tr>
                  <td>{pirep.turbulenceCondition.turbulenceFreq}</td>
                  <td>{pirep.turbulenceCondition.turbulenceType}</td>
                  <td>{pirep.turbulenceCondition.turbulenceIntensity}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {decodedPirep?.turbulence && (
        <div className="flex items-center space-x-2">
          <span className="font-semibold">TB:</span>
          <span>{decodedPirep.turbulence}</span>
        </div>
      )}

      {pirep.turbulenceCondition || decodedPirep?.turbulence ? (
        <div className="divider"></div>
      ) : null}

      {pirep.icingCondition && (
        <div>
          <span className="font-semibold">Icing:</span>
          <div className="overflow-x-auto">
            <table className="table w-full">
              <tbody>
                <tr>
                  <th>Type</th>
                  <th>Intensity</th>
                  <th>Top (ft MSL)</th>
                  <th>Base (ft MSL)</th>
                </tr>
                <tr>
                  <td>{pirep.icingCondition.icingType}</td>
                  <td>{pirep.icingCondition.icingIntensity}</td>
                  <td>{pirep.icingCondition.icingTopFtMsl}</td>
                  <td>{pirep.icingCondition.icingBaseFtMsl}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {decodedPirep?.icing && (
        <>
          <div className="flex items-center space-x-2">
            <span className="font-semibold">IC:</span>
            <span>{decodedPirep.icing}</span>
          </div>
        </>
      )}

      {pirep.icingCondition || decodedPirep?.icing ? <div className="divider"></div> : null}

      {pirep.visibilityStatuteMi !== null && (
        <div className="flex items-center space-x-2">
          <span className="font-semibold">Visibility (mi):</span>
          <span>{pirep.visibilityStatuteMi}</span>
        </div>
      )}

      {pirep.wxString && !decodedPirep?.weather && (
        <div className="flex items-center space-x-2">
          <span className="font-semibold">Weather:</span>
          <span>{pirep.wxString}</span>
        </div>
      )}

      {decodedPirep?.weather && (
        <div className="flex items-center space-x-2">
          <span className="font-semibold">Weather:</span>
          <span>{decodedPirep.weather}</span>
        </div>
      )}

      {pirep.tempC !== null && !decodedPirep?.temperature && (
        <div className="flex items-center space-x-2">
          <span className="font-semibold">Temperature:</span>
          <span>{pirep.tempC?.toString()}°C</span>
        </div>
      )}

      {decodedPirep?.temperature && (
        <div className="flex items-center space-x-2">
          <span className="font-semibold">Temperature:</span>
          <span>{decodedPirep.temperature}°C</span>
        </div>
      )}

      {pirep.windDirDegrees !== null && pirep.windSpeedKt !== null && !decodedPirep?.wind && (
        <div className="flex items-center space-x-2">
          <span className="font-semibold">Wind:</span>
          <span>
            {pirep.windDirDegrees?.toString()}° at {pirep.windSpeedKt?.toString()} kts
          </span>
        </div>
      )}

      {decodedPirep?.wind && (
        <div className="flex items-center space-x-2">
          <span className="font-semibold">Wind:</span>
          <span>{decodedPirep.wind}</span>
        </div>
      )}
    </div>
  );
};

export default PirepDecodedData;
