interface PirepRawTextProps {
  rawText: string;
}

const PirepRawText: React.FC<PirepRawTextProps> = ({ rawText }) => {
  return (
    <div className="flex items-center space-x-2">
      <span>{rawText}</span>
    </div>
  );
};

export default PirepRawText;
