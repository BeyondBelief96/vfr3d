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
    setAirportEntityIds: (state, action: PayloadAction<string[]>) => {
      state.airportEntityIds = action.payload;
    },
    setRouteEntityIds: (state, action: PayloadAction<string[]>) => {
      state.routeEntityIds = action.payload;
    },
    setAirspaceEntityIds: (state, action: PayloadAction<string[]>) => {
      state.airspaceEntityIds = action.payload;
    },
  },
});

export const { setAirportEntityIds, setRouteEntityIds, setAirspaceEntityIds } =
  entitiesSlice.actions;

export default entitiesSlice.reducer;
