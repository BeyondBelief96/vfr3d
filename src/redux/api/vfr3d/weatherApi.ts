// src/redux/api/weatherApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { AirsigmetDTO, MetarDTO, PirepDTO, TafDTO } from 'vfr3d-shared';
import { ApiError } from '../types';

const API_BASE_URL = import.meta.env.VITE_VFR3D_BASE_URL;

export const weatherApi = createApi({
  reducerPath: 'weatherApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
  endpoints: (builder) => ({
    getAllAirsigmets: builder.query<AirsigmetDTO[], void>({
      query: () => '/airsigmet',
    }),
    getMetarForAirport: builder.query<MetarDTO, string>({
      query: (icaoCode) => `/metar/${icaoCode}`,
      transformErrorResponse: (response) => {
        if (response.status === 404) {
          return { status: 404, message: 'METAR not available' } as ApiError;
        }
        return response.data;
      },
    }),
    getMetarsByState: builder.query<MetarDTO[], string>({
      query: (stateCode) => `/metar/state/${stateCode}`,
    }),
    getAllPireps: builder.query<PirepDTO[], void>({
      query: () => '/pirep',
    }),
    getTafForAirport: builder.query<TafDTO, string>({
      query: (icaoCode) => `/taf/${icaoCode}`,
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
