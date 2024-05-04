// airportsSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { states } from '../../utility/states';
import { Airport } from '../api/faa/faa.interface';

interface AirportState {
  showAirports: boolean;
  selectedState: string;
  selectedAirport: Airport | null;
}

const initialState: AirportState = {
  showAirports: false,
  selectedState: states[0],
  selectedAirport: null,
};

const airportSlice = createSlice({
  name: 'airport',
  initialState,
  reducers: {
    toggleShowAirports: (state) => {
      state.showAirports = !state.showAirports;
    },
    setSelectedState: (state, action: PayloadAction<string>) => {
      state.selectedState = action.payload;
    },
    setSelectedAirport: (state, action: PayloadAction<Airport | null>) => {
      state.selectedAirport = action.payload;
    },
  },
});

export const { toggleShowAirports, setSelectedState, setSelectedAirport } = airportSlice.actions;

export default airportSlice.reducer;
