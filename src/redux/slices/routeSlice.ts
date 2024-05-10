import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Route } from '../../features/Routes/Route';
import { Airport } from '../api/faa/faa.interface';
import { states } from '../../utility/states';

interface RouteState {
  currentRoute: Route | null | undefined;
  lineColor: string;
  pointColor: string;
  routeString: string;
  routePoints: Airport[];
}

const initialState: RouteState = {
  currentRoute: null,
  lineColor: 'rgba(0, 255, 255, 1)', // Aqua
  pointColor: 'rgba(255, 255, 0, 1)', // Yellow
  routeString: '',
  routePoints: [],
};

const routeSlice = createSlice({
  name: 'route',
  initialState,
  reducers: {
    setRouteString: (state, action: PayloadAction<string>) => {
      state.routeString = action.payload;
    },
    clearRouteString: (state) => {
      state.routeString = '';
    },
    pushRoutePoint: (state, action: PayloadAction<Airport>) => {
      state.routePoints.push(action.payload);
    },
    removeRoutePoint: (state, action: PayloadAction<string>) => {
      state.routePoints = state.routePoints.filter(
        (airport) => airport.IDENT !== action.payload && airport.ICAO_ID !== action.payload
      );
    },
    clearRoutePoints: (state) => {
      state.routePoints = [];
    },
    setRoute: (state, action: PayloadAction<Route | undefined>) => {
      state.currentRoute = action.payload;
    },
    clearRoute: (state) => {
      state.currentRoute = null;
    },
    setLineColor: (state, action: PayloadAction<string>) => {
      state.lineColor = action.payload;
    },
    setEndPointColor: (state, action: PayloadAction<string>) => {
      state.pointColor = action.payload;
    },
  },
});

export const {
  setRoute,
  clearRoute,
  setRouteString,
  clearRouteString,
  setLineColor,
  setEndPointColor,
  pushRoutePoint,
  removeRoutePoint,
  clearRoutePoints,
} = routeSlice.actions;

export default routeSlice.reducer;
