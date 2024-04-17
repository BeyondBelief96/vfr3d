import { ImageryLayer, IonImageryProvider, ProviderViewModel, buildModuleUrl } from 'cesium';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Viewer as ResiumViewer } from 'resium';
import FlyTo from '../features/Airports/FlyTo';
import VisibleAirports from '../features/Airports/VisibleAirports';
import AirspaceComponent from '../features/Airspace/AirspaceComponent';
import ImageryLayers from '../features/Imagery/ImageryLayers';
import RouteComponent from '../features/Routes/RouteComponent';
import { fetchAllAirports } from '../redux/slices/airportsSlice';
import { AppDispatch, RootState } from '../redux/store';
import LoadingSpinner from '../ui/LoadingSpinner';
import Sidebar from '../ui/Sidebar';

const ViewerPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { airports } = useSelector((state: RootState) => state.airport);
  const [isLoading, setIsLoading] = useState(true);
  const [airspace3dloading, setAirspace3dloading] = useState(false);
  const imageryViewModels: ProviderViewModel[] = [];
  const loadBaseImageryViewModels = () => {
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
  };

  useEffect(() => {
    if (airports.length) return;
    dispatch(fetchAllAirports());
  }, [dispatch, airports.length]);

  // Used to give cesium some time to load so the viewer is ready to render.
  // If this is not here, the cesium viewer will not load. maybe there's something else
  // I need to figure out but this will do for now.
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const imageryLayerOptions = [
    { value: 'None', label: 'None' },
    { value: 'vfrImagery', label: 'VFR' },
    { value: 'vfrTerminal', label: 'VFR TAC' },
    { value: 'ifrLowImagery', label: 'IFR Low' },
    { value: 'ifrHighImagery', label: 'IFR High' },
  ];

  loadBaseImageryViewModels();

  return isLoading ? (
    <LoadingSpinner fullScreen={true} />
  ) : (
    <div className="flex flex-col h-screen">
      <div className="flex flex-1 overflow-hidden">
        <div className="lg:block lg:w-[25rem] lg:overflow-y-auto">
          <Sidebar imageryLayerOptions={imageryLayerOptions} />
        </div>
        <div className="flex-1">
          {airspace3dloading && <LoadingSpinner />}
          <ResiumViewer
            imageryProviderViewModels={imageryViewModels}
            baseLayer={ImageryLayer.fromProviderAsync(IonImageryProvider.fromAssetId(3954), {})}
            className="h-screen"
            geocoder={false}
            infoBox={false}
          >
            <ImageryLayers />
            <AirspaceComponent setIsLoading={setAirspace3dloading} />
            <VisibleAirports />
            <FlyTo />
            <RouteComponent />
          </ResiumViewer>
        </div>
      </div>
    </div>
  );
};

export default ViewerPage;
