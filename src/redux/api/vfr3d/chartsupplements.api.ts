import { baseApi } from '../apiSlice';

const API_BASE_URL = import.meta.env.VITE_VFR3D_BASE_URL;

export const chartSupplementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getChartSupplementUrlByAirportCode: builder.query<{ pdfUrl: string }, string>({
      query: (airportCode) => ({
        url: `${API_BASE_URL}/chartsupplements/${airportCode}`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetChartSupplementUrlByAirportCodeQuery } = chartSupplementApi;
