import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface EntitiesState {
  airportEntityIds: string[];
  routeEntityIds: string[];
}

const initialState: EntitiesState = {
  airportEntityIds: [],
  routeEntityIds: [],
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
  },
});

export const { setAirportEntityIds, setRouteEntityIds } = entitiesSlice.actions;

export default entitiesSlice.reducer;
