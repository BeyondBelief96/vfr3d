import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppState } from '../store';
import { airportsApi } from '../api/vfr3d/airportsSlice.api';

export const fetchAdditionalAirports = createAsyncThunk(
  'data/fetchAdditionalAirports',
  async (icaoIdOrArptId: string, { getState, dispatch }) => {
    const state = getState() as AppState;
    const existingData = airportsApi.endpoints.getAllAirports.select(icaoIdOrArptId)(state);
    if (!existingData.isSuccess) {
      const response = await dispatch(
        airportsApi.endpoints.getAllAirports.initiate(icaoIdOrArptId)
      );
      return response.data;
    }
    return existingData;
  }
);
