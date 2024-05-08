import { MetarSkyConditionDTO } from 'vfr3d-shared';

interface MetarSkyConditionsProps {
  skyConditions: MetarSkyConditionDTO[];
}

const MetarSkyConditions: React.FC<MetarSkyConditionsProps> = ({ skyConditions }) => {
  return (
    <div>
      <p className="font-semibold">Sky Conditions:</p>
      <ul className="list-disc list-inside">
        {skyConditions.map((condition, index) => {
          if (condition.skyCover === 'CLR') {
            return <li key={index}>CLR</li>;
          } else {
            return (
              <li key={index}>
                {condition.skyCover} - {condition.cloudBaseFtAgl} ft AGL
              </li>
            );
          }
        })}
      </ul>
    </div>
  );
};

export default MetarSkyConditions;
