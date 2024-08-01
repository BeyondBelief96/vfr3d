// src/redux/api/airportsApiSlice.ts
import { AirportDTO } from 'vfr3d-shared';
import { vfr3dApi } from './vfr3dSlice';

export const airportsApi = vfr3dApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllAirports: builder.query<AirportDTO[], void>({
      query: () => '/airports',
    }),
    getAirportByIcaoCodeOrIdent: builder.query<AirportDTO, string>({
      query: (icaoCodeOrIdent) => `/airports/${icaoCodeOrIdent}`,
    }),
    getAirportsByState: builder.query<AirportDTO[], string>({
      query: (stateCode) => `/airports/state/${stateCode}`,
    }),
    getAirportsByStates: builder.query<AirportDTO[], string[]>({
      query: (states) => `/airports/states/${states.join(',')}`,
    }),
    getAirportsByIcaoCodesOrIdents: builder.query<AirportDTO[], string[]>({
      query: (icaoCodesOrIdents) => `/airports/batch/${icaoCodesOrIdents.join(',')}`,
    }),
  }),
});

export const {
  useGetAllAirportsQuery,
  useGetAirportByIcaoCodeOrIdentQuery,
  useGetAirportsByStateQuery,
  useGetAirportsByStatesQuery,
  useGetAirportsByIcaoCodesOrIdentsQuery,
  useLazyGetAirportByIcaoCodeOrIdentQuery,
} = airportsApi;
