// airportsSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { states } from '../../utility/states';
import { Airport } from '../api/faa/faa.interface';

interface AirportState {
  showAirports: boolean;
  selectedState: string;
  selectedAirport: Airport | null;
  showCloudBases: boolean;
}

const initialState: AirportState = {
  showAirports: false,
  selectedState: states[0],
  selectedAirport: null,
  showCloudBases: true,
};

const airportSlice = createSlice({
  name: 'airport',
  initialState,
  reducers: {
    toggleShowAirports: (state) => {
      state.showAirports = !state.showAirports;
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
    setShowCloudBases: (state, action: PayloadAction<boolean>) => {
      state.showCloudBases = action.payload;
    },
  },
});

export const {
  setShowAirports,
  setShowCloudBases,
  toggleShowAirports,
  setSelectedState,
  setSelectedAirport,
} = airportSlice.actions;

export default airportSlice.reducer;
