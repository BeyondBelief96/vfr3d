import { PirepDTO } from 'vfr3d-shared';
import { CloseButton } from '../../components/ReusableComponents/CloseButton';
import { useAppDispatch } from '../../hooks/reduxHooks';
import { clearSelectedEntity } from '../../redux/slices/selectedEntitySlice';

interface PirepInfoHeaderProps {
  pirep: PirepDTO;
}

export const PirepInfoHeader: React.FC<PirepInfoHeaderProps> = ({ pirep }) => {
  const dispatch = useAppDispatch();

  const handleClose = () => {
    dispatch(clearSelectedEntity());
  };
  return (
    <div className="px-4 py-2 bg-primary text-primary-content">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <h1 className="text-xl">{pirep.aircraftRef}</h1>
          <h2 className="text-xl font-bold">{pirep.reportType}</h2>
        </div>
        <div className="flex flex-col items-end">
          <CloseButton handleClose={handleClose} />
        </div>
      </div>
    </div>
  );
};
