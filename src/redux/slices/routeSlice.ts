import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { faaApi } from '../api/faa/faaApi';
import { mapAirportToWaypoint } from '../../utility/utils';
import { Route, Waypoint } from 'vfr3d-shared';
import { calculateDistance } from '../../utility/routeUtils';
import { Cartesian3, Cartographic, Math } from 'cesium';

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

interface UpdateWaypointPositionPayload {
  waypointId: string;
  position: {
    latitude: number;
    longitude: number;
  };
}

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
    setRoutePoints: (state, action: PayloadAction<Waypoint[]>) => {
      if (state.route) {
        state.route.routePoints = action.payload;
      }
    },
    removeRoutePointByName: (state, action: PayloadAction<string>) => {
      if (state.route) {
        state.route.routePoints = state.route.routePoints.filter(
          (point: Waypoint) => point.name !== action.payload
        );
      }
    },
    addCustomWaypoint: (state, action: PayloadAction<Waypoint>) => {
      if (state.route) {
        const { routePoints } = state.route;
        const newWaypoint = action.payload;

        // Find the appropriate index to insert the new waypoint based on the shortest distance
        let insertIndex = routePoints.length; // Default to adding at the end
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

        // Check if the new waypoint should be added at the end
        if (insertIndex === routePoints.length) {
          const lastPoint = routePoints[routePoints.length - 1];
          const distanceToLast = calculateDistance(newWaypoint, lastPoint);

          if (distanceToLast < minDistance) {
            insertIndex = routePoints.length;
          }
        }

        routePoints.splice(insertIndex, 0, newWaypoint);
      }
    },
    removeCustomWaypointById: (state, action: PayloadAction<string>) => {
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
    updateWaypointPositionFlat: (state, action: PayloadAction<UpdateWaypointPositionPayload>) => {
      const { waypointId, position } = action.payload;
      const waypoint = state.route.routePoints.find((point) => point.id === waypointId);
      if (waypoint) {
        waypoint.latitude = position.latitude;
        waypoint.longitude = position.longitude;
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
  setRouteString,
  clearRouteString,
  setLineColor,
  setEndPointColor,
  setRoutePoints,
  clearRoutePoints,
  removeRoutePointByName,
  addCustomWaypoint,
  removeCustomWaypointById,
  updateCustomWaypointName,
  updateWaypointPositionFlat,
} = routeSlice.actions;

export default routeSlice.reducer;
