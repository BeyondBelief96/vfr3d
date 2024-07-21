import { vfr3dApi } from './vfr3dSlice';

const API_BASE_URL = import.meta.env.VITE_VFR3D_BASE_URL;

export const airportDiagramApi = vfr3dApi.injectEndpoints({
  endpoints: (builder) => ({
    getAirportDiagramUrlByAirportCode: builder.query<{ pdfUrl: string }, string>({
      query: (airportCode) => ({
        url: `${API_BASE_URL}/airport-diagrams/${airportCode}`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetAirportDiagramUrlByAirportCodeQuery } = airportDiagramApi;
