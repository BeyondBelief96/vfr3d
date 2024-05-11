import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Airport } from '../api/faa/faa.interface';
import { faaApi } from '../api/faa/faaApi';

interface RouteState {
  lineColor: string;
  pointColor: string;
  routeString: string;
  routePoints: Airport[];
}

const initialState: RouteState = {
  lineColor: 'rgba(0, 255, 255, 1)', // Aqua
  pointColor: 'rgba(255, 255, 0, 1)', // Yellow
  routeString: '',
  routePoints: [],
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
    setRoutePoints: (state, action: PayloadAction<Airport[]>) => {
      state.routePoints = action.payload;
    },
    pushRoutePoint: (state, action: PayloadAction<Airport>) => {
      state.routePoints.push(action.payload);
    },
    removeRoutePointByCode: (state, action: PayloadAction<string>) => {
      state.routePoints = state.routePoints.filter(
        (point) => point.IDENT !== action.payload && point.ICAO_ID !== action.payload
      );
    },
    insertRoutePointAtIndex: (
      state,
      action: PayloadAction<{ airport: Airport; index: number }>
    ) => {
      const { airport, index } = action.payload;
      state.routePoints.splice(index, 0, airport);
    },
    removeRoutePointAtIndex: (state, action: PayloadAction<number>) => {
      state.routePoints.splice(action.payload, 1);
    },
    clearRoutePoints: (state) => {
      state.routePoints = [];
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
      if (airport) {
        const existingAirport = state.routePoints.find(
          (point) => point.IDENT === airport.IDENT || point.ICAO_ID === airport.ICAO_ID
        );
        if (!existingAirport) {
          state.routePoints.push(airport);
        }
      }
    });
  },
});

export const {
  setRouteString,
  clearRouteString,
  setLineColor,
  setEndPointColor,
  setRoutePoints,
  pushRoutePoint,
  removeRoutePointByCode,
  clearRoutePoints,
  insertRoutePointAtIndex,
  removeRoutePointAtIndex,
} = routeSlice.actions;

export default routeSlice.reducer;
