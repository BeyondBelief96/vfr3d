import { NavLogRequestDTO, NavLogResponseDTO } from 'vfr3d-shared';
import { baseApi } from '../apiSlice';

const API_BASE_URL = import.meta.env.VITE_VFR3D_BASE_URL;

export const navlogApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    calculateNavLog: builder.mutation<NavLogResponseDTO, NavLogRequestDTO>({
      query: (navLogRequest) => ({
        url: `${API_BASE_URL}/navlog/calculateNavlog`,
        method: 'POST',
        body: navLogRequest,
      }),
    }),
  }),
});

export const { useCalculateNavLogMutation } = navlogApi;
