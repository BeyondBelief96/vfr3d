import { ArcGisBaseMapType, ArcGisMapServerImageryProvider, ImageryProvider } from 'cesium';
import { useEffect, useState } from 'react';

export const useImageryProviders = (arcGisApiKey: string, imageryUrl: string) => {
  const [arcGisImagery, setArcGisImagery] = useState<ImageryProvider | null>(null);
  const [vfrImagery, setVfrImagery] = useState<ImageryProvider | null>(null);

  useEffect(() => {
    const loadImagery = async () => {
      try {
        const arcGisImageryProvider = await ArcGisMapServerImageryProvider.fromBasemapType(
          ArcGisBaseMapType.SATELLITE
        );
        setArcGisImagery(arcGisImageryProvider);

        const vfrImageryProvider = await ArcGisMapServerImageryProvider.fromUrl(imageryUrl);
        setVfrImagery(vfrImageryProvider);
      } catch (error) {
        console.error('Error loading imagery providers:', error);
      }
    };

    loadImagery();
  }, [arcGisApiKey, imageryUrl]);

  return { arcGisImagery, vfrImagery };
};
