import {
  BearingAndDistanceRequestDto,
  BearingAndDistanceResponseDto,
  NavLogRequestDTO,
  NavLogResponseDTO,
} from 'vfr3d-shared';
import { vfr3dApi } from './vfr3dSlice';

const API_BASE_URL = import.meta.env.VITE_VFR3D_BASE_URL;

export const navlogApi = vfr3dApi.injectEndpoints({
  endpoints: (builder) => ({
    calculateNavLog: builder.mutation<NavLogResponseDTO, NavLogRequestDTO>({
      query: (navLogRequest) => ({
        url: `${API_BASE_URL}/navlog/calculateNavlog`,
        method: 'POST',
        body: navLogRequest,
      }),
    }),
    calcBearingAndDistance: builder.mutation<
      BearingAndDistanceResponseDto,
      BearingAndDistanceRequestDto
    >({
      query: (bearingAndDistanceRequest) => ({
        url: `${API_BASE_URL}/navlog/calcBearingAndDistance`,
        method: 'POST',
        body: bearingAndDistanceRequest,
      }),
    }),
  }),
});

export const { useCalculateNavLogMutation, useCalcBearingAndDistanceMutation } = navlogApi;
