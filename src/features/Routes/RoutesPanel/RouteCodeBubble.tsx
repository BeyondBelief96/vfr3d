// RouteCodeBubble.tsx
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../../../redux/store';
import { removeRoutePointByName } from '../../../redux/slices/routeSlice';

interface RouteCodeBubbleProps {
  code: string;
}

const RouteCodeBubble: React.FC<RouteCodeBubbleProps> = ({ code }) => {
  const dispatch = useDispatch();
  const routePoints = useSelector((state: AppState) => state.route.route?.routePoints);
  if (!routePoints) return;

  const isValid = routePoints.some((point) => point.name === code);

  const handleRemoveRoutePoint = () => {
    if (!isValid) {
      dispatch(removeRoutePointByName(code));
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
