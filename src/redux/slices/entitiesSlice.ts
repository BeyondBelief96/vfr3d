import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Entity } from 'cesium';

interface EntitiesState {
  airportEntities: Record<string, Entity>;
  routeEntities: Record<string, Entity>;
}

const initialState: EntitiesState = {
  airportEntities: {},
  routeEntities: {},
};

const entitiesSlice = createSlice({
  name: 'entities',
  initialState,
  reducers: {
    addAirportEntity: (state, action: PayloadAction<{ id: string; entity: Entity }>) => {
      state.airportEntities[action.payload.id] = action.payload.entity;
    },
    removeAirportEntity: (state, action: PayloadAction<string>) => {
      delete state.airportEntities[action.payload];
    },
    addRouteEntity: (state, action: PayloadAction<{ id: string; entity: Entity }>) => {
      state.airportEntities[action.payload.id] = action.payload.entity;
    },
    removeRouteEntity: (state, action: PayloadAction<string>) => {
      delete state.airportEntities[action.payload];
    },
  },
});

export const { addAirportEntity, removeAirportEntity, addRouteEntity, removeRouteEntity } =
  entitiesSlice.actions;

export default entitiesSlice.reducer;
