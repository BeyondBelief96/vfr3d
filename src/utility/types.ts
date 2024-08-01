import { AirportDTO, AirsigmetDTO, PirepDTO } from 'vfr3d-shared';

export type SelectedEntityType = AirportDTO | PirepDTO | AirsigmetDTO | null;
export type SelectableEntities = 'Airport' | 'Pirep' | 'Airsigmet' | null;
