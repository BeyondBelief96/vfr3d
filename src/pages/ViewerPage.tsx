import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ImageryLayer, Viewer as ResiumViewer } from 'resium';
import VisibleAirports from '../features/Airports/VisibleAirports';
import AirspaceComponent from '../features/Airspace/AirspaceComponent';
import RouteComponent from '../features/Routes/RouteComponent';
import { useImageryProviders } from '../hooks/useImageryProviders';
import {
  setImageryAlpha,
  setImageryBrightness,
  setSelectedLayer,
} from '../redux/slices/ViewerSlice';
import { fetchAllAirports } from '../redux/slices/airportsSlice';
import { AppDispatch, RootState } from '../redux/store';
import LoadingSpinner from '../ui/LoadingSpinner';
import SearchBar from '../ui/SearchBar';
import Sidebar from '../ui/Sidebar';
import {
  ARCGIS_FAA_IFR_HIGH_URL,
  ARCGIS_FAA_IFR_LOW_URL,
  ARCGIS_FAA_VFR_SECTIONAL_URL,
} from '../utility/constants';

const ViewerPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { airports } = useSelector((state: RootState) => state.airport);
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

  const handleLayerChange = (layer: string) => {
    dispatch(setSelectedLayer(layer));
  };

  const handleAlphaChange = (alpha: number) => {
    dispatch(setImageryAlpha(alpha));
  };

  const handleBrightnessChange = (brightness: number) => {
    dispatch(setImageryBrightness(brightness));
  };

  if (!vfrImagery) return null;

  return (
    <div className="flex h-screen">
      <div className="flex-none overflow-x-auto overflow-y-auto w-85 max-w-[23rem] bg-base-100">
        <Sidebar
          imageryLayerOptions={imageryLayerOptions}
          onLayerChange={handleLayerChange}
          onAlphaChange={handleAlphaChange}
          onBrightnessChange={handleBrightnessChange}
        />
      </div>
      <div className="flex-1">
        {airspace3dloading && <LoadingSpinner />}
        <ResiumViewer className="h-screen" geocoder={false} infoBox={false}>
          <AirspaceComponent setIsLoading={setAirspace3dloading} />
          <VisibleAirports />
          <SearchBar />
          <RouteComponent />
          {selectedImageryLayer === 'vfrImagery' && vfrImagery && (
            <ImageryLayer
              alpha={currentImageryAlpha ?? 1}
              brightness={currentImageryBrightness ?? 1}
              imageryProvider={vfrImagery}
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
  );
};

export default ViewerPage;
