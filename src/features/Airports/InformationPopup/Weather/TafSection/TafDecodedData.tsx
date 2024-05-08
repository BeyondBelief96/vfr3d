import { TafDTO } from 'vfr3d-shared';
import TafForecast from './TafForecast';

interface TafDecodedDataProps {
  taf: TafDTO;
}

const TafDecodedData: React.FC<TafDecodedDataProps> = ({ taf }) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        {taf.stationId && (
          <>
            <span className="font-semibold">Station ID:</span>
            <span>{taf.stationId}</span>
          </>
        )}
        {taf.issueTime && (
          <>
            <span className="font-semibold">Issue Time:</span>
            <span>{taf.issueTime}</span>
          </>
        )}
        {taf.bulletinTime && (
          <>
            <span className="font-semibold">Bulletin Time:</span>
            <span>{taf.bulletinTime}</span>
          </>
        )}
        {taf.validTimeFrom && (
          <>
            <span className="font-semibold">Valid Time From:</span>
            <span>{taf.validTimeFrom}</span>
          </>
        )}
        {taf.validTimeTo && (
          <>
            <span className="font-semibold">Valid Time To:</span>
            <span>{taf.validTimeTo}</span>
          </>
        )}
        {taf.remarks && (
          <>
            <span className="font-semibold">Remarks:</span>
            <span>{taf.remarks}</span>
          </>
        )}
        {taf.latitude !== null && (
          <>
            <span className="font-semibold">Latitude:</span>
            <span>{taf.latitude}</span>
          </>
        )}
        {taf.longitude !== null && (
          <>
            <span className="font-semibold">Longitude:</span>
            <span>{taf.longitude}</span>
          </>
        )}
        {taf.elevationM !== null && (
          <>
            <span className="font-semibold">Elevation (m):</span>
            <span>{taf.elevationM}</span>
          </>
        )}
      </div>
      <div className="divider"></div>
      {taf.forecast && (
        <div className="space-y-4">
          <h4 className="text-lg font-semibold">Forecast</h4>
          {taf.forecast.map((forecast, index) => (
            <TafForecast key={index} forecast={forecast} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TafDecodedData;
