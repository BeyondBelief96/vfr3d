import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ImageryLayer, Viewer as ResiumViewer } from 'resium';
import FlyTo from '../features/Airports/FlyTo';
import VisibleAirports from '../features/Airports/VisibleAirports';
import AirspaceComponent from '../features/Airspace/AirspaceComponent';
import RouteComponent from '../features/Routes/RouteComponent';
import { useImageryProviders } from '../hooks/useImageryProviders';
import { fetchAllAirports } from '../redux/slices/airportsSlice';
import { toggleSidebar } from '../redux/slices/sidebarSlice';
import { AppDispatch, RootState } from '../redux/store';
import LoadingSpinner from '../ui/LoadingSpinner';
import Sidebar from '../ui/Sidebar';
import {
  ARCGIS_FAA_IFR_HIGH_URL,
  ARCGIS_FAA_IFR_LOW_URL,
  ARCGIS_FAA_VFR_SECTIONAL_URL,
  ARCGIS_FAA_VFR_TERMINAL_URL,
} from '../utility/constants';

const ViewerPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { airports } = useSelector((state: RootState) => state.airport);
  const { isOpen } = useSelector((state: RootState) => state.sidebar);
  const { currentImageryAlpha, currentImageryBrightness, selectedImageryLayer } = useSelector(
    (state: RootState) => state.viewer
  );

  const [airspace3dloading, setAirspace3dloading] = useState(false);

  useEffect(() => {
    if (airports.length) return;
    dispatch(fetchAllAirports());
  }, [dispatch, airports.length]);

  const imageryLayerOptions = [
    { value: 'vfrImagery', label: 'VFR' },
    { value: 'vfrTerminal', label: 'VFR TAC' },
    { value: 'ifrLowImagery', label: 'IFR Low' },
    { value: 'ifrHighImagery', label: 'IFR High' },
  ];

  const { imagery: vfrImagery } = useImageryProviders(
    import.meta.env.VITE_ARCGIS_API_KEY,
    ARCGIS_FAA_VFR_SECTIONAL_URL
  );

  const { imagery: ifrLowImagery } = useImageryProviders(
    import.meta.env.VITE_ARCGIS_API_KEY,
    ARCGIS_FAA_IFR_LOW_URL
  );

  const { imagery: ifrHighImagery } = useImageryProviders(
    import.meta.env.VITE_ARCGIS_API_KEY,
    ARCGIS_FAA_IFR_HIGH_URL
  );

  const { imagery: vfrTerminal } = useImageryProviders(
    import.meta.env.VITE_ARCGIS_API_KEY,
    ARCGIS_FAA_VFR_TERMINAL_URL
  );

  if (!vfrImagery) return null;

  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-1 overflow-hidden">
        <div className="lg:block lg:w-[25rem] lg:overflow-y-auto">
          <Sidebar imageryLayerOptions={imageryLayerOptions} />
        </div>
        <div className="flex-1">
          {airspace3dloading && <LoadingSpinner />}
          <ResiumViewer className="h-screen" geocoder={false} infoBox={false}>
            <AirspaceComponent setIsLoading={setAirspace3dloading} />
            <VisibleAirports />
            <FlyTo />
            <RouteComponent />
            {selectedImageryLayer === 'vfrImagery' && vfrImagery && (
              <ImageryLayer
                alpha={currentImageryAlpha ?? 1}
                brightness={currentImageryBrightness ?? 1}
                imageryProvider={vfrImagery}
                dayAlpha={currentImageryAlpha}
              />
            )}
            {selectedImageryLayer === 'vfrTerminal' && vfrTerminal && (
              <ImageryLayer
                alpha={currentImageryAlpha ?? 1}
                brightness={currentImageryBrightness ?? 1}
                imageryProvider={vfrTerminal}
                dayAlpha={currentImageryAlpha}
              />
            )}
            {selectedImageryLayer === 'ifrLowImagery' && ifrLowImagery && (
              <ImageryLayer
                alpha={currentImageryAlpha ?? 1}
                brightness={currentImageryAlpha ?? 1}
                imageryProvider={ifrLowImagery}
                dayAlpha={currentImageryAlpha}
              />
            )}
            {selectedImageryLayer === 'ifrHighImagery' && ifrHighImagery && (
              <ImageryLayer
                alpha={currentImageryAlpha ?? 1}
                brightness={currentImageryAlpha ?? 1}
                imageryProvider={ifrHighImagery}
                dayAlpha={currentImageryAlpha}
              />
            )}
          </ResiumViewer>
        </div>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 z-20 bg-black opacity-50 lg:hidden"
          onClick={() => dispatch(toggleSidebar())}
        ></div>
      )}
    </div>
  );
};

export default ViewerPage;
