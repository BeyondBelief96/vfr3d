import { createSlice } from '@reduxjs/toolkit';

interface AirspaceState {
  airspaceOutlineEnabled: boolean;
  airspace3dEnabled: boolean;
}

const initialState: AirspaceState = {
  airspace3dEnabled: false,
  airspaceOutlineEnabled: false,
};

const airspaceSlice = createSlice({
  name: 'airspace',
  initialState,
  reducers: {
    toggleAirspaceOutlines: (state) => {
      state.airspaceOutlineEnabled = !state.airspaceOutlineEnabled;
    },
    toggleAirspace3d: (states) => {
      states.airspace3dEnabled = !states.airspace3dEnabled;
    },
  },
});

export const { toggleAirspaceOutlines, toggleAirspace3d } = airspaceSlice.actions;
export default airspaceSlice.reducer;
