import React from 'react';
import { Ion, ArcGisMapService } from 'cesium';
import { RouterProvider, createBrowserRouter, Navigate } from 'react-router-dom';
import AppLayout from './AppLayout';
import { ContactMePage } from './pages/ContactMe';
import DocumentationPage from './pages/DocumentationPage';
import HomePage from './pages/Home';
import ErrorBoundary from './ui/ErrorBoundary';
import LoginPage from './pages/LoginPage';
import AuthenticatedViewerPage from './pages/ViewerPage';
import { useAuth0 } from '@auth0/auth0-react';
import LoadingSpinner from './ui/ReusableComponents/LoadingSpinner';

const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) return <LoadingSpinner />;
  return isAuthenticated ? <AuthenticatedViewerPage /> : <Navigate to="/login" />;
};

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
          element: <ProtectedRoute />,
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
