import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NavLogResponseDTO } from 'vfr3d-shared';
import { navlogApi } from '../api/vfr3d/navlog.api';

interface NavlogState {
  plannedCruisingAltitude: number;
  timeOfDepartureUtc: string;
  navlog: NavLogResponseDTO;
  isNavlogReady: boolean;
  isNavlogCalculationEnabled: boolean;
}

const initialState: NavlogState = {
  isNavlogReady: false,
  isNavlogCalculationEnabled: false,
  plannedCruisingAltitude: 4500,
  timeOfDepartureUtc: new Date().toUTCString(),
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
    setPlannedCruisingAltitude: (state, action: PayloadAction<number>) => {
      state.plannedCruisingAltitude = action.payload;
    },
    setTimeOfDepartureUtc: (state, action: PayloadAction<Date>) => {
      state.timeOfDepartureUtc = action.payload.toUTCString();
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
  setPlannedCruisingAltitude,
  setTimeOfDepartureUtc,
  setNavlogReady,
  setNavlogCalculationEnabled,
} = navlogSlice.actions;

export default navlogSlice.reducer;
