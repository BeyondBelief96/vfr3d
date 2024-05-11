// RouteString.tsx
import RouteCodeBubble from './RouteCodeBubble';

interface RouteStringBubblesProps {
  routeString: string;
}

const RouteStringBubbles: React.FC<RouteStringBubblesProps> = ({ routeString }) => {
  const codes = routeString.trim().split(' ');

  return (
    <div className="flex space-x-3">
      {codes.map((code, index) => (
        <RouteCodeBubble key={index} code={code} />
      ))}
    </div>
  );
};

export default RouteStringBubbles;
