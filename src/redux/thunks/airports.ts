import { createAsyncThunk } from '@reduxjs/toolkit';
import { airportsApi } from '../api/vfr3d/airportsSlice';
import { AppState } from '../store';

export const fetchAdditionalAirports = createAsyncThunk(
  'data/fetchAdditionalAirports',
  async (icaoIdOrArptId: string, { getState, dispatch }) => {
    const state = getState() as AppState;
    const existingData = airportsApi.endpoints.getAllAirports.select(icaoIdOrArptId)(state);
    if (!existingData.isSuccess) {
      const response = await dispatch(airportsApi.endpoints.getAllAirports.initiate(icaoIdOrArptId));
      return response.data;
    }
    return existingData;
  }
);
