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
    addRouteEntity: (state, action: PayloadAction<string>) => {
      state.routeEntityIds.push(action.payload);
    },
    removeRouteEntity: (state, action: PayloadAction<string>) => {
      state.routeEntityIds = state.routeEntityIds.filter((id) => id !== action.payload);
    },
  },
});

export const { setAirportEntityIds, addRouteEntity, removeRouteEntity } = entitiesSlice.actions;

export default entitiesSlice.reducer;
