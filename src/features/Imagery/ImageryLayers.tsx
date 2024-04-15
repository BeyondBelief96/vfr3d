import { useSelector } from 'react-redux';
import { ImageryLayer } from 'resium';
import { useImageryProviders } from '../../hooks/useImageryProviders';
import { RootState } from '../../redux/store';
import {
  ARCGIS_FAA_IFR_HIGH_URL,
  ARCGIS_FAA_IFR_LOW_URL,
  ARCGIS_FAA_VFR_SECTIONAL_URL,
  ARCGIS_FAA_VFR_TERMINAL_URL,
} from '../../utility/constants';

const ImageryLayers: React.FC = () => {
  const { currentImageryAlpha, currentImageryBrightness, selectedImageryLayer } = useSelector(
    (state: RootState) => state.viewer
  );

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
  return (
    <>
      {selectedImageryLayer === 'vfrImagery' && vfrImagery && (
        <ImageryLayer
          minimumTerrainLevel={7}
          maximumTerrainLevel={13}
          alpha={currentImageryAlpha ?? 1}
          brightness={currentImageryBrightness ?? 1}
          imageryProvider={vfrImagery}
          dayAlpha={currentImageryAlpha}
        />
      )}
      {selectedImageryLayer === 'vfrTerminal' && vfrTerminal && (
        <ImageryLayer
          minimumTerrainLevel={9}
          maximumTerrainLevel={13}
          alpha={currentImageryAlpha ?? 1}
          brightness={currentImageryBrightness ?? 1}
          imageryProvider={vfrTerminal}
          dayAlpha={currentImageryAlpha}
        />
      )}
      {selectedImageryLayer === 'ifrLowImagery' && ifrLowImagery && (
        <ImageryLayer
          minimumTerrainLevel={5}
          maximumTerrainLevel={10}
          alpha={currentImageryAlpha ?? 1}
          brightness={currentImageryAlpha ?? 1}
          imageryProvider={ifrLowImagery}
          dayAlpha={currentImageryAlpha}
        />
      )}
      {selectedImageryLayer === 'ifrHighImagery' && ifrHighImagery && (
        <ImageryLayer
          minimumTerrainLevel={4}
          maximumTerrainLevel={9}
          alpha={currentImageryAlpha ?? 1}
          brightness={currentImageryAlpha ?? 1}
          imageryProvider={ifrHighImagery}
          dayAlpha={currentImageryAlpha}
        />
      )}
    </>
  );
};

export default ImageryLayers;
