// AirsigmetInfoPopup.tsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../../redux/store';
import { AirsigmetDTO } from 'vfr3d-shared';
import EntityInfoPopup from '../../components/ReusableComponents/EntityInfoPopup';
import { setSelectedAirsigmet } from '../../redux/slices/airsigmetsSlice';
import { CloseButton } from '../../components/ReusableComponents/CloseButton';
import { AIRSIGMET_TYPE } from '../../utility/constants';

const AirsigmetInfo: React.FC<{ airsigmet: AirsigmetDTO }> = ({ airsigmet }) => {
  return (
    <div className="p-4 space-y-4">
      <div>
        <h3 className="mb-2 text-lg font-bold">Hazard Information</h3>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <p className="font-semibold">Type:</p>
            <p>{airsigmet.hazard?.type || 'N/A'}</p>
          </div>
          <div>
            <p className="font-semibold">Severity:</p>
            <p>{airsigmet.hazard?.severity || 'N/A'}</p>
          </div>
        </div>
      </div>

      <div className="divider"></div>

      <div>
        <h3 className="mb-2 text-lg font-bold">Valid Time</h3>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <p className="font-semibold">From:</p>
            <p>{airsigmet.validTimeFrom || 'N/A'}</p>
          </div>
          <div>
            <p className="font-semibold">To:</p>
            <p>{airsigmet.validTimeTo || 'N/A'}</p>
          </div>
        </div>
      </div>

      <div className="divider"></div>

      <div>
        <h3 className="mb-2 text-lg font-bold">Altitude</h3>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <p className="font-semibold">Min:</p>
            <p>{airsigmet.altitude?.minFtMsl ? `${airsigmet.altitude.minFtMsl} ft MSL` : 'N/A'}</p>
          </div>
          <div>
            <p className="font-semibold">Max:</p>
            <p>{airsigmet.altitude?.maxFtMsl ? `${airsigmet.altitude.maxFtMsl} ft MSL` : 'N/A'}</p>
          </div>
        </div>
      </div>

      <div className="divider"></div>

      <div>
        <h3 className="mb-2 text-lg font-bold">Movement</h3>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <p className="font-semibold">Direction:</p>
            <p>{airsigmet.movementDirDegrees ? `${airsigmet.movementDirDegrees}°` : 'N/A'}</p>
          </div>
          <div>
            <p className="font-semibold">Speed:</p>
            <p>{airsigmet.movementSpeedKt ? `${airsigmet.movementSpeedKt} knots` : 'N/A'}</p>
          </div>
        </div>
      </div>

      <div className="divider"></div>

      <div>
        <h3 className="mb-2 text-lg font-bold">Raw Text</h3>
        <p className="text-sm whitespace-pre-wrap rounded ">{airsigmet.rawText || 'N/A'}</p>
      </div>
    </div>
  );
};

const AirsigmetInfoHeader: React.FC<{ airsigmet: AirsigmetDTO; handleClose: () => void }> = ({
  airsigmet,
  handleClose,
}) => {
  const isAirmet = airsigmet?.rawText?.includes(AIRSIGMET_TYPE.AIRMET);
  return (
    <div className="flex items-center justify-between p-4 bg-primary text-primary-content">
      <h2 className="text-xl font-bold">
        {`${airsigmet.hazard?.type}`} {isAirmet ? AIRSIGMET_TYPE.AIRMET : AIRSIGMET_TYPE.SIGMET}
      </h2>
      <CloseButton handleClose={handleClose} />
    </div>
  );
};

const AirsigmetInfoPopup: React.FC = () => {
  const dispatch = useDispatch();
  const selectedAirsigmet = useSelector((state: AppState) => state.airsigmet.selectedAirsigmet);

  if (!selectedAirsigmet) return null;

  const handleClose = () => {
    dispatch(setSelectedAirsigmet(null));
  };

  const renderContent = (airsigmet: AirsigmetDTO) => {
    return <AirsigmetInfo airsigmet={airsigmet} />;
  };

  const renderHeader = (airsigmet: AirsigmetDTO) => {
    return <AirsigmetInfoHeader airsigmet={airsigmet} handleClose={handleClose} />;
  };

  return (
    <EntityInfoPopup
      selectedEntity={selectedAirsigmet}
      renderContent={renderContent}
      renderHeader={renderHeader}
    />
  );
};

export default AirsigmetInfoPopup;
