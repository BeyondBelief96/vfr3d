// MapOptions.tsx
import React, { useMemo } from 'react';
import ImageryControls from '../../features/Imagery/ImageryControls';
import useMapOptions from '../../hooks/useMapOptions';
import { IMAGERY_LAYER_OPTIONS as imagerylayerOptions } from '../../utility/constants';

const MapOptions: React.FC = React.memo(() => {
  const { selectedImageryLayer, handleLayerChange, handleAlphaChange, handleBrightnessChange } =
    useMapOptions();
  const renderImageryLayerOptions = useMemo(() => {
    return imagerylayerOptions.map((option) => (
      <option key={option.layerName} value={option.layerName}>
        {option.displayLabel}
      </option>
    ));
  }, []);

  return (
    <div>
      <h2 className="mb-2 text-lg font-semibold">Map Options</h2>
      <div className="mb-4">
        <label htmlFor="layer-select" className="block mb-2">
          Aviation Chart Layer
        </label>
        <select
          id="layer-select"
          className="w-full select select-bordered"
          value={selectedImageryLayer}
          onChange={(e) => handleLayerChange(e.target.value)}
        >
          {renderImageryLayerOptions}
        </select>
      </div>
      <ImageryControls
        onAlphaChange={handleAlphaChange}
        onBrightnessChange={handleBrightnessChange}
      />
    </div>
  );
});

export default MapOptions;
