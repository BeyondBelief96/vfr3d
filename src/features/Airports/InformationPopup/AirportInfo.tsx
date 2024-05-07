import { Airport } from '../../../redux/api/faa/faa.interface';
import { useGetRunwayInformationByAirportIdQuery } from '../../../redux/api/faa/faaApi';

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

  const { data: runwayInformation } = useGetRunwayInformationByAirportIdQuery(airport.GLOBAL_ID);

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
      {runwayInformation && (
        <div className="p-4 rounded-md shadow-md bg-base-200">
          <h3 className="mb-2 text-lg font-semibold">Runway Information</h3>
          <div className="grid grid-cols-2 gap-2">
            {runwayInformation.map((runway) => (
              <div key={runway.OBJECTID}>
                <h4 className="font-semibold">{runway.DESIGNATOR}</h4>
                <div>
                  <span className="font-semibold">Length:</span> {runway.LENGTH} {runway.DIM_UOM}
                </div>
                <div>
                  <span className="font-semibold">Width:</span> {runway.WIDTH} {runway.DIM_UOM}
                </div>
                <div>
                  <span className="font-semibold">Surface:</span> {runway.COMP_CODE}
                </div>
                {runway.LIGHTACTV !== null && (
                  <div>
                    <span className="font-semibold">Lighting:</span>{' '}
                    {runway.LIGHTACTV ? 'Available' : 'Not Available'}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AirportInfo;
