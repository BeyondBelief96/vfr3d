import { IonImageryProvider, ProviderViewModel, buildModuleUrl } from 'cesium';
import { useEffect, useState } from 'react';
import { Globe, Viewer as ResiumViewer } from 'resium';
import FlyTo from '../features/Airports/FlyTo';
import VisibleAirports from '../features/Airports/VisibleAirports';
import ImageryLayers from '../features/Imagery/ImageryLayers';
import LoadingSpinner from '../ui/ReusableComponents/LoadingSpinner';
import Sidebar from '../ui/Sidebar/Sidebar';
import { IMAGERY_LAYER_OPTIONS } from '../utility/constants';
import AirportInfoPopup from '../features/Airports/InformationPopup/AirportInfoPopup';
import { RoutesPanel } from '../features/Routes/RoutesPanel/RoutesPanel';
import RouteComponent from '../features/Routes/RouteComponent';

const ViewerPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  // const [airspace3dloading, setAirspace3dloading] = useState(false);
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

  // Used to give cesium some time to load so the viewer is ready to render.
  // If this is not here, the cesium viewer will not load. maybe there's something else
  // I need to figure out but this will do for now.
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  loadBaseImageryViewModels();

  return isLoading ? (
    <LoadingSpinner fullScreen={true} />
  ) : (
    <div className="flex h-screen">
      <Sidebar imageryLayerOptions={IMAGERY_LAYER_OPTIONS} />
      <div className="flex-1">
        {/* {airspace3dloading && <LoadingSpinner />} */}
        <ResiumViewer
          useBrowserRecommendedResolution={false}
          imageryProviderViewModels={imageryViewModels}
          className="h-full"
          geocoder={false}
          timeline={false}
          infoBox={false}
          animation={false}
        >
          <Globe maximumScreenSpaceError={1.3} />
          <ImageryLayers />
          {/* <AirspaceComponent setIsLoading={setAirspace3dloading} /> */}
          <VisibleAirports />
          <RouteComponent />
          <FlyTo />
        </ResiumViewer>
        <RoutesPanel />
        <AirportInfoPopup />
      </div>
    </div>
  );
};

export default ViewerPage;
