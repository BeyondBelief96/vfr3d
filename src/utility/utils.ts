import { Color } from 'cesium';
import { Airport } from '../redux/api/faa/faa.interface';

export const convertDMSToDecimal = (dms: string): number => {
  const hemisphere = dms.slice(-1);
  const [degrees, minutes, seconds] = dms.slice(0, -1).split('-').map(parseFloat);

  let decimalDegrees = degrees + minutes / 60 + seconds / 3600;

  if (hemisphere === 'S' || hemisphere === 'W') {
    decimalDegrees *= -1;
  }

  return decimalDegrees;
};

export function getMetarStationIdFromAirport(airport: Airport): string | undefined {
  const { ICAO_ID, IDENT } = airport;

  if (ICAO_ID) {
    return ICAO_ID;
  }

  if (IDENT) {
    if (IDENT.startsWith('K') || IDENT.startsWith('P')) {
      return IDENT;
    } else {
      return `K${IDENT}`;
    }
  }

  return undefined;
}

export const colorSerializer = {
  serialize: (color: Color) => {
    return {
      red: color.red,
      green: color.green,
      blue: color.blue,
      alpha: color.alpha,
    };
  },
  deserialize: (colorData: Record<string, number>) => {
    return new Color(colorData.red, colorData.green, colorData.blue, colorData.alpha);
  },
};
