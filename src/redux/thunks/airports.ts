import { createAsyncThunk } from '@reduxjs/toolkit';
import { airportsApi } from '../api/vfr3d/airportsSlice';
import { AppState } from '../store';

export const fetchAdditionalAirports = createAsyncThunk(
  'data/fetchAdditionalAirports',
  async (icaoId: string, { getState, dispatch }) => {
    const state = getState() as AppState;
    const existingData = airportsApi.endpoints.getAllAirports.select(icaoId)(state);
    if (!existingData.isSuccess) {
      const response = await dispatch(airportsApi.endpoints.getAllAirports.initiate(icaoId));
      return response.data;
    }
    return existingData;
  }
);
