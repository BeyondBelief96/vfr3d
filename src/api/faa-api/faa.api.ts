import axios from 'axios';
import { Airport } from './faa.dto';

interface ApiResponse {
  features: {
    attributes: Airport;
  }[];
  exceededTransferLimit: boolean;
}

const API_BASE_URL =
  'https://services6.arcgis.com/ssFJjBXIUyZDrSYZ/arcgis/rest/services/US_Airport/FeatureServer/0/query';

export const getAirportsByState = async (state: string): Promise<Airport[]> => {
  try {
    const response = await axios.get<ApiResponse>(API_BASE_URL, {
      params: {
        where: `STATE = '${state}'`,
        outFields: '*',
        outSR: 4326,
        f: 'json',
      },
    });

    const airports = response.data.features.map((feature) => feature.attributes);
    return airports;
  } catch (error) {
    console.error('Error fetching heliports:', error);
    throw error;
  }
};

export const getAirportByIcaoCode = async (icaoCode: string): Promise<Airport | null> => {
  try {
    const response = await axios.get<ApiResponse>(API_BASE_URL, {
      params: {
        where: `ICAO_ID = '${icaoCode}'`,
        outFields: '*',
        outSR: 4326,
        f: 'json',
      },
    });

    const airports = response.data.features.map((feature) => feature.attributes);
    return airports.length > 0 ? airports[0] : null;
  } catch (error) {
    console.error('Error fetching airport:', error);
    throw error;
  }
};

export const getAirportByIdent = async (ident: string): Promise<Airport | null> => {
  try {
    const response = await axios.get<ApiResponse>(API_BASE_URL, {
      params: {
        where: `IDENT = '${ident}'`,
        outFields: '*',
        outSR: 4326,
        f: 'json',
      },
    });

    const airports = response.data.features.map((feature) => feature.attributes);
    return airports.length > 0 ? airports[0] : null;
  } catch (error) {
    console.error('Error fetching airport:', error);
    throw error;
  }
};

export const getAirportByIcaoCodeOrIdent = async (
  icaoCodeOrIdent: string
): Promise<Airport | null> => {
  try {
    // First, search by ICAO code using the existing function
    const airportByIcaoCode = await getAirportByIcaoCode(icaoCodeOrIdent);

    if (airportByIcaoCode) {
      // Airport found by ICAO code
      return airportByIcaoCode;
    }

    // If no airport found by ICAO code, search by IDENT using the existing function
    const airportByIdent = await getAirportByIdent(icaoCodeOrIdent);

    if (airportByIdent) {
      // Airport found by IDENT
      return airportByIdent;
    }

    // No airport found by either ICAO code or IDENT
    return null;
  } catch (error) {
    console.error('Error fetching airport:', error);
    throw error;
  }
};

const MAX_RECORDS_PER_REQUEST = 1000; // Adjust this value based on the API's limit

export const getAllAirports = async (): Promise<Airport[]> => {
  try {
    let allAirports: Airport[] = [];
    let resultOffset = 0;
    let exceededTransferLimit = false;

    do {
      const response = await axios.get<ApiResponse>(API_BASE_URL, {
        params: {
          where: '1=1',
          outFields: '*',
          outSR: 4326,
          f: 'json',
          resultOffset,
          resultRecordCount: MAX_RECORDS_PER_REQUEST,
        },
      });

      allAirports = [
        ...allAirports,
        ...response.data.features.map((feature) => feature.attributes),
      ];

      resultOffset += MAX_RECORDS_PER_REQUEST;
      exceededTransferLimit = response.data.exceededTransferLimit;
    } while (exceededTransferLimit);

    return allAirports;
  } catch (error) {
    console.error('Error fetching all airports:', error);
    throw error;
  }
};
