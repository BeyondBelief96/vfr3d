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
    }, 1);

    return () => clearTimeout(timer);
  }, []);

  const imageryLayerOptions = [
    { value: 'vfrImagery', label: 'VFR' },
    { value: 'vfrTerminal', label: 'VFR TAC' },
    { value: 'ifrLowImagery', label: 'IFR Low' },
    { value: 'ifrHighImagery', label: 'IFR High' },
  ];

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
          <ResiumViewer className="h-screen" geocoder={false} infoBox={false}>
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
