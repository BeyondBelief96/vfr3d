import { Airport } from '../../../api/faa-api/faa.dto';

interface AirportInfoProps {
  airport: Airport;
}

const AirportInfo: React.FC<AirportInfoProps> = ({ airport }) => {
  return (
    <div className="space-y-2">
      <p>
        <span className="font-semibold">ICAO Code:</span> {airport.ICAO_ID || 'N/A'}
      </p>
      <p>
        <span className="font-semibold">IDENT:</span> {airport.IDENT}
      </p>
      <p>
        <span className="font-semibold">Latitude:</span> {airport.LATITUDE}
      </p>
      <p>
        <span className="font-semibold">Longitude:</span> {airport.LONGITUDE}
      </p>
      <p>
        <span className="font-semibold">Elevation:</span> {airport.ELEVATION} ft
      </p>
      <p>
        <span className="font-semibold">Type:</span> {airport.TYPE_CODE}
      </p>
      <p>
        <span className="font-semibold">Service City:</span> {airport.SERVCITY}
      </p>
      <p>
        <span className="font-semibold">State:</span> {airport.STATE}
      </p>
      <p>
        <span className="font-semibold">Country:</span> {airport.COUNTRY}
      </p>
    </div>
  );
};

export default AirportInfo;
