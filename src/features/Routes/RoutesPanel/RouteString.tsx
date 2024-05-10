// RouteString.tsx

import { Airport } from '../../../redux/api/faa/faa.interface';
import RouteCodeBubble from './RouteCodeBubble';

interface RouteStringBubblesProps {
  routeString: string;
  routePoints: Airport[]; // Replace with the appropriate type for airportData
}

const RouteStringBubbles: React.FC<RouteStringBubblesProps> = ({ routeString, routePoints }) => {
  if (!routePoints.length) return null;
  const renderRouteString = () => {
    const codes = routeString.trim().split(' ');
    const formattedCodes = codes.map((code, index) => {
      const isValid = routePoints?.some(
        (airport: Airport) => airport.IDENT === code || airport.ICAO_ID === code
      );
      return (
        <span key={index}>
          <RouteCodeBubble code={code} isValid={isValid || false} />
          {index !== codes.length - 1 && ' '}
        </span>
      );
    });
    return formattedCodes;
  };

  return <>{renderRouteString()}</>;
};

export default RouteStringBubbles;
