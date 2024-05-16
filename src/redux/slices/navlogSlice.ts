import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AircraftPerformanceDTO, NavLogResponseDTO } from 'vfr3d-shared';
import { navlogApi } from '../api/vfr3d/navlog.api';

interface NavlogState {
  aircraftPerformanceProfile: AircraftPerformanceDTO;
  plannedCruisingAltitude: number;
  timeOfDepartureUtc: string;
  errors: {
    climbTrueAirspeed: boolean;
    cruiseTrueAirspeed: boolean;
    cruiseFuelBurn: boolean;
    climbFuelBurn: boolean;
    descentFuelBurn: boolean;
    climbFpm: boolean;
    descentFpm: boolean;
    descentTrueAirSpeed: boolean;
    sttFuelGals: boolean;
    fuelOnBoardGals: boolean;
    plannedCruisingAltitude: boolean;
    timeOfDepartureUtc: boolean;
  };
  navlog: NavLogResponseDTO;
  isNavlogReady: boolean;
  isNavlogCalculationEnabled: boolean;
}

const initialState: NavlogState = {
  isNavlogReady: false,
  isNavlogCalculationEnabled: false,
  aircraftPerformanceProfile: {
    climbTrueAirspeed: 72,
    cruiseTrueAirspeed: 108,
    cruiseFuelBurn: 8,
    climbFuelBurn: 12,
    descentFuelBurn: 8,
    climbFpm: 645,
    descentFpm: 500,
    descentTrueAirSpeed: 108,
    sttFuelGals: 1.5,
    fuelOnBoardGals: 38,
  },
  plannedCruisingAltitude: 4500,
  timeOfDepartureUtc: new Date().toUTCString(),
  errors: {
    climbTrueAirspeed: false,
    cruiseTrueAirspeed: false,
    cruiseFuelBurn: false,
    climbFuelBurn: false,
    descentFuelBurn: false,
    climbFpm: false,
    descentFpm: false,
    descentTrueAirSpeed: false,
    sttFuelGals: false,
    fuelOnBoardGals: false,
    plannedCruisingAltitude: false,
    timeOfDepartureUtc: false,
  },
  navlog: {
    totalRouteDistance: 0,
    totalRouteTimeHours: 0,
    totalFuelUsed: 0,
    averageWindComponent: 0,
    legs: [],
  },
};

const navlogSlice = createSlice({
  name: 'navlog',
  initialState,
  reducers: {
    setNavlogReady: (state, action: PayloadAction<boolean>) => {
      state.isNavlogReady = action.payload;
    },
    setNavlogCalculationEnabled: (state, action: PayloadAction<boolean>) => {
      state.isNavlogCalculationEnabled = action.payload;
    },
    setAircraftPerformanceProfile: (
      state,
      action: PayloadAction<Partial<AircraftPerformanceDTO>>
    ) => {
      state.aircraftPerformanceProfile = {
        ...state.aircraftPerformanceProfile,
        ...action.payload,
      };
    },
    setPlannedCruisingAltitude: (state, action: PayloadAction<number>) => {
      state.plannedCruisingAltitude = action.payload;
    },
    setTimeOfDepartureUtc: (state, action: PayloadAction<Date>) => {
      state.timeOfDepartureUtc = action.payload.toUTCString();
    },
    validateNavlogFields: (state) => {
      const {
        climbTrueAirspeed,
        cruiseTrueAirspeed,
        cruiseFuelBurn,
        climbFuelBurn,
        descentFuelBurn,
        climbFpm,
        descentFpm,
        descentTrueAirSpeed,
        sttFuelGals,
        fuelOnBoardGals,
      } = state.aircraftPerformanceProfile;

      state.errors.climbTrueAirspeed = climbTrueAirspeed === 0;
      state.errors.cruiseTrueAirspeed = cruiseTrueAirspeed === 0;
      state.errors.cruiseFuelBurn = cruiseFuelBurn === 0;
      state.errors.climbFuelBurn = climbFuelBurn === 0;
      state.errors.descentFuelBurn = descentFuelBurn === 0;
      state.errors.climbFpm = climbFpm === 0;
      state.errors.descentFpm = descentFpm === 0;
      state.errors.descentTrueAirSpeed = descentTrueAirSpeed === 0;
      state.errors.sttFuelGals = sttFuelGals === 0;
      state.errors.fuelOnBoardGals = fuelOnBoardGals === 0;
      state.errors.plannedCruisingAltitude = state.plannedCruisingAltitude === 0;
      state.errors.timeOfDepartureUtc = state.timeOfDepartureUtc === '';
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      navlogApi.endpoints.calculateNavLog.matchFulfilled,
      (state, action: PayloadAction<NavLogResponseDTO>) => {
        state.navlog = action.payload;
      }
    );
  },
});

export const {
  setAircraftPerformanceProfile,
  setPlannedCruisingAltitude,
  setTimeOfDepartureUtc,
  validateNavlogFields,
  setNavlogReady,
  setNavlogCalculationEnabled,
} = navlogSlice.actions;

export default navlogSlice.reducer;
