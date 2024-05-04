import { Airport } from '../../../api/faa-api/faa.dto';

interface AirportInfoProps {
  airport: Airport;
}

const AirportInfo: React.FC<AirportInfoProps> = ({ airport }) => {
  const {
    IDENT,
    NAME,
    LATITUDE,
    LONGITUDE,
    ELEVATION,
    ICAO_ID,
    TYPE_CODE,
    SERVCITY,
    STATE,
    COUNTRY,
    IAPEXISTS,
  } = airport;

  return (
    <div className="space-y-4">
      <div className="p-4 rounded-md shadow-md bg-base-200">
        <h3 className="mb-2 text-lg font-semibold">{NAME}</h3>
        <div className="grid grid-cols-2 gap-2">
          {IDENT && (
            <div>
              <span className="font-semibold">IDENT:</span> {IDENT}
            </div>
          )}
          {ICAO_ID && (
            <div>
              <span className="font-semibold">ICAO Code:</span> {ICAO_ID}
            </div>
          )}
          {TYPE_CODE && (
            <div>
              <span className="font-semibold">Type:</span> {TYPE_CODE}
            </div>
          )}
          {IAPEXISTS !== undefined && (
            <div>
              <span className="font-semibold">Instrument Approach:</span>{' '}
              {IAPEXISTS ? 'Available' : 'Not Available'}
            </div>
          )}
        </div>
      </div>
      <div className="p-4 rounded-md shadow-md bg-base-200">
        <h3 className="mb-2 text-lg font-semibold">Location</h3>
        <div className="grid grid-cols-2 gap-2">
          {LATITUDE && (
            <div>
              <span className="font-semibold">Latitude:</span> {LATITUDE}
            </div>
          )}
          {LONGITUDE && (
            <div>
              <span className="font-semibold">Longitude:</span> {LONGITUDE}
            </div>
          )}
          {ELEVATION && (
            <div>
              <span className="font-semibold">Elevation:</span> {ELEVATION} ft
            </div>
          )}
          {SERVCITY && (
            <div>
              <span className="font-semibold">City:</span> {SERVCITY}
            </div>
          )}
          {STATE && (
            <div>
              <span className="font-semibold">State:</span> {STATE}
            </div>
          )}
          {COUNTRY && (
            <div>
              <span className="font-semibold">Country:</span> {COUNTRY}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AirportInfo;
