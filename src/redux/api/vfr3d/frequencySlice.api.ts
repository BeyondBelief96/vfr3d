import { CommunicationFrequencyDto } from 'vfr3d-shared';
import { vfr3dApi } from './vfr3dSlice';

export const frequencyApi = vfr3dApi.injectEndpoints({
  endpoints: (builder) => ({
    getFrequenciesByServicedFacility: builder.query<CommunicationFrequencyDto[], string>({
      query: (servicedFacility: string) => `/communication-frequency/${servicedFacility}`,
    }),
  }),
});

export const { useGetFrequenciesByServicedFacilityQuery } = frequencyApi;
