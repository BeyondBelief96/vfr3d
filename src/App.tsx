import React from 'react';
import { Ion, ArcGisMapService } from 'cesium';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import AppLayout from './AppLayout';
import { ContactMePage } from './pages/ContactMe';
import DocumentationPage from './pages/DocumentationPage';
import HomePage from './pages/Home';
import ViewerPage from './pages/ViewerPage';
import ErrorBoundary from './ui/ErrorBoundary';
import PrivateRoute from './ui/ReusableComponents/PrivateRoute';
import LoginPage from './pages/LoginPage';
import LoadingSpinner from './ui/ReusableComponents/LoadingSpinner';

const App: React.FC = () => {
  const { isLoading } = useAuth0();
  const arcGisApiKey = import.meta.env.VITE_ARCGIS_API_KEY;
  const cesiumAccessToken = import.meta.env.VITE_CESIUM_API_KEY;

  Ion.defaultAccessToken = cesiumAccessToken;
  ArcGisMapService.defaultAccessToken = arcGisApiKey;

  if (isLoading) {
    return <LoadingSpinner />;
  }

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
              <ViewerPage />
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
