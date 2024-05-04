import { useEffect, useState } from 'react';
import { MetarDTO } from 'vfr3d-shared';
import { getMetarsByState } from '../api/vfr3d-api/vfr3d.api';

const useMetarDataByState = (selectedState: string) => {
  const [metarData, setMetarData] = useState<MetarDTO[]>([]);

  useEffect(() => {
    const fetchMetarData = async () => {
      try {
        const data = await getMetarsByState(selectedState);
        setMetarData(data);
      } catch (error) {
        console.error('Error fetching METARs:', error);
      }
    };

    fetchMetarData();
  }, [selectedState]);

  return metarData;
};

export default useMetarDataByState;
