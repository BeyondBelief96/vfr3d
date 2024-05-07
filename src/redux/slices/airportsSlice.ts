// airportsSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { states } from '../../utility/states';
import { Airport } from '../api/faa/faa.interface';

interface AirportState {
  showAirports: boolean;
  selectedState: string;
  selectedAirport: Airport | null;
  refetchMETARs: boolean;
}

const initialState: AirportState = {
  showAirports: false,
  selectedState: states[0],
  selectedAirport: null,
  refetchMETARs: false,
};

const airportSlice = createSlice({
  name: 'airport',
  initialState,
  reducers: {
    toggleShowAirports: (state) => {
      state.showAirports = !state.showAirports;
      state.refetchMETARs = !state.refetchMETARs;
    },
    setShowAirports: (state, action: PayloadAction<boolean>) => {
      state.showAirports = action.payload;
    },
    setSelectedState: (state, action: PayloadAction<string>) => {
      state.selectedState = action.payload;
    },
    setSelectedAirport: (state, action: PayloadAction<Airport | null>) => {
      state.selectedAirport = action.payload;
    },
  },
});

export const { setShowAirports, toggleShowAirports, setSelectedState, setSelectedAirport } =
  airportSlice.actions;

export default airportSlice.reducer;
