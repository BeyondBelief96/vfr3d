// src/redux/api/faaApiSlice.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Airport, ApiResponse, Runway } from './faa.interface';

const FAA_BASE_URL = 'https://services6.arcgis.com/ssFJjBXIUyZDrSYZ/arcgis/rest/services';
const MAX_RECORDS_PER_REQUEST = 1000;

export const faaApi = createApi({
  reducerPath: 'faaApi',
  baseQuery: fetchBaseQuery(),
  endpoints: (builder) => ({
    getAirportsByState: builder.query<Airport[], string>({
      query: (state) => ({
        url: `${FAA_BASE_URL}/US_Airport/FeatureServer/0/query`,
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
    getAirportsByStates: builder.query<Airport[], string[]>({
      query: (states) => ({
        url: `${FAA_BASE_URL}/US_Airport/FeatureServer/0/query`,
        params: {
          where: states.map((state) => `STATE = '${state}'`).join(' OR '),
          outFields: '*',
          outSR: 4326,
          f: 'json',
        },
      }),
      transformResponse: (response: ApiResponse<Airport>) =>
        response.features.map((feature) => feature.attributes),
    }),
    getAllAirports: builder.query<Airport[], void>({
      async queryFn(_, { dispatch }) {
        let resultOffset = 0;
        let allAirports: Airport[] = [];

        const fetchAirportsPage = async () => {
          const response = await dispatch(
            faaApi.endpoints.getAirportsPage.initiate(resultOffset)
          ).unwrap();

          allAirports = [...allAirports, ...response];

          if (response.length === MAX_RECORDS_PER_REQUEST) {
            resultOffset += MAX_RECORDS_PER_REQUEST;
            await fetchAirportsPage();
          }
        };

        await fetchAirportsPage();

        return { data: allAirports };
      },
    }),
    getAirportsPage: builder.query<Airport[], number>({
      query: (resultOffset) => ({
        url: `${FAA_BASE_URL}/US_Airport/FeatureServer/0/query`,
        params: {
          where: '1=1',
          outFields: '*',
          outSR: 4326,
          f: 'json',
          resultOffset,
          resultRecordCount: MAX_RECORDS_PER_REQUEST,
        },
      }),
      transformResponse: (response: ApiResponse<Airport>) =>
        response.features.map((feature) => feature.attributes),
    }),
    getAirportByIcaoCodeOrIdent: builder.query<Airport, string>({
      query: (icaoCodeOrIdent) => ({
        url: `${FAA_BASE_URL}/US_Airport/FeatureServer/0/query`,
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
    getAirportsByIcaoCodesOrIdents: builder.query<Airport[], string[]>({
      query: (icaoCodesOrIdents) => {
        const whereClause = icaoCodesOrIdents
          .map((code) => `(ICAO_ID = '${code}' OR IDENT = '${code}')`)
          .join(' OR ');

        return {
          url: `${FAA_BASE_URL}/US_Airport/FeatureServer/0/query`,
          params: {
            where: whereClause,
            outFields: '*',
            outSR: 4326,
            f: 'json',
          },
        };
      },
      transformResponse: (response: ApiResponse<Airport>) => {
        return response.features.map((feature) => feature.attributes);
      },
    }),
    getAirportByIcaoCodeOrIdentLazy: builder.query<Airport, string>({
      query: (icaoCodeOrIdent) => ({
        url: `${FAA_BASE_URL}/US_Airport/FeatureServer/0/query`,
        params: {
          where: `ICAO_ID = '${icaoCodeOrIdent}' OR IDENT = '${icaoCodeOrIdent}'`,
          outFields: '*',
          outSR: 4326,
          f: 'json',
          lazy: true,
        },
      }),
      transformResponse: (response: ApiResponse<Airport>) => {
        if (response.features.length === 0) {
          throw new Error('Airport not found');
        }
        return response.features[0].attributes;
      },
    }),
    getRunwayInformationByAirportId: builder.query<Runway[], string>({
      query: (airportId) => ({
        url: `${FAA_BASE_URL}/Runways/FeatureServer/0/query`,
        params: {
          where: `AIRPORT_ID = '${airportId}'`,
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

export const {
  useGetAirportsByStateQuery,
  useGetAirportsByStatesQuery,
  useGetAllAirportsQuery,
  useGetAirportByIcaoCodeOrIdentQuery,
  useGetAirportsByIcaoCodesOrIdentsQuery,
  useLazyGetAirportByIcaoCodeOrIdentLazyQuery,
  useGetRunwayInformationByAirportIdQuery,
} = faaApi;
