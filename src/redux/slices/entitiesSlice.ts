import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface EntitiesState {
  airportEntityIds: string[];
  routeEntityIds: string[];
  airspaceEntityIds: string[];
}

const initialState: EntitiesState = {
  airportEntityIds: [],
  routeEntityIds: [],
  airspaceEntityIds: [],
};

const entitiesSlice = createSlice({
  name: 'entities',
  initialState,
  reducers: {
    updateCurrentAirportEntityIds: (state, action: PayloadAction<string[]>) => {
      state.airportEntityIds = action.payload;
    },
    updateCurrentRouteEntityIds: (state, action: PayloadAction<string[]>) => {
      state.routeEntityIds = action.payload;
    },
    updateCurrentAirspaceEntityIds: (state, action: PayloadAction<string[]>) => {
      state.airspaceEntityIds = action.payload;
    },
  },
});

export const {
  updateCurrentAirportEntityIds,
  updateCurrentRouteEntityIds,
  updateCurrentAirspaceEntityIds,
} = entitiesSlice.actions;

export default entitiesSlice.reducer;
