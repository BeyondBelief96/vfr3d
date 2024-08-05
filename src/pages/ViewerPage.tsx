import { IonImageryProvider, ProviderViewModel, buildModuleUrl } from 'cesium';
import { useEffect } from 'react';
import { Globe, Viewer as ResiumViewer } from 'resium';
import FlyTo from '../features/Airports/FlyTo';
import Airports from '../features/Airports/Airports';
import ImageryLayers from '../features/Imagery/ImageryLayers';
import LoadingSpinner from '../components/ReusableComponents/LoadingSpinner';
import Sidebar from '../components/Sidebar/Sidebar';
import { RoutesPanel } from '../features/Routes/RoutesPanel/RoutesPanel';
import RouteComponent from '../features/Routes/RouteComponent';
import { useDispatch } from 'react-redux';
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import { setAccessToken } from '../redux/slices/authSlice';
import { Pireps } from '../features/Pireps/Pireps';
import AirsigmetComponent from '../features/Airsigmets/AirsigmetComponent';
import EntityInfoPopupManager from '../components/ReusableComponents/EntityInfoPopupManager';

const ViewerPage = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const imageryViewModels: ProviderViewModel[] = [];

  const loadBaseImageryViewModels = () => {
    imageryViewModels.push(
      new ProviderViewModel({
        name: 'Sentinel-2',
        iconUrl: buildModuleUrl('Widgets/Images/ImageryProviders/sentinel-2.png'),
        tooltip: 'Sentinel-2 cloudless.',
        creationFunction: function () {
          return IonImageryProvider.fromAssetId(3954);
        },
      })
    );

    imageryViewModels.push(
      new ProviderViewModel({
        name: 'Bing Maps Aerial',
        iconUrl: buildModuleUrl('Widgets/Images/ImageryProviders/bingAerial.png'),
        tooltip: 'Bing Satellite Imagery',
        creationFunction: function () {
          return IonImageryProvider.fromAssetId(2);
        },
      })
    );

    imageryViewModels.push(
      new ProviderViewModel({
        name: 'Bing Maps Road',
        iconUrl: buildModuleUrl('Widgets/Images/ImageryProviders/bingRoads.png'),
        tooltip: 'Bing Maps With Roads',
        creationFunction: function () {
          return IonImageryProvider.fromAssetId(4);
        },
      })
    );
  };

  useEffect(() => {
    const getAccessToken = async () => {
      try {
        const token = await getAccessTokenSilently();
        dispatch(setAccessToken(token));
      } catch (error) {
        console.error('Error getting access token:', error);
      }
    };

    if (isAuthenticated) {
      getAccessToken();
    }
  }, [getAccessTokenSilently, isAuthenticated, dispatch]);

  loadBaseImageryViewModels();

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1">
        <ResiumViewer
          useBrowserRecommendedResolution={false}
          imageryProviderViewModels={imageryViewModels}
          geocoder={false}
          className="h-screen"
          timeline={false}
          infoBox={false}
          animation={false}
          selectionIndicator={false}
        >
          <Globe maximumScreenSpaceError={1.3} />
          <ImageryLayers />
          <Airports />
          <Pireps />
          <RouteComponent />
          <AirsigmetComponent />
          <FlyTo />
        </ResiumViewer>
        <RoutesPanel />
        <EntityInfoPopupManager />
      </div>
    </div>
  );
};

const AuthenticatedViewerPage = withAuthenticationRequired(ViewerPage, {
  onRedirecting: () => <LoadingSpinner fullScreen={true} />,
});

export default AuthenticatedViewerPage;
