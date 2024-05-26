import PirepInfo from './PirepInfo';
import { PirepDTO } from 'vfr3d-shared';
import { useAppSelector } from '../../hooks/reduxHooks';
import EntityInfoPopup from '../../components/ReusableComponents/EntityInfoPopup';
import { PirepInfoHeader } from './PirepInfoHeader';

const PirepInfoPopup: React.FC = () => {
  const selectedPirep = useAppSelector((state) => state.pireps.selectedPirep);

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
