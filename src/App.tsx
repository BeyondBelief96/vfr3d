import React from 'react';
import { Ion, ArcGisMapService } from 'cesium';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import AppLayout from './AppLayout';
import { ContactMePage } from './pages/ContactMe';
import DocumentationPage from './pages/DocumentationPage';
import HomePage from './pages/Home';
import AuthenticatedViewerPage from './pages/ViewerPage';
import ErrorBoundary from './ui/ErrorBoundary';
import PrivateRoute from './ui/ReusableComponents/PrivateRoute';
import LoginPage from './pages/LoginPage';

const App: React.FC = () => {
  const arcGisApiKey = import.meta.env.VITE_ARCGIS_API_KEY;
  const cesiumAccessToken = import.meta.env.VITE_CESIUM_API_KEY;

  Ion.defaultAccessToken = cesiumAccessToken;
  ArcGisMapService.defaultAccessToken = arcGisApiKey;

  const router = createBrowserRouter([
    {
      element: <AppLayout />,
      children: [
        {
          path: '/',
          element: <HomePage />,
        },
        {
          path: '/Viewer',
          element: (
            <PrivateRoute>
              <AuthenticatedViewerPage />
            </PrivateRoute>
          ),
        },
        {
          path: '/contact',
          element: <ContactMePage />,
        },
        {
          path: '/documentation',
          element: <DocumentationPage />,
        },
        {
          path: '/login',
          element: <LoginPage />,
        },
      ],
      errorElement: <ErrorBoundary />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
