import { ArcGisMapService } from 'cesium';
import { useState } from 'react';
import { ImageryLayer, Viewer } from 'resium';
import ImageryControls from '../features/Imagery/ImageryControls';
import { useImageryProviders } from '../hooks/useImageryProviders';
import { ARCGIS_FAA_VFR_SECTIONAL_URL } from '../utility/constants';

const ViewerPage = () => {
  ArcGisMapService.defaultAccessToken = import.meta.env.VITE_ARCGIS_API_KEY;
  const { arcGisImagery, vfrImagery } = useImageryProviders(
    import.meta.env.VITE_ARCGIS_API_KEY,
    ARCGIS_FAA_VFR_SECTIONAL_URL
  );

  const [imageryAlpha, setImageryAlpha] = useState(1);
  const [imageryBrightness, setImageryBrightness] = useState(1);

  const handleAlphaChange = (alpha: number) => {
    console.log(alpha);
    setImageryAlpha(alpha);
  };

  const handleBrightnessChange = (brightness: number) => {
    setImageryBrightness(brightness);
  };

  if (!arcGisImagery) return null;

  return (
    <div className="flex flex-col h-full">
      <Viewer className="flex-1" timeline={false} animation={false} geocoder={false}>
        {vfrImagery && (
          <ImageryLayer
            alpha={imageryAlpha ?? 1}
            brightness={imageryBrightness ?? 1}
            imageryProvider={vfrImagery}
            dayAlpha={imageryAlpha}
          />
        )}

        <ImageryControls
          onAlphaChange={handleAlphaChange}
          onBrightnessChange={handleBrightnessChange}
        />
      </Viewer>
    </div>
  );
};

export default ViewerPage;
