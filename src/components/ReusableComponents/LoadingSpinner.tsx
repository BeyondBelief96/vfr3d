import React from 'react';

interface LoadingSpinnerProps {
  fullScreen?: boolean;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ fullScreen = true }) => {
  return (
    <div
      className={`${
        fullScreen
          ? 'fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'
          : 'flex items-center justify-center'
      }`}
    >
      <div className="border-4 border-blue-500 border-solid rounded-full animate-spin">
        <div className="w-12 h-12 border-4 border-blue-500 border-solid rounded-full border-t-transparent"></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
