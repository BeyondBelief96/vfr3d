// MapOptions.tsx
import React from 'react';
import ImageryControls from '../../features/Imagery/ImageryControls';
import useMapOptions from '../../hooks/useMapOptions';

interface MapOptionsProps {
  imageryLayerOptions: { value: string; label: string }[];
}

const MapOptions: React.FC<MapOptionsProps> = ({ imageryLayerOptions }) => {
  const { selectedImageryLayer, handleLayerChange, handleAlphaChange, handleBrightnessChange } =
    useMapOptions();

  return (
    <div className="mb-6">
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
          {imageryLayerOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <ImageryControls
        onAlphaChange={handleAlphaChange}
        onBrightnessChange={handleBrightnessChange}
      />
    </div>
  );
};

export default MapOptions;
