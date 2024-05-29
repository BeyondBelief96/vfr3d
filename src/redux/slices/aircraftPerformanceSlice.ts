// src/store/slices/aircraftPerformanceSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AircraftPerformanceResponseDTO } from 'vfr3d-shared';

interface AircraftPerformanceState {
  selectedProfileId: number | null;
  profiles: AircraftPerformanceResponseDTO[];
  isLoading: boolean;
  error: string | null;
}

const initialState: AircraftPerformanceState = {
  selectedProfileId: null,
  profiles: [],
  isLoading: false,
  error: null,
};

const aircraftPerformanceSlice = createSlice({
  name: 'aircraftPerformance',
  initialState,
  reducers: {
    setSelectedProfileId: (state, action: PayloadAction<number | null>) => {
      state.selectedProfileId = action.payload;
    },
    setProfiles: (state, action: PayloadAction<AircraftPerformanceResponseDTO[]>) => {
      state.profiles = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setSelectedProfileId, setProfiles, setLoading, setError } =
  aircraftPerformanceSlice.actions;

export default aircraftPerformanceSlice.reducer;
