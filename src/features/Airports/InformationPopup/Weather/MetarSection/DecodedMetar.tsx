import { MetarDTO } from 'vfr3d-shared';
import MetarSkyConditions from './SkyCondition';
interface MetarDecodedDataProps {
  metar: MetarDTO;
}

const MetarDecodedData: React.FC<MetarDecodedDataProps> = ({ metar }) => {
  return (
    <div className="space-y-2">
      {metar.stationId && (
        <div className="flex items-center space-x-2">
          <span className="font-semibold">Station ID:</span>
          <span>{metar.stationId}</span>
        </div>
      )}
      {metar.observationTime && (
        <div className="flex items-center space-x-2">
          <span className="font-semibold">Observation Time:</span>
          <span>{metar.observationTime}</span>
        </div>
      )}
      {metar.tempC !== null && (
        <div className="flex items-center space-x-2">
          <span className="font-semibold">Temperature:</span>
          <span>{metar.tempC}°C</span>
        </div>
      )}
      {metar.dewpointC !== null && (
        <div className="flex items-center space-x-2">
          <span className="font-semibold">Dew Point:</span>
          <span>{metar.dewpointC}°C</span>
        </div>
      )}
      {metar.windDirDegrees && (
        <div className="flex items-center space-x-2">
          <span className="font-semibold">Wind Direction:</span>
          <span>{metar.windDirDegrees}°</span>
        </div>
      )}
      {metar.windSpeedKt !== null && (
        <div className="flex items-center space-x-2">
          <span className="font-semibold">Wind Speed:</span>
          <span>{metar.windSpeedKt} kt</span>
        </div>
      )}
      {metar.windGustKt !== null && (
        <div className="flex items-center space-x-2">
          <span className="font-semibold">Wind Gust:</span>
          <span>{metar.windGustKt} kt</span>
        </div>
      )}
      {metar.visibilityStatuteMi && (
        <div className="flex items-center space-x-2">
          <span className="font-semibold">Visibility:</span>
          <span>{metar.visibilityStatuteMi} mi</span>
        </div>
      )}
      {metar.altimInHg !== null && (
        <div className="flex items-center space-x-2">
          <span className="font-semibold">Altimeter:</span>
          <span>{metar.altimInHg} inHg</span>
        </div>
      )}
      {metar.seaLevelPressureMb !== null && (
        <div className="flex items-center space-x-2">
          <span className="font-semibold">Sea Level Pressure:</span>
          <span>{metar.seaLevelPressureMb} mb</span>
        </div>
      )}
      {metar.wxString && (
        <div className="flex items-center space-x-2">
          <span className="font-semibold">Weather:</span>
          <span>{metar.wxString}</span>
        </div>
      )}
      {metar.skyConditions && <MetarSkyConditions skyConditions={metar.skyConditions} />}
      {metar.flightCategory && (
        <div className="flex items-center space-x-2">
          <span className="font-semibold">Flight Category:</span>
          <span>{metar.flightCategory}</span>
        </div>
      )}
    </div>
  );
};

export default MetarDecodedData;
