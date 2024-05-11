// RouteStringBubbles.tsx
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import RouteCodeBubble from './RouteCodeBubble';

const RouteStringBubbles: React.FC = () => {
  const { routeString } = useSelector((state: RootState) => state.route);
  const codes = routeString.trim().split(' ');

  if (!routeString) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-2">
      {codes.map((code, index) => (
        <RouteCodeBubble key={index} code={code} />
      ))}
    </div>
  );
};

export default RouteStringBubbles;
