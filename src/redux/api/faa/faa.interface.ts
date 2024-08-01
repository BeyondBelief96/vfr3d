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

export interface AirportGlobalId {
  GLOBAL_ID: string;
}

export interface ApiFeature<T> {
  attributes: T;
}

export interface ApiResponse<T> {
  features: ApiFeature<T>[];
  exceededTransferLimit: boolean;
}
