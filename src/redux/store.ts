import { configureStore } from '@reduxjs/toolkit';
import viewerReducer from './slices/ViewerSlice';
import airportReducer from './slices/airportsSlice';
import airspaceReducer from './slices/airspaceSlice';
import entitiesReducer from './slices/entitiesSlice';
import routeReducer from './slices/routeSlice';
import searchReducer from './slices/searchSlice';
import sidebarReducer from './slices/sidebarSlice';
import navlogReducer from './slices/navlogSlice';
import pirepsReducer from './slices/pirepsSlice';
import authReducer from './slices/authSlice';
import { vfr3dApi } from './api/vfr3d/vfr3dSlice';
import { faaApi } from './api/faa/faaSlice';

const store = configureStore({
  reducer: {
    airport: airportReducer,
    route: routeReducer,
    viewer: viewerReducer,
    entities: entitiesReducer,
    airspace: airspaceReducer,
    search: searchReducer,
    sidebar: sidebarReducer,
    navlog: navlogReducer,
    auth: authReducer,
    pireps: pirepsReducer,
    [vfr3dApi.reducerPath]: vfr3dApi.reducer,
    [faaApi.reducerPath]: faaApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(vfr3dApi.middleware, faaApi.middleware),
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
