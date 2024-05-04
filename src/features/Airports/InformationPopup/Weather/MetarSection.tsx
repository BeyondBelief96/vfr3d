// MetarSection.tsx

import { MetarDTO } from 'vfr3d-shared';
import { useState } from 'react';

interface MetarSectionProps {
  metar: MetarDTO;
}

const MetarSection: React.FC<MetarSectionProps> = ({ metar }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="shadow-xl card bg-base-300">
      <div className="card-body">
        <h3 className="card-title">METAR</h3>
        <>
          <p>
            <span className="font-semibold">Raw Text:</span> {metar.rawText}
          </p>
          <div className="divider"></div>
          <div className="collapse collapse-arrow">
            <input type="checkbox" checked={isExpanded} onChange={toggleExpand} />
            <div className="text-xl font-medium collapse-title">Decode METAR</div>
            <div className="collapse-content">
              <div className="space-y-2">
                {metar.stationId && (
                  <p>
                    <span className="font-semibold">Station ID:</span> {metar.stationId}
                  </p>
                )}
                {metar.observationTime && (
                  <p>
                    <span className="font-semibold">Observation Time:</span> {metar.observationTime}
                  </p>
                )}
                {metar.tempC !== null && (
                  <p>
                    <span className="font-semibold">Temperature:</span> {metar.tempC}°C
                  </p>
                )}
                {metar.dewpointC !== null && (
                  <p>
                    <span className="font-semibold">Dew Point:</span> {metar.dewpointC}°C
                  </p>
                )}
                {metar.windDirDegrees && (
                  <p>
                    <span className="font-semibold">Wind Direction:</span> {metar.windDirDegrees}°
                  </p>
                )}
                {metar.windSpeedKt !== null && (
                  <p>
                    <span className="font-semibold">Wind Speed:</span> {metar.windSpeedKt} kt
                  </p>
                )}
                {metar.windGustKt !== null && (
                  <p>
                    <span className="font-semibold">Wind Gust:</span> {metar.windGustKt} kt
                  </p>
                )}
                {metar.visibilityStatuteMi && (
                  <p>
                    <span className="font-semibold">Visibility:</span> {metar.visibilityStatuteMi}{' '}
                    mi
                  </p>
                )}
                {metar.altimInHg !== null && (
                  <p>
                    <span className="font-semibold">Altimeter:</span> {metar.altimInHg} inHg
                  </p>
                )}
                {metar.seaLevelPressureMb !== null && (
                  <p>
                    <span className="font-semibold">Sea Level Pressure:</span>{' '}
                    {metar.seaLevelPressureMb} mb
                  </p>
                )}
                {metar.wxString && (
                  <p>
                    <span className="font-semibold">Weather:</span> {metar.wxString}
                  </p>
                )}
                {metar.skyConditions && (
                  <div>
                    <p className="font-semibold">Sky Conditions:</p>
                    <ul className="list-disc list-inside">
                      {metar.skyConditions.map((condition, index) => {
                        if (condition.skyCover === 'CLR') {
                          return <li key={index}>CLR</li>;
                        } else {
                          return (
                            <li key={index}>
                              {condition.skyCover} - {condition.cloudBaseFtAgl} ft AGL
                            </li>
                          );
                        }
                      })}
                    </ul>
                  </div>
                )}
                {metar.flightCategory && (
                  <p>
                    <span className="font-semibold">Flight Category:</span> {metar.flightCategory}
                  </p>
                )}
              </div>
            </div>
          </div>
        </>
      </div>
    </div>
  );
};

export default MetarSection;
