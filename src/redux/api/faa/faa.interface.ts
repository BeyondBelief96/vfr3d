// src/redux/api/faa.interface.ts

export interface Runway {
  OBJECTID: number;
  GLOBAL_ID: string;
  AIRPORT_ID: string;
  DESIGNATOR: string;
  LENGTH: number;
  WIDTH: number;
  DIM_UOM: string;
  COMP_CODE: string;
  LIGHTACTV: number;
  LIGHTINTNS: string;
  AK_LOW: number;
  AK_HIGH: number;
  US_LOW: number;
  US_HIGH: number;
  US_AREA: number;
  PACIFIC: number;
  Shape__Area: number;
  Shape__Length: number;
}

export interface Airport {
  OBJECTID: number;
  GLOBAL_ID: string;
  IDENT: string;
  NAME: string;
  LATITUDE: string;
  LONGITUDE: string;
  ELEVATION: number;
  ICAO_ID: string;
  TYPE_CODE: string;
  SERVCITY: string;
  STATE: string;
  COUNTRY: string;
  OPERSTATUS: string;
  PRIVATEUSE: number;
  IAPEXISTS: number;
  DODHIFLIP: number;
  FAR91: number;
  FAR93: number;
  MIL_CODE: string;
  AIRANAL: string;
  US_HIGH: number;
  US_LOW: number;
  AK_HIGH: number;
  AK_LOW: number;
  US_AREA: number;
  PACIFIC: number;
}

export interface ApiFeature<T> {
  attributes: T;
}

export interface ApiResponse<T> {
  features: ApiFeature<T>[];
  exceededTransferLimit: boolean;
}
