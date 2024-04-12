import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Route } from '../../features/Routes/Route';

interface RouteState {
  currentRoute: Route | null | undefined;
  lineColor: string;
  endPointColor: string;
}

const initialState: RouteState = {
  currentRoute: null,
  lineColor: 'rgba(0, 255, 255, 1)', // Aqua
  endPointColor: 'rgba(255, 255, 0, 1)', // Yellow
};

const routeSlice = createSlice({
  name: 'route',
  initialState,
  reducers: {
    setRoute: (state, action: PayloadAction<Route | undefined>) => {
      state.currentRoute = action.payload;
    },
    setLineColor: (state, action: PayloadAction<string>) => {
      state.lineColor = action.payload;
    },
    setEndPointColor: (state, action: PayloadAction<string>) => {
      state.endPointColor = action.payload;
    },
  },
});

export const { setRoute, setLineColor, setEndPointColor } = routeSlice.actions;
export default routeSlice.reducer;
