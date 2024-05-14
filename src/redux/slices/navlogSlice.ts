import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AircraftPerformanceDTO } from 'vfr3d-shared';

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
    cruiseCalibratedAirspeed: boolean;
    plannedCruisingAltitude: boolean;
    timeOfDepartureUtc: boolean;
  };
}

const initialState: NavlogState = {
  aircraftPerformanceProfile: {
    climbTrueAirspeed: 0,
    cruiseTrueAirspeed: 0,
    cruiseFuelBurn: 0,
    climbFuelBurn: 0,
    descentFuelBurn: 0,
    climbFpm: 0,
    descentFpm: 0,
    descentTrueAirSpeed: 0,
    sttFuelGals: 0,
    fuelOnBoardGals: 0,
    cruiseCalibratedAirspeed: 0,
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
    cruiseCalibratedAirspeed: false,
    plannedCruisingAltitude: false,
    timeOfDepartureUtc: false,
  },
};

const navlogSlice = createSlice({
  name: 'navlog',
  initialState,
  reducers: {
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
        cruiseCalibratedAirspeed,
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
      state.errors.cruiseCalibratedAirspeed = cruiseCalibratedAirspeed === 0;
      state.errors.plannedCruisingAltitude = state.plannedCruisingAltitude === 0;
      state.errors.timeOfDepartureUtc = state.timeOfDepartureUtc === '';
    },
  },
});

export const {
  setAircraftPerformanceProfile,
  setPlannedCruisingAltitude,
  setTimeOfDepartureUtc,
  validateNavlogFields,
} = navlogSlice.actions;

export default navlogSlice.reducer;
