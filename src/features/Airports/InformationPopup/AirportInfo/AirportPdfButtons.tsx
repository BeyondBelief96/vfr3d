import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import LoadingSpinner from '../../../../components/ReusableComponents/LoadingSpinner';
import UrlButton from '../../../../components/ReusableComponents/UrlButton';
import { SerializedError } from '@reduxjs/toolkit';

interface PdfButtonsProps {
  isPdfDataLoading: boolean;
  chartSupplementUrl: { pdfUrl: string } | undefined;
  chartSupplementError: FetchBaseQueryError | SerializedError | undefined;
  airportDiagramUrl: { pdfUrl: string | undefined } | undefined;
  airportDiagramError: FetchBaseQueryError | SerializedError | undefined;
}

export const PdfButtons: React.FC<PdfButtonsProps> = ({
  isPdfDataLoading,
  chartSupplementUrl,
  chartSupplementError,
  airportDiagramUrl,
  airportDiagramError,
}) => (
  <div className="flex justify-center mb-4 space-x-4">
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
);
