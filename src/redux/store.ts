import { configureStore } from '@reduxjs/toolkit';
import viewerReducer from './slices/ViewerSlice';
import airportReducer from './slices/airportsSlice';
import airspaceReducer from './slices/airspaceSlice';
import entitiesReducer from './slices/entitiesSlice';
import routeReducer from './slices/routeSlice';
import searchReducer from './slices/searchSlice';
import sidebarReducer from './slices/sidebarSlice';
import { faaApi } from './api/faa/faaApi';
import { weatherApi } from './api/vfr3d/weatherApi';

const store = configureStore({
  reducer: {
    airport: airportReducer,
    route: routeReducer,
    viewer: viewerReducer,
    entities: entitiesReducer,
    airspace: airspaceReducer,
    search: searchReducer,
    sidebar: sidebarReducer,
    [faaApi.reducerPath]: faaApi.reducer,
    [weatherApi.reducerPath]: weatherApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(faaApi.middleware, weatherApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
