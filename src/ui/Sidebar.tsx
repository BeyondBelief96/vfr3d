import React from 'react';
import ImageryControls from '../features/Imagery/ImageryControls';

interface SidebarProps {
  imageryLayerOptions: { value: string; label: string }[];
  selectedLayer: string;
  onLayerChange: (layer: string) => void;
  onAlphaChange: (alpha: number) => void;
  onBrightnessChange: (brightness: number) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  imageryLayerOptions,
  selectedLayer,
  onLayerChange,
  onAlphaChange,
  onBrightnessChange,
}) => {
  return (
    <div className="p-4 w-80 bg-base-100">
      <h2 className="mb-4 text-4xl font-bold text-base-content">Map Options</h2>
      <div className="mb-4">
        <label htmlFor="layer-select" className="block mb-2">
          Imagery Layer
        </label>
        <select
          id="layer-select"
          className="w-full select select-bordered"
          value={selectedLayer}
          onChange={(e) => onLayerChange(e.target.value)}
        >
          {imageryLayerOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <ImageryControls onAlphaChange={onAlphaChange} onBrightnessChange={onBrightnessChange} />
    </div>
  );
};

export default Sidebar;
