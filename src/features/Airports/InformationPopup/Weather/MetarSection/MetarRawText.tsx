interface MetarRawTextProps {
  rawText: string;
}

const MetarRawText: React.FC<MetarRawTextProps> = ({ rawText }) => {
  return (
    <div className="flex items-center space-x-2">
      <span>{rawText}</span>
    </div>
  );
};

export default MetarRawText;
