import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface EntitiesState {
  routeEntityIds: string[];
  airspaceEntityIds: string[];
}

const initialState: EntitiesState = {
  routeEntityIds: [],
  airspaceEntityIds: [],
};

const entitiesSlice = createSlice({
  name: 'entities',
  initialState,
  reducers: {
    updateCurrentRouteEntityIds: (state, action: PayloadAction<string[]>) => {
      state.routeEntityIds = action.payload;
    },
    updateCurrentAirspaceEntityIds: (state, action: PayloadAction<string[]>) => {
      state.airspaceEntityIds = action.payload;
    },
  },
});

export const { updateCurrentRouteEntityIds, updateCurrentAirspaceEntityIds } =
  entitiesSlice.actions;

export default entitiesSlice.reducer;
