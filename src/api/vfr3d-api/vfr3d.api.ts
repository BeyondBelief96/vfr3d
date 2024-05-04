import axios from 'axios';
import { AirsigmetDTO, MetarDTO, PirepDTO, TafDTO } from 'vfr3d-shared';

const API_BASE_URL = import.meta.env.VITE_VFR3D_BASE_URL;

export const getAllAirsigmets = async (): Promise<AirsigmetDTO[]> => {
  try {
    const response = await axios.get<AirsigmetDTO[]>(`${API_BASE_URL}/airsigmet`);
    return response.data;
  } catch (error) {
    console.error('Error fetching AIRSIGMETs:', error);
    throw error;
  }
};

export const getMetarForAirport = async (icaoCode: string): Promise<MetarDTO> => {
  try {
    const response = await axios.get<MetarDTO>(`${API_BASE_URL}/metar/${icaoCode}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching METAR:', error);
    throw error;
  }
};

export const getMetarsByState = async (stateCode: string): Promise<MetarDTO[]> => {
  try {
    const response = await axios.get<MetarDTO[]>(`${API_BASE_URL}/metar/state/${stateCode}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching METAR for state ${stateCode}`, error);
    throw error;
  }
};

export const getAllPireps = async (): Promise<PirepDTO[]> => {
  try {
    const response = await axios.get<PirepDTO[]>(`${API_BASE_URL}/pirep`);
    return response.data;
  } catch (error) {
    console.error('Error fetching PIREPs:', error);
    throw error;
  }
};

export const getTafForAirport = async (icaoCode: string): Promise<TafDTO> => {
  try {
    const response = await axios.get<TafDTO>(`${API_BASE_URL}/taf/${icaoCode}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching TAF:', error);
    throw error;
  }
};
