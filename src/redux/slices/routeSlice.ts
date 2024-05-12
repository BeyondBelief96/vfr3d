import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { faaApi } from '../api/faa/faaApi';
import { mapAirportToWaypoint } from '../../utility/utils';
import { Route, Waypoint } from '../../features/Routes/route.interface';

interface RouteState {
  lineColor: string;
  pointColor: string;
  routeString: string;
  route: Route;
}

const initialState: RouteState = {
  lineColor: 'rgba(0, 255, 255, 1)', // Aqua
  pointColor: 'rgba(255, 0, 255, 1)', // Magenta
  routeString: '',
  route: {
    id: '1',
    name: 'my-route',
    routePoints: [],
  },
};

export const fetchAirportByCode = createAsyncThunk(
  'route/fetchAirportByCode',
  async (code: string, { dispatch }) => {
    if (code.length >= 3 && code.length <= 4) {
      const { data: airport } = await dispatch(
        faaApi.endpoints.getAirportByIcaoCodeOrIdent.initiate(code)
      );
      return airport;
    }
  }
);

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
    setRoute: (state, action: PayloadAction<Route>) => {
      state.route = action.payload;
    },
    setRoutePoints: (state, action: PayloadAction<Waypoint[]>) => {
      if (state.route) {
        state.route.routePoints = action.payload;
      }
    },
    pushRoutePoint: (state, action: PayloadAction<Waypoint>) => {
      if (state.route) {
        state.route.routePoints.push(action.payload);
      }
    },
    removeRoutePointByName: (state, action: PayloadAction<string>) => {
      if (state.route) {
        state.route.routePoints = state.route.routePoints.filter(
          (point) => point.name !== action.payload
        );
      }
    },
    insertRoutePointAtIndex: (
      state,
      action: PayloadAction<{ waypoint: Waypoint; index: number }>
    ) => {
      if (state.route) {
        const { waypoint, index } = action.payload;
        state.route.routePoints.splice(index, 0, waypoint);
      }
    },
    removeRoutePointAtIndex: (state, action: PayloadAction<number>) => {
      if (state.route) {
        state.route.routePoints.splice(action.payload, 1);
      }
    },
    clearRoutePoints: (state) => {
      if (state.route) {
        state.route.routePoints = [];
      }
    },
    setLineColor: (state, action: PayloadAction<string>) => {
      state.lineColor = action.payload;
    },
    setEndPointColor: (state, action: PayloadAction<string>) => {
      state.pointColor = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAirportByCode.fulfilled, (state, action) => {
      const airport = action.payload;
      if (airport && state.route) {
        const existingAirport = state.route.routePoints.find(
          (point) => point.name === airport.IDENT || point.name === airport.ICAO_ID
        );
        if (!existingAirport) {
          state.route.routePoints.push(mapAirportToWaypoint(airport));
        }
      }
    });
  },
});

export const {
  setRoute,
  setRouteString,
  clearRouteString,
  setLineColor,
  setEndPointColor,
  setRoutePoints,
  pushRoutePoint,
  removeRoutePointByName,
  clearRoutePoints,
  insertRoutePointAtIndex,
  removeRoutePointAtIndex,
} = routeSlice.actions;

export default routeSlice.reducer;
