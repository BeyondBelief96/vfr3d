// RouteCodeBubble.tsx
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../redux/store';
import { removeRoutePointByCode } from '../../../redux/slices/routeSlice';

interface RouteCodeBubbleProps {
  code: string;
}

const RouteCodeBubble: React.FC<RouteCodeBubbleProps> = ({ code }) => {
  const dispatch = useDispatch();
  const { routePoints } = useSelector((state: RootState) => state.route);
  console.log(routePoints);

  const isValid = routePoints.some((point) => point.IDENT === code || point.ICAO_ID === code);

  const handleRemoveRoutePoint = () => {
    if (!isValid) {
      dispatch(removeRoutePointByCode(code));
    }
  };

  return (
    <span
      className={`px-2 py-1 rounded-md ${
        isValid ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'
      }`}
      onClick={handleRemoveRoutePoint}
    >
      {code}
    </span>
  );
};

export default RouteCodeBubble;
