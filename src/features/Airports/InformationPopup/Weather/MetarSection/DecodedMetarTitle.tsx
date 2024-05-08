interface DecodedMetarTitleProps {
  flightCategory: string;
}

const FLIGHT_CATEGORY_COLORS: Record<string, string> = {
  VFR: 'text-green-500',
  MVFR: 'text-blue-600',
  IFR: 'text-red-600',
  LIFR: 'text-purple-600',
};

const DecodedMetarTitle: React.FC<DecodedMetarTitleProps> = ({ flightCategory }) => {
  console.log(flightCategory);

  const color = FLIGHT_CATEGORY_COLORS[flightCategory] || 'text-gray-500';
  console.log(color);
  return <span className={`font-semibold ${color}`}>Decoded METAR ({flightCategory})</span>;
};

export default DecodedMetarTitle;
