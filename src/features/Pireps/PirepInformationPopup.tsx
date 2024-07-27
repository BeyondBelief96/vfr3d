import PirepInfo from './PirepInfo';
import { PirepDTO } from 'vfr3d-shared';
import EntityInfoPopup from '../../components/ReusableComponents/EntityInfoPopup';
import { PirepInfoHeader } from './PirepInfoHeader';

interface PirepInfoPopupProps {
  selectedPirep: PirepDTO;
}

const PirepInfoPopup: React.FC<PirepInfoPopupProps> = ({ selectedPirep }) => {
  if (!selectedPirep) return null;

  const renderContent = (pirep: PirepDTO) => {
    return <PirepInfo pirep={pirep} />;
  };

  const renderPirepHeader = (pirep: PirepDTO) => {
    return <PirepInfoHeader pirep={pirep} />;
  };

  return (
    <EntityInfoPopup
      selectedEntity={selectedPirep}
      renderContent={renderContent}
      renderHeader={renderPirepHeader}
    />
  );
};

export default PirepInfoPopup;
