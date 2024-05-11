import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { removeRoutePoint } from '../../../redux/slices/routeSlice';

interface RouteCodeBubbleProps {
  code: string;
}

const RouteCodeBubble: React.FC<RouteCodeBubbleProps> = ({ code }) => {
  const dispatch = useDispatch();
  const { routeString, routePoints } = useSelector((state: RootState) => state.route);

  const prevCodeRef = useRef('');

  useEffect(() => {
    if (code !== prevCodeRef.current) {
      prevCodeRef.current = code;
      const existingAirport = routePoints.find(
        (point) => point.IDENT === code || point.ICAO_ID === code
      );
      if (existingAirport && !routeString.includes(code)) {
        dispatch(removeRoutePoint(code));
      }
    }
  }, [code, routeString, routePoints, dispatch]);

  const isValid = routePoints.some((point) => point.IDENT === code || point.ICAO_ID === code);

  return (
    <span
      className={`px-2 py-1 rounded-md ${
        isValid ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'
      }`}
    >
      {code}
    </span>
  );
};

export default RouteCodeBubble;
