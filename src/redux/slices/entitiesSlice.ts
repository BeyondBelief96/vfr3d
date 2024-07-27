import { createSlice } from '@reduxjs/toolkit';

interface EntitiesState {}

const initialState: EntitiesState = {};

const entitiesSlice = createSlice({
  name: 'entities',
  initialState,
  reducers: {},
});

export default entitiesSlice.reducer;
