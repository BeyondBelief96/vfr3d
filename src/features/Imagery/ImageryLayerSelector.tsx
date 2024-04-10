import React from 'react';

interface ImageryLayerSelectorProps {
  options: { value: string; label: string }[];
  selectedLayer: string;
  onLayerChange: (layer: string) => void;
}

const ImageryLayerSelector: React.FC<ImageryLayerSelectorProps> = ({
  options,
  selectedLayer,
  onLayerChange,
}) => {
  return (
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="m-1 btn">
        Select Imagery Layer
      </label>
      <ul tabIndex={0} className="p-2 shadow dropdown-content menu bg-base-100 rounded-box w-52">
        {options.map((option) => (
          <li key={option.value}>
            <a
              className={`${selectedLayer === option.value ? 'active' : ''}`}
              onClick={() => onLayerChange(option.value)}
            >
              {option.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ImageryLayerSelector;
