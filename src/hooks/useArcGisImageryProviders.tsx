import { ArcGisMapServerImageryProvider, ImageryProvider } from 'cesium';
import { useEffect, useState } from 'react';

export const useArcGisImageryProviders = (imageryUrl: string) => {
  const [imagery, setImagery] = useState<ImageryProvider | null>(null);

  useEffect(() => {
    const loadImagery = async () => {
      try {
        const imageryProvider = await ArcGisMapServerImageryProvider.fromUrl(imageryUrl, {
          maximumLevel: 23,
        });
        setImagery(imageryProvider);
      } catch (error) {
        console.error('Error loading imagery providers:', error);
      }
    };

    loadImagery();
  }, [imageryUrl]);

  return { imagery };
};
