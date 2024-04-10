import React, { useState } from 'react';

interface ImageryControlsProps {
  onAlphaChange: (alpha: number) => void;
  onBrightnessChange: (brightness: number) => void;
}

const ImageryControls: React.FC<ImageryControlsProps> = ({ onAlphaChange, onBrightnessChange }) => {
  const [alpha, setAlpha] = useState(1);
  const [brightness, setBrightness] = useState(1);

  const handleAlphaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newAlpha = parseFloat(event.target.value);
    setAlpha(newAlpha);
    onAlphaChange(newAlpha);
  };

  const handleBrightnessChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newBrightness = parseFloat(event.target.value);
    setBrightness(newBrightness);
    onBrightnessChange(newBrightness);
  };

  return (
    <div className="p-4 shadow -4 card bg-neutral text-neutral-contentleft-4">
      <div className="mb-4">
        <label htmlFor="alpha-slider" className="block mb-2">
          Alpha: {alpha.toFixed(2)}
        </label>
        <input
          id="alpha-slider"
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={alpha}
          onChange={handleAlphaChange}
          className="w-full"
        />
      </div>
      <div>
        <label htmlFor="brightness-slider" className="block mb-2">
          Brightness: {brightness.toFixed(2)}
        </label>
        <input
          id="brightness-slider"
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={brightness}
          onChange={handleBrightnessChange}
          className="w-full"
        />
      </div>
    </div>
  );
};

export default ImageryControls;
