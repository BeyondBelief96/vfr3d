import { ImageryProvider, IonImageryProvider } from 'cesium';
import { useEffect, useState } from 'react';

export const useImageryProviderFromAsset = (assetId: number) => {
  const [imagery, setImagery] = useState<ImageryProvider | null>(null);

  useEffect(() => {
    const loadImagery = async () => {
      try {
        const imageryProvider = await IonImageryProvider.fromAssetId(assetId);
        setImagery(imageryProvider);
      } catch (error) {
        console.error('Error loading imagery providers:', error);
      }
    };

    loadImagery();
  }, [assetId]);

  return { imagery };
};
