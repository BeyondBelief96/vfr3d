/**
 * The base URL for VFR Sectional Charts from FAA's servers on ARCGIS.
 */
export const ARCGIS_FAA_VFR_SECTIONAL_URL =
  'https://tiles.arcgis.com/tiles/ssFJjBXIUyZDrSYZ/arcgis/rest/services/VFR_Sectional/MapServer';

/**
 * The base URL for VFR Terminal Charts from FAA's servers on ARCGIS.
 */
export const ARCGIS_FAA_VFR_TERMINAL_URL =
  'https://tiles.arcgis.com/tiles/ssFJjBXIUyZDrSYZ/arcgis/rest/services/VFR_Terminal/MapServer';

/**
 * The base URL for IFR Low Charts from FAA's servers on ARCGIS.
 */
export const ARCGIS_FAA_IFR_LOW_URL =
  'https://tiles.arcgis.com/tiles/ssFJjBXIUyZDrSYZ/arcgis/rest/services/IFR_AreaLow/MapServer';

/**
 * The base URL for IFR High Charts from FAA's servers on ARCGIS.
 */
export const ARCGIS_FAA_IFR_HIGH_URL =
  'https://tiles.arcgis.com/tiles/ssFJjBXIUyZDrSYZ/arcgis/rest/services/IFR_High/MapServer';

/**
 * The base URL for accessing the FAA's airports database on ARCGIS.
 */
export const ARCGIS_FAA_FEATURESERVICE_BASE_URL =
  'https://services6.arcgis.com/ssFJjBXIUyZDrSYZ/arcgis/rest/services/US_Airport/FeatureServer/0';

export type ImageryLayerOption = { layerName: string; displayLabel: string };
/**
 * Set of imagery layer options as determined by charts available above.
 */
export const IMAGERY_LAYER_OPTIONS: ImageryLayerOption[] = [
  { layerName: 'None', displayLabel: 'None' },
  { layerName: 'vfrImagery', displayLabel: 'VFR' },
  { layerName: 'vfrTerminal', displayLabel: 'VFR TAC' },
  { layerName: 'ifrLowImagery', displayLabel: 'IFR Low' },
  { layerName: 'ifrHighImagery', displayLabel: 'IFR High' },
];

export enum FlightCategories {
  VFR = 'VFR',
  MVFR = 'MVFR',
  IFR = 'IFR',
  LIFR = 'LIFR',
}

export enum AIRSIGMET_TYPE {
  AIRMET = 'AIRMET',
  SIGMET = 'SIGMET',
}
