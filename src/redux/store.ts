import { configureStore } from '@reduxjs/toolkit';
import viewerReducer from './slices/ViewerSlice';
import airportReducer from './slices/airportsSlice';
import airspaceReducer from './slices/airspaceSlice';
import entitiesReducer from './slices/entitiesSlice';
import routeReducer from './slices/routeSlice';
import searchReducer from './slices/searchSlice';
import sidebarReducer from './slices/sidebarSlice';
import { baseApi } from './api/apiSlice';

const store = configureStore({
  reducer: {
    airport: airportReducer,
    route: routeReducer,
    viewer: viewerReducer,
    entities: entitiesReducer,
    airspace: airspaceReducer,
    search: searchReducer,
    sidebar: sidebarReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware),
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
