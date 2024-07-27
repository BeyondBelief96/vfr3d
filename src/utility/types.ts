import { AirsigmetDTO, PirepDTO } from 'vfr3d-shared';
import { Airport } from '../redux/api/faa/faa.interface';

export type SelectedEntityType = Airport | PirepDTO | AirsigmetDTO | null;
export type SelectableEntities = 'Airport' | 'Pirep' | 'Airsigmet' | null;
