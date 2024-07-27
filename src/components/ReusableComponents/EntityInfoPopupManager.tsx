// EntityInfoPopupManager.tsx
import React from 'react';
import { useSelector } from 'react-redux';
import { AppState } from '../../redux/store';
import AirportInfoPopup from '../../features/Airports/InformationPopup/AirportInfoPopup';
import PirepInfoPopup from '../../features/Pireps/PirepInformationPopup';
import AirsigmetInfoPopup from '../../features/Airsigmets/AirsigmetInfoPopup';
import { Airport } from '../../redux/api/faa/faa.interface';
import { AirsigmetDTO, PirepDTO } from 'vfr3d-shared';

const EntityInfoPopupManager: React.FC = () => {
  const { entity, type } = useSelector((state: AppState) => state.selectedEntity);

  if (!entity || !type) return null;

  switch (type) {
    case 'Airport':
      return <AirportInfoPopup selectedAirport={entity as Airport} />;
    case 'Pirep':
      return <PirepInfoPopup selectedPirep={entity as PirepDTO} />;
    case 'Airsigmet':
      return <AirsigmetInfoPopup selectedAirsigmet={entity as AirsigmetDTO} />;
    default:
      return null;
  }
};

export default EntityInfoPopupManager;
