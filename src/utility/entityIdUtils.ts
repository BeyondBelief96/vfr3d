import { AirportDTO, AirsigmetDTO } from 'vfr3d-shared';

export const getAirportEntityIdFromAirport = (airport: AirportDTO) => {
  return `airport-${airport.siteNo}`;
};

export const getAirsigmetEntityId = (airsigmet: AirsigmetDTO) => {
  return `airsigmet-${airsigmet.id}`;
};
