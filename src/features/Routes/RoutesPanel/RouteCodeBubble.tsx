// CodeBubble.tsx
interface CodeBubbleProps {
  code: string;
  isValid: boolean;
}

const RouteCodeBubble: React.FC<CodeBubbleProps> = ({ code, isValid }) => {
  return (
    <span
      className={`px-2 py-1 rounded-md ${
        isValid ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800 animate-shake'
      }`}
    >
      {code}
    </span>
  );
};

export default RouteCodeBubble;
