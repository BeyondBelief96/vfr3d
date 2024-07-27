// airportsSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { states } from '../../utility/states';

interface AirportState {
  showAirports: boolean;
  selectedState: string;
  showCloudBases: boolean;
}

const initialState: AirportState = {
  showAirports: false,
  selectedState: states[0],
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
    setShowCloudBases: (state, action: PayloadAction<boolean>) => {
      state.showCloudBases = action.payload;
    },
  },
});

export const { setShowAirports, setShowCloudBases, toggleShowAirports, setSelectedState } =
  airportSlice.actions;

export default airportSlice.reducer;
