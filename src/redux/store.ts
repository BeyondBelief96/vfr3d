import { configureStore } from '@reduxjs/toolkit';
import viewerReducer from './slices/ViewerSlice';
import airportReducer from './slices/airportsSlice';
import airspaceReducer from './slices/airspaceSlice';
import entitiesReducer from './slices/entitiesSlice';
import routeReducer from './slices/routeSlice';
import searchReducer from './slices/searchSlice';
import sidebarReducer from './slices/sidebarSlice';

const store = configureStore({
  reducer: {
    airport: airportReducer,
    route: routeReducer,
    viewer: viewerReducer,
    entities: entitiesReducer,
    airspace: airspaceReducer,
    search: searchReducer,
    sidebar: sidebarReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
