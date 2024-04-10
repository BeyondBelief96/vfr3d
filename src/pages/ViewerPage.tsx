import { useState } from 'react';
import { ImageryLayer, Viewer } from 'resium';
import Airports from '../features/Airports/Airports';
import { useImageryProviders } from '../hooks/useImageryProviders';
import Sidebar from '../ui/Sidebar';
import {
  ARCGIS_FAA_IFR_HIGH_URL,
  ARCGIS_FAA_IFR_LOW_URL,
  ARCGIS_FAA_VFR_SECTIONAL_URL,
} from '../utility/constants';

const ViewerPage = () => {
  const [imageryAlpha, setImageryAlpha] = useState(1);
  const [imageryBrightness, setImageryBrightness] = useState(1);
  const [selectedLayer, setSelectedLayer] = useState('vfrImagery');

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
    setSelectedLayer(layer);
  };

  const handleAlphaChange = (alpha: number) => {
    setImageryAlpha(alpha);
  };

  const handleBrightnessChange = (brightness: number) => {
    setImageryBrightness(brightness);
  };

  if (!vfrImagery) return null;

  return (
    <div className="flex h-screen">
      <div className="flex-none overflow-y-auto w-80 bg-base-100">
        <Sidebar
          imageryLayerOptions={imageryLayerOptions}
          selectedLayer={selectedLayer}
          onLayerChange={handleLayerChange}
          onAlphaChange={handleAlphaChange}
          onBrightnessChange={handleBrightnessChange}
        />
      </div>
      <div className="flex-1">
        <Viewer className="h-screen">
          <Airports />
          {selectedLayer === 'vfrImagery' && vfrImagery && (
            <ImageryLayer
              alpha={imageryAlpha ?? 1}
              brightness={imageryBrightness ?? 1}
              imageryProvider={vfrImagery}
              dayAlpha={imageryAlpha}
            />
          )}
          {selectedLayer === 'ifrLowImagery' && ifrLowImagery && (
            <ImageryLayer
              alpha={imageryAlpha ?? 1}
              brightness={imageryBrightness ?? 1}
              imageryProvider={ifrLowImagery}
              dayAlpha={imageryAlpha}
            />
          )}
          {selectedLayer === 'ifrHighImagery' && ifrHighImagery && (
            <ImageryLayer
              alpha={imageryAlpha ?? 1}
              brightness={imageryBrightness ?? 1}
              imageryProvider={ifrHighImagery}
              dayAlpha={imageryAlpha}
            />
          )}
        </Viewer>
      </div>
    </div>
  );
};

export default ViewerPage;
