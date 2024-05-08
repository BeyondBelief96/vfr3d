import { Airport } from '../../../redux/api/faa/faa.interface';
import { useGetRunwayInformationByAirportIdQuery } from '../../../redux/api/faa/faaApi';

interface AirportInfoProps {
  airport: Airport;
}

const AirportInfo: React.FC<AirportInfoProps> = ({ airport }) => {
  const { data: runwayInformation } = useGetRunwayInformationByAirportIdQuery(airport.GLOBAL_ID);

  return (
    <div className="space-y-4">
      <div className="p-4 rounded-md shadow-md bg-base-200">
        <h3 className="mb-2 text-lg font-semibold">{airport.NAME}</h3>
        <div className="grid grid-cols-2 gap-2">
          {airport.IDENT && (
            <div>
              <span className="font-semibold">IDENT:</span> {airport.IDENT}
            </div>
          )}
          {airport.ICAO_ID && (
            <div>
              <span className="font-semibold">ICAO Code:</span> {airport.ICAO_ID}
            </div>
          )}
          {airport.TYPE_CODE && (
            <div>
              <span className="font-semibold">Type:</span> {airport.TYPE_CODE}
            </div>
          )}
          {airport.IAPEXISTS !== undefined && (
            <div>
              <span className="font-semibold">Instrument Approach:</span>{' '}
              {airport.IAPEXISTS ? 'Available' : 'Not Available'}
            </div>
          )}
        </div>
      </div>
      <div className="p-4 rounded-md shadow-md bg-base-200">
        <h3 className="mb-2 text-lg font-semibold">Location</h3>
        <div className="grid grid-cols-2 gap-2">
          {airport.LATITUDE && (
            <div>
              <span className="font-semibold">Latitude:</span> {airport.LATITUDE}
            </div>
          )}
          {airport.LONGITUDE && (
            <div>
              <span className="font-semibold">Longitude:</span> {airport.LONGITUDE}
            </div>
          )}
          {airport.ELEVATION && (
            <div>
              <span className="font-semibold">Elevation:</span> {airport.ELEVATION} ft
            </div>
          )}
          {airport.SERVCITY && (
            <div>
              <span className="font-semibold">City:</span> {airport.SERVCITY}
            </div>
          )}
          {airport.STATE && (
            <div>
              <span className="font-semibold">State:</span> {airport.STATE}
            </div>
          )}
          {airport.COUNTRY && (
            <div>
              <span className="font-semibold">Country:</span> {airport.COUNTRY}
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
