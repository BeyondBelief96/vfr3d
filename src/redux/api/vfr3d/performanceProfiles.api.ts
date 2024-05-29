// performanceProfiles.api.ts

import { vfr3dApi } from './vfr3dSlice';
import {
  SaveAircraftPerformanceRequestDTO,
  AircraftPerformanceResponseDTO,
  UpdateAircraftPerformanceRequestDTO,
} from 'vfr3d-shared';

const API_BASE_URL = import.meta.env.VITE_VFR3D_BASE_URL;

export const performanceProfilesApi = vfr3dApi.injectEndpoints({
  endpoints: (builder) => ({
    saveAircraftPerformanceProfile: builder.mutation<
      AircraftPerformanceResponseDTO,
      SaveAircraftPerformanceRequestDTO
    >({
      query: (aircraftPerformanceDTO) => ({
        url: `${API_BASE_URL}/performance-profiles`,
        method: 'POST',
        body: aircraftPerformanceDTO,
      }),
    }),
    getAircraftPerformanceProfiles: builder.query<AircraftPerformanceResponseDTO[], string>({
      query: (userId) => ({
        url: `${API_BASE_URL}/performance-profiles/${userId}`,
        method: 'GET',
      }),
    }),
    updateAircraftPerformanceProfile: builder.mutation<
      AircraftPerformanceResponseDTO,
      UpdateAircraftPerformanceRequestDTO
    >({
      query: (aircraftPerformanceDTO) => ({
        url: `${API_BASE_URL}/performance-profiles/${aircraftPerformanceDTO.id}`,
        method: 'PUT',
        body: aircraftPerformanceDTO,
      }),
    }),
    deleteAircraftPerformanceProfile: builder.mutation<void, number>({
      query: (profileId) => ({
        url: `${API_BASE_URL}/performance-profiles/${profileId}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useSaveAircraftPerformanceProfileMutation,
  useGetAircraftPerformanceProfilesQuery,
  useUpdateAircraftPerformanceProfileMutation,
  useDeleteAircraftPerformanceProfileMutation,
} = performanceProfilesApi;
