import { IonImageryProvider, ProviderViewModel, buildModuleUrl } from 'cesium';
import { useEffect, useState } from 'react';
import { Viewer as ResiumViewer } from 'resium';
import FlyTo from '../features/Airports/FlyTo';
import VisibleAirports from '../features/Airports/VisibleAirports';
import AirspaceComponent from '../features/Airspace/AirspaceComponent';
import ImageryLayers from '../features/Imagery/ImageryLayers';
import RouteComponent from '../features/Routes/RouteComponent';
import LoadingSpinner from '../ui/ReusableComponents/LoadingSpinner';
import Sidebar from '../ui/Sidebar/Sidebar';
import { IMAGERY_LAYER_OPTIONS } from '../utility/constants';
import AirportInfoPopup from '../features/Airports/InformationPopup/AirportInfoPopup';

const ViewerPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [airspace3dloading, setAirspace3dloading] = useState(false);
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
    <div className="flex flex-col h-screen">
      <div className="flex flex-1 overflow-hidden">
        <div className="lg:block lg:w-[25rem] lg:overflow-y-auto">
          <Sidebar imageryLayerOptions={IMAGERY_LAYER_OPTIONS} />
        </div>
        <div className="flex-1">
          {airspace3dloading && <LoadingSpinner />}
          <ResiumViewer
            imageryProviderViewModels={imageryViewModels}
            className="h-screen"
            geocoder={false}
            timeline={false}
          >
            <ImageryLayers />
            <AirspaceComponent setIsLoading={setAirspace3dloading} />
            <VisibleAirports />
            <FlyTo />
            <RouteComponent />
          </ResiumViewer>
          <AirportInfoPopup />
        </div>
      </div>
    </div>
  );
};

export default ViewerPage;
