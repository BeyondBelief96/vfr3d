// airsigmetSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AirsigmetDTO } from 'vfr3d-shared';

export type HazardType = 'CONVECTIVE' | 'ICE' | 'TURB' | 'IFR' | 'MTN OBSCN';

interface AirsigmetState {
  visibleHazards: { [key in HazardType]: boolean };
  selectedAirsigmet: AirsigmetDTO | null;
}

const initialState: AirsigmetState = {
  visibleHazards: {
    CONVECTIVE: false,
    ICE: false,
    TURB: false,
    IFR: false,
    'MTN OBSCN': false,
  },
  selectedAirsigmet: null,
};

const airsigmetSlice = createSlice({
  name: 'airsigmet',
  initialState,
  reducers: {
    toggleHazardVisibility: (state, action: PayloadAction<HazardType>) => {
      state.visibleHazards[action.payload] = !state.visibleHazards[action.payload];
    },
    setSelectedAirsigmet: (state, action: PayloadAction<AirsigmetDTO | null>) => {
      state.selectedAirsigmet = action.payload;
    },
  },
});

export const { toggleHazardVisibility, setSelectedAirsigmet } = airsigmetSlice.actions;
export default airsigmetSlice.reducer;
