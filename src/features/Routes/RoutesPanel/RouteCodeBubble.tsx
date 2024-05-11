// RouteCodeBubble.tsx
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../../../redux/store';
import { removeRoutePointByCode } from '../../../redux/slices/routeSlice';

interface RouteCodeBubbleProps {
  code: string;
}

const RouteCodeBubble: React.FC<RouteCodeBubbleProps> = ({ code }) => {
  const dispatch = useDispatch();
  const { routePoints } = useSelector((state: AppState) => state.route);

  const isValid = routePoints.some((point) => point.IDENT === code || point.ICAO_ID === code);

  const handleRemoveRoutePoint = () => {
    if (!isValid) {
      dispatch(removeRoutePointByCode(code));
    }
  };

  return (
    <span
      className={`px-2 py-1 rounded-md ${
        isValid ? 'bg-success text-secondary-content' : 'bg-error text-primary-content'
      }`}
      onClick={handleRemoveRoutePoint}
    >
      {code}
    </span>
  );
};

export default RouteCodeBubble;
