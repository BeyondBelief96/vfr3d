import { ArcGisMapServerImageryProvider, ImageryProvider } from 'cesium';
import { useEffect, useState } from 'react';

export const useImageryProviders = (arcGisApiKey: string, imageryUrl: string) => {
  const [imagery, setImagery] = useState<ImageryProvider | null>(null);

  useEffect(() => {
    const loadImagery = async () => {
      try {
        const imageryProvider = await ArcGisMapServerImageryProvider.fromUrl(imageryUrl);
        setImagery(imageryProvider);
      } catch (error) {
        console.error('Error loading imagery providers:', error);
      }
    };

    loadImagery();
  }, [arcGisApiKey, imageryUrl]);

  return { imagery };
};
