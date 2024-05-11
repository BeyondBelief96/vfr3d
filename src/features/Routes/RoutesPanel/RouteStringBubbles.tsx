// RouteString.tsx
import RouteCodeBubble from './RouteCodeBubble';

interface RouteStringBubblesProps {
  routeString: string;
}

const RouteStringBubbles: React.FC<RouteStringBubblesProps> = ({ routeString }) => {
  const codes = routeString.trim().split(' ');

  if (!routeString) return <></>;
  return (
    <div className="flex flex-wrap gap-2">
      {codes.map((code, index) => (
        <RouteCodeBubble key={index} code={code} />
      ))}
    </div>
  );
};

export default RouteStringBubbles;
