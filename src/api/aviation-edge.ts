import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { Airport } from './types';

const BASE_URL: string = 'https://aviation-edge.com/v2/public/';
const AIRPORTS_ENDPOINT: string = 'airportDatabase';

export const getAirportsByCountryCode = async (countryCode: string) => {
  try {
    const config: AxiosRequestConfig = {
      params: {
        key: import.meta.env.VITE_AVIATION_EDGE_API_KEY,
        codeIso2Country: countryCode,
      },
    };

    const response: AxiosResponse<Airport[]> = await axios.get(
      `${BASE_URL}${AIRPORTS_ENDPOINT}`,
      config
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      console.error('Error fetching airport data', axiosError);
    } else {
      console.error('Error fetching airport data', error);
    }

    throw error;
  }
};
