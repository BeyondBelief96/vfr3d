import { Cartesian3 } from 'cesium';
import { Entity } from 'resium';
import useAirportsCountry from '../../hooks/useAirports';

const Airports: React.FC = () => {
  const { airports } = useAirportsCountry('US');

  return (
    <>
      {airports.map((airport) => {
        const position = Cartesian3.fromDegrees(-74.0707383, 40.7117244, 100);
        if (position) {
          <Entity position={position} point={{ pixelSize: 10 }}></Entity>;
        }
      })}
    </>
  );
};

export default Airports;
