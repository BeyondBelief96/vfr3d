// src/redux/api/faaApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Airport, ApiResponse } from './faa.interface';

const BASE_URL = 'https://services6.arcgis.com/ssFJjBXIUyZDrSYZ/arcgis/rest/services';
const MAX_RECORDS_PER_REQUEST = 1000;
export const faaApi = createApi({
  reducerPath: 'faaApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getAirportsByState: builder.query<Airport[], string>({
      query: (state) => ({
        url: '/US_Airport/FeatureServer/0/query',
        params: {
          where: `STATE = '${state}'`,
          outFields: '*',
          outSR: 4326,
          f: 'json',
        },
      }),
      transformResponse: (response: ApiResponse<Airport>) =>
        response.features.map((feature) => feature.attributes),
    }),
    getAllAirports: builder.query<Airport[], void>({
      query: () => ({
        url: '/US_Airport/FeatureServer/0/query',
        params: {
          where: '1=1',
          outFields: '*',
          outSR: 4326,
          f: 'json',
          resultOffset: 0,
          resultRecordCount: MAX_RECORDS_PER_REQUEST,
        },
      }),
      transformResponse: (response: ApiResponse<Airport>) =>
        response.features.map((feature) => feature.attributes),
    }),
    getAirportByIcaoCodeOrIdent: builder.query<Airport, string>({
      query: (icaoCodeOrIdent) => ({
        url: '/US_Airport/FeatureServer/0/query',
        params: {
          where: `ICAO_ID = '${icaoCodeOrIdent}' OR IDENT = '${icaoCodeOrIdent}'`,
          outFields: '*',
          outSR: 4326,
          f: 'json',
        },
      }),
      transformResponse: (response: ApiResponse<Airport>) => {
        if (response.features.length === 0) {
          throw new Error('Airport not found');
        }
        return response.features[0].attributes;
      },
    }),
  }),
});

export const {
  useGetAirportsByStateQuery,
  useGetAllAirportsQuery,
  useGetAirportByIcaoCodeOrIdentQuery,
} = faaApi;
