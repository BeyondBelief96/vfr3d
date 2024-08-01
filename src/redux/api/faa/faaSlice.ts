// src/redux/api/faaApiSlice.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { AirportGlobalId, ApiResponse, Runway } from './faa.interface';

const FAA_BASE_URL = 'https://services6.arcgis.com/ssFJjBXIUyZDrSYZ/arcgis/rest/services';

export const faaApi = createApi({
  reducerPath: 'faaApi',
  baseQuery: fetchBaseQuery({ baseUrl: FAA_BASE_URL }),
  endpoints: (builder) => ({
    getAirportGlobalId: builder.query<string, string>({
      query: (icaoCodeOrIdent) => ({
        url: `/US_Airport/FeatureServer/0/query`,
        params: {
          where: `ICAO_ID = '${icaoCodeOrIdent}' OR IDENT = '${icaoCodeOrIdent}'`,
          outFields: 'GLOBAL_ID',
          f: 'json',
        },
      }),
      transformResponse: (response: ApiResponse<AirportGlobalId>) => {
        if (response.features.length === 0) {
          throw new Error('Airport not found');
        }
        return response.features[0].attributes.GLOBAL_ID;
      },
    }),
    getRunwayInformationByAirportGlobalId: builder.query<Runway[], string>({
      query: (globalId) => ({
        url: `/Runways/FeatureServer/0/query`,
        params: {
          where: `AIRPORT_ID = '${globalId}'`,
          outFields: '*',
          outSR: 4326,
          f: 'json',
        },
      }),
      transformResponse: (response: ApiResponse<Runway>) =>
        response.features.map((feature) => feature.attributes),
    }),
  }),
});

export const { useGetAirportGlobalIdQuery, useGetRunwayInformationByAirportGlobalIdQuery } = faaApi;
