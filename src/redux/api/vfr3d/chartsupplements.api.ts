import { vfr3dApi } from './vfr3dSlice';

const API_BASE_URL = import.meta.env.VITE_VFR3D_BASE_URL;

export const chartSupplementApi = vfr3dApi.injectEndpoints({
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
