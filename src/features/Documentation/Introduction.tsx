// components/Introduction.tsx
import React from 'react';

const Introduction: React.FC = () => {
  return (
    <section id="introduction" className="mb-8">
      <h2 className="mb-4 text-2xl font-bold">Introduction</h2>
      <p>
        Welcome to the documentation for VFR3D, a React/Cesium application for visualizing 3D data.
      </p>
    </section>
  );
};

export default Introduction;
