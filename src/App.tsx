import { ArcGisMapService, Ion } from 'cesium';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import AppLayout from './AppLayout';
import HomePage from './pages/Home';
import ViewerPage from './pages/ViewerPage';

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
        element: <ViewerPage />,
      },
    ],
  },
]);

function App() {
  const arcGisApiKey = import.meta.env.VITE_ARCGIS_API_KEY;
  const cesiumAccessToken = import.meta.env.VITE_CESIUM_API_KEY;

  Ion.defaultAccessToken = cesiumAccessToken;
  ArcGisMapService.defaultAccessToken = arcGisApiKey;

  return <RouterProvider router={router} />;
}

export default App;
