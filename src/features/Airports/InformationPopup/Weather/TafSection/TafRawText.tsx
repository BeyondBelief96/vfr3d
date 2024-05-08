interface TafRawTextProps {
  rawText: string;
}

const TafRawText: React.FC<TafRawTextProps> = ({ rawText }) => {
  return (
    <div className="flex items-center space-x-2">
      <span>{rawText}</span>
    </div>
  );
};

export default TafRawText;
