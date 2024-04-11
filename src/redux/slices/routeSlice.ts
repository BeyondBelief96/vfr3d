import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Route } from '../../features/Routes/Route';

interface RouteState {
  currentRoute: Route | null | undefined;
}

const initialState: RouteState = {
  currentRoute: null,
};

const routeSlice = createSlice({
  name: 'route',
  initialState,
  reducers: {
    setRoute: (state, action: PayloadAction<Route | undefined>) => {
      state.currentRoute = action.payload;
    },
  },
});

export const { setRoute } = routeSlice.actions;

export default routeSlice.reducer;
