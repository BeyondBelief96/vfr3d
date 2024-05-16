import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { faaApi } from '../api/faa/faaApi';
import { mapAirportToWaypoint } from '../../utility/utils';
import { Route, Waypoint } from 'vfr3d-shared';
import { calculateDistance } from '../../utility/routeUtils';

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
          (point: Waypoint) => point.name !== action.payload
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
    addCustomWaypoint: (state, action: PayloadAction<Waypoint>) => {
      if (state.route) {
        const { routePoints } = state.route;
        const newWaypoint = action.payload;

        // Find the appropriate index to insert the new waypoint based on the shortest distance
        let insertIndex = 0;
        let minDistance = Infinity;

        for (let i = 0; i < routePoints.length - 1; i++) {
          const startPoint = routePoints[i];
          const endPoint = routePoints[i + 1];

          const distanceToStart = calculateDistance(newWaypoint, startPoint);
          const distanceToEnd = calculateDistance(newWaypoint, endPoint);
          const totalDistance = distanceToStart + distanceToEnd;

          if (totalDistance < minDistance) {
            minDistance = totalDistance;
            insertIndex = i + 1;
          }
        }

        routePoints.splice(insertIndex, 0, newWaypoint);
      }
    },
    removeCustomWaypoint: (state, action: PayloadAction<string>) => {
      if (state.route) {
        const { routePoints } = state.route;
        const waypointId = action.payload;

        // Find the index of the waypoint to remove
        const removeIndex = routePoints.findIndex((point) => point.id === waypointId);

        if (removeIndex !== -1) {
          // Remove the waypoint at the found index
          routePoints.splice(removeIndex, 1);
        }
      }
    },
    updateCustomWaypointName: (state, action: PayloadAction<{ id: string; name: string }>) => {
      if (state.route) {
        const { id, name } = action.payload;
        const waypointIndex = state.route.routePoints.findIndex((point) => point.id === id);

        if (waypointIndex !== -1) {
          state.route.routePoints[waypointIndex].name = name;
        }
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
          (point: Waypoint) => point.name === airport.IDENT || point.name === airport.ICAO_ID
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
  addCustomWaypoint,
  removeCustomWaypoint,
  updateCustomWaypointName,
} = routeSlice.actions;

export default routeSlice.reducer;
