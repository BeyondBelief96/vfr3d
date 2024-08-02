import React from 'react';
import { AirportDTO } from 'vfr3d-shared';
import UrlButton from '../../../components/ReusableComponents/UrlButton';
import {
  useGetAirportGlobalIdQuery,
  useGetRunwayInformationByAirportGlobalIdQuery,
} from '../../../redux/api/faa/faaSlice';
import { useGetAirportDiagramUrlByAirportCodeQuery } from '../../../redux/api/vfr3d/airportDiagram.api';
import { useGetChartSupplementUrlByAirportCodeQuery } from '../../../redux/api/vfr3d/chartsupplements.api';
import { Runway } from '../../../redux/api/faa/faa.interface';
import LoadingSpinner from '../../../components/ReusableComponents/LoadingSpinner';

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

  // Check if airport data is loading
  const isAirportDataLoading = isGlobalIdLoading || isRunwayInfoLoading;

  // Check if PDF data is loading
  const isPdfDataLoading =
    isChartSupplementLoading || isChartSupplementFetching || isAirportDiagramLoading;

  const InfoItem = ({ label, value }: { label: string; value: string | number | undefined }) =>
    value ? (
      <div className="flex items-center justify-between py-2 last:border-b-0">
        <span className="font-medium">{label}:</span>
        <span>{value}</span>
      </div>
    ) : null;

  const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="mb-2">
      <h3 className="text-lg font-semibold text-center">{title}</h3>
      <div className="divider" />
      <div>{children}</div>
    </div>
  );

  return (
    <div className="rounded-lg shadow-lg bg-base-100">
      <div className="flex justify-center mb-3 space-x-4">
        {isPdfDataLoading ? (
          <LoadingSpinner fullScreen={false} />
        ) : (
          <>
            {chartSupplementUrl && chartSupplementUrl.pdfUrl && !chartSupplementError && (
              <UrlButton url={chartSupplementUrl.pdfUrl} label="Chart Supplement" />
            )}
            {airportDiagramUrl && airportDiagramUrl.pdfUrl && !airportDiagramError && (
              <UrlButton url={airportDiagramUrl.pdfUrl} label="Airport Diagram" />
            )}
          </>
        )}
      </div>
      {isAirportDataLoading ? (
        <LoadingSpinner fullScreen={false} />
      ) : (
        <>
          <Section title="General Information">
            <InfoItem label="IDENT" value={airport.arptId} />
            <InfoItem label="ICAO Code" value={airport.icaoId} />
            <InfoItem label="Type" value={airport.siteTypeCode} />
          </Section>

          <Section title="Location">
            <InfoItem label="Latitude" value={airport.latDecimal} />
            <InfoItem label="Longitude" value={airport.longDecimal} />
            <InfoItem label="Elevation" value={airport.elev ? `${airport.elev} ft` : undefined} />
            <InfoItem label="City" value={airport.city} />
            <InfoItem label="State" value={airport.stateName} />
            <InfoItem label="Country" value={airport.countryCode} />
          </Section>

          <Section title="Operational Information">
            <InfoItem label="Fuel Types" value={airport.fuelTypes} />
            <InfoItem
              label="Customs"
              value={airport.customsFlag === 'Y' ? 'Available' : 'Not Available'}
            />
            <InfoItem
              label="Landing Rights"
              value={airport.lndgRightsFlag === 'Y' ? 'Available' : 'Not Available'}
            />
            <InfoItem label="Joint Use" value={airport.jointUseFlag === 'Y' ? 'Yes' : 'No'} />
            <InfoItem
              label="Military Landing"
              value={airport.milLndgFlag === 'Y' ? 'Allowed' : 'Not Allowed'}
            />
          </Section>

          <Section title="Contact Information">
            <InfoItem label="Contact Title" value={airport.contactTitle} />
            <InfoItem label="Contact Name" value={airport.contactName} />
            <InfoItem label="Address" value={airport.contactAddress1} />
            {airport.contactAddress2 && (
              <InfoItem label="Address 2" value={airport.contactAddress2} />
            )}
            <InfoItem label="City" value={airport.contactCity} />
            <InfoItem label="State" value={airport.contactState} />
            <InfoItem
              label="Zip Code"
              value={`${airport.contactZipCode}${airport.conactZipPlusFour ? '-' + airport.conactZipPlusFour : ''}`}
            />
            <InfoItem label="Phone" value={airport.contactPhoneNumber} />
          </Section>

          {runwayInformation && runwayInformation.length > 0 && (
            <Section title="Runway Information">
              {runwayInformation.map((runway: Runway) => (
                <div key={runway.OBJECTID} className="mb-4 last:mb-0">
                  <h4 className="mb-2 font-semibold">Runway {runway.DESIGNATOR}</h4>
                  <div className="pl-4">
                    <InfoItem label="Length" value={`${runway.LENGTH} ${runway.DIM_UOM}`} />
                    <InfoItem label="Width" value={`${runway.WIDTH} ${runway.DIM_UOM}`} />
                    <InfoItem label="Surface" value={runway.COMP_CODE} />
                    {runway.LIGHTACTV !== null && (
                      <InfoItem
                        label="Lighting"
                        value={runway.LIGHTACTV ? 'Available' : 'Not Available'}
                      />
                    )}
                  </div>
                </div>
              ))}
            </Section>
          )}
        </>
      )}
    </div>
  );
};

export default AirportInfo;
