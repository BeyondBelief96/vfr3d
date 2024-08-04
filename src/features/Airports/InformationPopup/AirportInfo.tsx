import React, { useState } from 'react';
import { AirportDTO } from 'vfr3d-shared';
import {
  useGetAirportGlobalIdQuery,
  useGetRunwayInformationByAirportGlobalIdQuery,
} from '../../../redux/api/faa/faaSlice';
import { useGetAirportDiagramUrlByAirportCodeQuery } from '../../../redux/api/vfr3d/airportDiagram.api';
import { useGetChartSupplementUrlByAirportCodeQuery } from '../../../redux/api/vfr3d/chartsupplements.api';
import LoadingSpinner from '../../../components/ReusableComponents/LoadingSpinner';
import { useGetFrequenciesByServicedFacilityQuery } from '../../../redux/api/vfr3d/frequencySlice.api';
import { PdfButtons } from './AirportInfo/AirportPdfButtons';
import { GeneralInformation } from './AirportInfo/GeneralInformation';
import { LocationInformation } from './AirportInfo/LocationInformation';
import { FrequencyInformation } from './AirportInfo/FrequencyInformation';
import { OperationalInformation } from './AirportInfo/OperationalInformation';
import { ContactInformation } from './AirportInfo/ContactInformation';
import { RunwayInformation } from './AirportInfo/RunwayInformation';

interface AirportInfoProps {
  airport: AirportDTO;
}

const AirportInfo: React.FC<AirportInfoProps> = ({ airport }) => {
  const icaoIdOrArptId = airport.icaoId || airport.arptId || '';
  const { data: globalId, isLoading: isGlobalIdLoading } =
    useGetAirportGlobalIdQuery(icaoIdOrArptId);
  const { data: runwayInformation, isLoading: isRunwayInfoLoading } =
    useGetRunwayInformationByAirportGlobalIdQuery(globalId || '');
  const {
    data: chartSupplementUrl,
    error: chartSupplementError,
    isLoading: isChartSupplementLoading,
    isFetching: isChartSupplementFetching,
  } = useGetChartSupplementUrlByAirportCodeQuery(icaoIdOrArptId);
  const {
    data: airportDiagramUrl,
    error: airportDiagramError,
    isLoading: isAirportDiagramLoading,
  } = useGetAirportDiagramUrlByAirportCodeQuery(icaoIdOrArptId);
  const { data: frequencies } = useGetFrequenciesByServicedFacilityQuery(airport.arptId ?? '');

  const isAirportDataLoading = isGlobalIdLoading || isRunwayInfoLoading;
  const isPdfDataLoading =
    isChartSupplementLoading || isChartSupplementFetching || isAirportDiagramLoading;

  const [expandedSections, setExpandedSections] = useState({
    general: false,
    location: false,
    frequencies: false,
    operational: false,
    contact: false,
    runways: false,
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <>
      <PdfButtons
        isPdfDataLoading={isPdfDataLoading}
        chartSupplementUrl={chartSupplementUrl}
        chartSupplementError={chartSupplementError}
        airportDiagramUrl={airportDiagramUrl}
        airportDiagramError={airportDiagramError}
      />

      {isAirportDataLoading ? (
        <LoadingSpinner fullScreen={false} />
      ) : (
        <>
          <GeneralInformation
            airport={airport}
            expanded={expandedSections.general}
            toggleSection={() => toggleSection('general')}
          />

          <LocationInformation
            airport={airport}
            expanded={expandedSections.location}
            toggleSection={() => toggleSection('location')}
          />

          <FrequencyInformation
            frequencies={frequencies}
            expanded={expandedSections.frequencies}
            toggleSection={() => toggleSection('frequencies')}
          />

          <OperationalInformation
            airport={airport}
            expanded={expandedSections.operational}
            toggleSection={() => toggleSection('operational')}
          />

          <ContactInformation
            airport={airport}
            expanded={expandedSections.contact}
            toggleSection={() => toggleSection('contact')}
          />

          <RunwayInformation
            runwayInformation={runwayInformation}
            expanded={expandedSections.runways}
            toggleSection={() => toggleSection('runways')}
          />
        </>
      )}
    </>
  );
};

export default AirportInfo;
