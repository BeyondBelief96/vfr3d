import { ForecastDTO } from 'vfr3d-shared';

interface TafForecastProps {
  forecast: ForecastDTO;
}

const TafForecast: React.FC<TafForecastProps> = ({ forecast }) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        {forecast.fcstTimeFrom && (
          <>
            <span className="font-semibold">From:</span>
            <span>{forecast.fcstTimeFrom}</span>
          </>
        )}
        {forecast.fcstTimeTo && (
          <>
            <span className="font-semibold">To:</span>
            <span>{forecast.fcstTimeTo}</span>
          </>
        )}
        {forecast.changeIndicator && (
          <>
            <span className="font-semibold">Change Indicator:</span>
            <span>{forecast.changeIndicator}</span>
          </>
        )}
        {forecast.timeBecoming && (
          <>
            <span className="font-semibold">Time Becoming:</span>
            <span>{forecast.timeBecoming}</span>
          </>
        )}
        {forecast.probability !== null && (
          <>
            <span className="font-semibold">Probability:</span>
            <span>{forecast.probability}</span>
          </>
        )}
        {forecast.windDirDegrees && (
          <>
            <span className="font-semibold">Wind Direction:</span>
            <span>{forecast.windDirDegrees}</span>
          </>
        )}
        {forecast.windSpeedKt !== null && (
          <>
            <span className="font-semibold">Wind Speed:</span>
            <span>{forecast.windSpeedKt} kt</span>
          </>
        )}
        {forecast.windGustKt !== null && (
          <>
            <span className="font-semibold">Wind Gust:</span>
            <span>{forecast.windGustKt} kt</span>
          </>
        )}
        {forecast.windShearHgtFtAgl !== null && (
          <>
            <span className="font-semibold">Wind Shear Height:</span>
            <span>{forecast.windShearHgtFtAgl} ft AGL</span>
          </>
        )}
        {forecast.windShearDirDegrees !== null && (
          <>
            <span className="font-semibold">Wind Shear Direction:</span>
            <span>{forecast.windShearDirDegrees}°</span>
          </>
        )}
        {forecast.windShearSpeedKt !== null && (
          <>
            <span className="font-semibold">Wind Shear Speed:</span>
            <span>{forecast.windShearSpeedKt} kt</span>
          </>
        )}
        {forecast.visibilityStatuteMi && (
          <>
            <span className="font-semibold">Visibility:</span>
            <span>{forecast.visibilityStatuteMi} mi</span>
          </>
        )}
        {forecast.altimInHg !== null && (
          <>
            <span className="font-semibold">Altimeter:</span>
            <span>{forecast.altimInHg} inHg</span>
          </>
        )}
        {forecast.vertVisFt !== null && (
          <>
            <span className="font-semibold">Vertical Visibility:</span>
            <span>{forecast.vertVisFt} ft</span>
          </>
        )}
        {forecast.wxString && (
          <>
            <span className="font-semibold">Weather:</span>
            <span>{forecast.wxString}</span>
          </>
        )}
        {forecast.notDecoded && (
          <>
            <span className="font-semibold">Not Decoded:</span>
            <span>{forecast.notDecoded}</span>
          </>
        )}
      </div>
      {forecast.skyCondition && (
        <div>
          <p className="font-semibold">Sky Conditions:</p>
          <ul className="list-disc list-inside">
            {forecast.skyCondition.map((condition, index) => (
              <li key={index}>
                {condition.skyCover} - {condition.cloudBaseFtAgl} ft AGL{' '}
                {condition.cloudType ? `- ${condition.cloudType}` : ''}
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
                {condition.turbulenceIntensity} - {condition.turbulenceMinAltFtAgl} to{' '}
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
                Valid Time: {temp.validTime} - Surface Temp: {temp.sfcTempC}°C - Max Temp:{' '}
                {temp.maxTempC}°C - Min Temp: {temp.minTempC}°C
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="divider"></div>
    </div>
  );
};

export default TafForecast;
