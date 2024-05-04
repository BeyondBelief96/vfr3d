// src/redux/api/weatherApi.ts
import { AirsigmetDTO, MetarDTO, PirepDTO, TafDTO } from 'vfr3d-shared';
import { ApiError } from '../types';
import { baseApi } from '../apiSlice';

const WEATHER_BASE_URL = import.meta.env.VITE_VFR3D_BASE_URL;

export const weatherApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllAirsigmets: builder.query<AirsigmetDTO[], void>({
      query: () => `${WEATHER_BASE_URL}/airsigmet`,
    }),
    getMetarForAirport: builder.query<MetarDTO, string>({
      query: (icaoCode) => `${WEATHER_BASE_URL}/metar/${icaoCode}`,
      transformErrorResponse: (response) => {
        if (response.status === 404) {
          return { status: 404, message: 'METAR not available' } as ApiError;
        }
        return response.data;
      },
    }),
    getMetarsByState: builder.query<MetarDTO[], string>({
      query: (stateCode) => `${WEATHER_BASE_URL}/metar/state/${stateCode}`,
    }),
    getAllPireps: builder.query<PirepDTO[], void>({
      query: () => `${WEATHER_BASE_URL}/pirep`,
    }),
    getTafForAirport: builder.query<TafDTO, string>({
      query: (icaoCode) => `${WEATHER_BASE_URL}/taf/${icaoCode}`,
      transformErrorResponse: (response) => {
        if (response.status === 404) {
          return { status: 404, message: 'TAF not available' } as ApiError;
        }
        return response.data;
      },
    }),
  }),
});

export const {
  useGetAllAirsigmetsQuery,
  useGetMetarForAirportQuery,
  useGetMetarsByStateQuery,
  useGetAllPirepsQuery,
  useGetTafForAirportQuery,
} = weatherApi;
