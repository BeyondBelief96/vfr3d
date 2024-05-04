// TafSection.tsx

import { TafDTO } from 'vfr3d-shared';
import { useState } from 'react';

interface TafSectionProps {
  taf: TafDTO | null;
  isLoadingTaf: boolean;
}

const TafSection: React.FC<TafSectionProps> = ({ taf, isLoadingTaf }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="shadow-xl card bg-base-300">
      <div className="card-body">
        <h3 className="card-title">TAF</h3>
        {isLoadingTaf ? (
          <p>Loading TAF...</p>
        ) : taf ? (
          <>
            <p>
              <span className="font-semibold">Raw Text:</span> {taf.rawText}
            </p>
            <div className="divider"></div>
            <div className="collapse collapse-arrow">
              <input type="checkbox" checked={isExpanded} onChange={toggleExpand} />
              <div className="text-xl font-medium collapse-title">Decode TAF</div>
              <div className="collapse-content">
                <div className="space-y-2">
                  {taf.stationId && (
                    <p>
                      <span className="font-semibold">Station ID:</span> {taf.stationId}
                    </p>
                  )}
                  {taf.issueTime && (
                    <p>
                      <span className="font-semibold">Issue Time:</span> {taf.issueTime}
                    </p>
                  )}
                  {taf.bulletinTime && (
                    <p>
                      <span className="font-semibold">Bulletin Time:</span> {taf.bulletinTime}
                    </p>
                  )}
                  {taf.validTimeFrom && (
                    <p>
                      <span className="font-semibold">Valid Time From:</span> {taf.validTimeFrom}
                    </p>
                  )}
                  {taf.validTimeTo && (
                    <p>
                      <span className="font-semibold">Valid Time To:</span> {taf.validTimeTo}
                    </p>
                  )}
                  {taf.remarks && (
                    <p>
                      <span className="font-semibold">Remarks:</span> {taf.remarks}
                    </p>
                  )}
                  {taf.latitude !== null && (
                    <p>
                      <span className="font-semibold">Latitude:</span> {taf.latitude}
                    </p>
                  )}
                  {taf.longitude !== null && (
                    <p>
                      <span className="font-semibold">Longitude:</span> {taf.longitude}
                    </p>
                  )}
                  {taf.elevationM !== null && (
                    <p>
                      <span className="font-semibold">Elevation (m):</span> {taf.elevationM}
                    </p>
                  )}
                  {taf.forecast && (
                    <div className="space-y-4">
                      <h4 className="text-lg font-semibold">Forecast</h4>
                      {taf.forecast.map((forecast, index) => (
                        <div key={index} className="shadow-xl card bg-base-200">
                          <div className="card-body">
                            {forecast.fcstTimeFrom && (
                              <p>
                                <span className="font-semibold">From:</span> {forecast.fcstTimeFrom}
                              </p>
                            )}
                            {forecast.fcstTimeTo && (
                              <p>
                                <span className="font-semibold">To:</span> {forecast.fcstTimeTo}
                              </p>
                            )}
                            {forecast.changeIndicator && (
                              <p>
                                <span className="font-semibold">Change Indicator:</span>{' '}
                                {forecast.changeIndicator}
                              </p>
                            )}
                            {forecast.timeBecoming && (
                              <p>
                                <span className="font-semibold">Time Becoming:</span>{' '}
                                {forecast.timeBecoming}
                              </p>
                            )}
                            {forecast.probability !== null && (
                              <p>
                                <span className="font-semibold">Probability:</span>{' '}
                                {forecast.probability}
                              </p>
                            )}
                            {forecast.windDirDegrees && (
                              <p>
                                <span className="font-semibold">Wind Direction:</span>{' '}
                                {forecast.windDirDegrees}
                              </p>
                            )}
                            {forecast.windSpeedKt !== null && (
                              <p>
                                <span className="font-semibold">Wind Speed:</span>{' '}
                                {forecast.windSpeedKt} kt
                              </p>
                            )}
                            {forecast.windGustKt !== null && (
                              <p>
                                <span className="font-semibold">Wind Gust:</span>{' '}
                                {forecast.windGustKt} kt
                              </p>
                            )}
                            {forecast.windShearHgtFtAgl !== null && (
                              <p>
                                <span className="font-semibold">Wind Shear Height:</span>{' '}
                                {forecast.windShearHgtFtAgl} ft AGL
                              </p>
                            )}
                            {forecast.windShearDirDegrees !== null && (
                              <p>
                                <span className="font-semibold">Wind Shear Direction:</span>{' '}
                                {forecast.windShearDirDegrees}°
                              </p>
                            )}
                            {forecast.windShearSpeedKt !== null && (
                              <p>
                                <span className="font-semibold">Wind Shear Speed:</span>{' '}
                                {forecast.windShearSpeedKt} kt
                              </p>
                            )}
                            {forecast.visibilityStatuteMi && (
                              <p>
                                <span className="font-semibold">Visibility:</span>{' '}
                                {forecast.visibilityStatuteMi} mi
                              </p>
                            )}
                            {forecast.altimInHg !== null && (
                              <p>
                                <span className="font-semibold">Altimeter:</span>{' '}
                                {forecast.altimInHg} inHg
                              </p>
                            )}
                            {forecast.vertVisFt !== null && (
                              <p>
                                <span className="font-semibold">Vertical Visibility:</span>{' '}
                                {forecast.vertVisFt} ft
                              </p>
                            )}
                            {forecast.wxString && (
                              <p>
                                <span className="font-semibold">Weather:</span> {forecast.wxString}
                              </p>
                            )}
                            {forecast.notDecoded && (
                              <p>
                                <span className="font-semibold">Not Decoded:</span>{' '}
                                {forecast.notDecoded}
                              </p>
                            )}
                            {forecast.skyCondition && (
                              <div>
                                <p className="font-semibold">Sky Conditions:</p>
                                <ul className="list-disc list-inside">
                                  {forecast.skyCondition.map((condition, index) => (
                                    <li key={index}>
                                      {condition.skyCover} - {condition.cloudBaseFtAgl} ft AGL -{' '}
                                      {condition.cloudType}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                            {forecast.turbulenceCondition && (
                              <div>
                                <p className="font-semibold">Turbulence Conditions:</p>
                                <ul className="list-disc list-inside">
                                  {forecast.turbulenceCondition.map((condition, index) => (
                                    <li key={index}>
                                      {condition.turbulenceIntensity} -{' '}
                                      {condition.turbulenceMinAltFtAgl} to{' '}
                                      {condition.turbulenceMaxAltFtAgl} ft AGL
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                            {forecast.icingCondition && (
                              <div>
                                <p className="font-semibold">Icing Conditions:</p>
                                <ul className="list-disc list-inside">
                                  {forecast.icingCondition.map((condition, index) => (
                                    <li key={index}>
                                      {condition.icingIntensity} - {condition.icingMinAltFtAgl} to{' '}
                                      {condition.icingMaxAltFtAgl} ft AGL
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                            {forecast.temperature && (
                              <div>
                                <p className="font-semibold">Temperatures:</p>
                                <ul className="list-disc list-inside">
                                  {forecast.temperature.map((temp, index) => (
                                    <li key={index}>
                                      Valid Time: {temp.validTime} - Surface Temp: {temp.sfcTempC}°C
                                      - Max Temp: {temp.maxTempC}°C - Min Te{' '}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}{' '}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </>
        ) : (
          <p className="text-error">TAF not available for this airport.</p>
        )}
      </div>
    </div>
  );
};

export default TafSection;
