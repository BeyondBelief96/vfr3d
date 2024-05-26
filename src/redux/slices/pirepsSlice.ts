import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { PirepDTO } from 'vfr3d-shared';

interface PirepsState {
  showPireps: boolean;
  selectedPirep: PirepDTO | null;
}

const initialState: PirepsState = {
  showPireps: false,
  selectedPirep: null,
};

const pirepsSlice = createSlice({
  name: 'pireps',
  initialState,
  reducers: {
    toggleShowPireps: (state, action: PayloadAction<boolean>) => {
      state.showPireps = action.payload;
    },
    setSelectedPirep: (state, action: PayloadAction<PirepDTO | null>) => {
      state.selectedPirep = action.payload;
    },
  },
});

export const { toggleShowPireps, setSelectedPirep } = pirepsSlice.actions;

export default pirepsSlice.reducer;
