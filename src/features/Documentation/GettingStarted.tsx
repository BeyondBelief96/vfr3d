// components/GettingStarted.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const GettingStarted: React.FC = () => {
  return (
    <section id="getting-started" className="mb-12">
      <h2 className="mb-6 text-3xl font-bold">Getting Started</h2>
      <p className="mb-8 text-lg">
        Welcome to VFR3D, a powerful React/Cesium application that enables you to visualize and
        interact with geospatial data in a stunning 3D environment. This comprehensive guide will
        walk you through the essentials of navigating the Cesium viewer and leveraging the various
        layer options to customize your viewing experience.
      </p>

      <div className="mb-12">
        <h3 className="mb-4 text-2xl font-bold">Cesium Viewer Navigation</h3>
        <p className="mb-6 text-lg">
          The heart of VFR3D lies in the Cesium viewer, a highly interactive 3D visualization
          component that brings your geospatial data to life. Mastering the navigation controls is
          key to exploring and analyzing your data effectively. Let's dive into the different ways
          you can interact with the viewer:
        </p>
        <ul className="mb-6 space-y-4">
          <li className="flex items-start">
            <svg
              className="w-6 h-6 mr-2 text-primary"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            <div>
              <strong className="font-semibold">Panning:</strong> To effortlessly navigate across
              the 3D landscape, simply click and drag the left mouse button. This intuitive control
              allows you to smoothly pan the camera in any direction, granting you complete freedom
              to explore your data from various perspectives.
            </div>
          </li>
          <li className="flex items-start">
            <svg
              className="w-6 h-6 mr-2 text-primary"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
              />
            </svg>
            <div>
              <strong className="font-semibold">Zooming:</strong> Dive deeper into the details or
              pull back for a broader overview using the zooming controls. With a simple scroll of
              the mouse wheel, or holding your right mouse button, you can seamlessly zoom in and
              out of the scene. Alternatively, on touch devices, a two-finger pinch gesture provides
              the same level of precision and control.
            </div>
          </li>
          <li className="flex items-start">
            <svg
              className="w-6 h-6 mr-2 text-primary"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7l4-4m0 0l4 4m-4-4v18"
              />
            </svg>
            <div>
              <strong className="font-semibold">Tilting:</strong> Experience your data from unique
              angles by tilting the camera. Simply hold the middle mouse button (or Ctrl + left
              mouse button) and drag vertically to adjust the tilt. On touch devices, a two-finger
              vertical drag gesture offers the same level of control, empowering you to find the
              perfect vantage point.
            </div>
          </li>
        </ul>
      </div>

      <div className="mb-12">
        <h3 className="mb-4 text-2xl font-bold">Layer Management</h3>
        <p className="mb-6 text-lg">
          VFR3D offers a powerful layer management system that enables you to customize your viewing
          experience by controlling the visibility and appearance of various geospatial datasets.
          The layer panel, conveniently accessed via the "Layers" button (3rd button in the
          top-right corner of your viewer) is your gateway to a world of data visualization
          possibilities.
        </p>
        <ul className="mb-6 space-y-4">
          <li className="flex items-start">
            <svg
              className="w-6 h-6 mr-2 text-primary"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
            <div>
              <strong className="font-semibold">Layer Visibility:</strong> Take control of your data
              display by easily toggling the visibility of individual layers. We offer a few
              different geospatial layer options such as bing maps with roads, sentinel-2, and bings
              premier aerial imagery.
            </div>
          </li>
          <li className="flex items-start">
            <svg
              className="w-6 h-6 mr-2 text-primary"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
              />
            </svg>
            <div>
              <strong className="font-semibold">Terrain Imagery:</strong> VFR3D also offers use of
              Cesium's world terrain imagery. You can turn this on at the bottom of the layers menu
              at the (3rd button in the top-right corner) allows viewing of 3D terrain as you zoom
              closer into the map. This can be useful for ensuring your flights stay high and above
              any terrain! You can go back to a flat view by swapping to WGS84-Ellipsoid.
            </div>
          </li>
        </ul>
      </div>

      <div className="flex flex-col items-center p-6 bg-base-200 rounded-xl">
        <h3 className="mb-4 text-xl font-bold">Embark on Your VFR3D Journey</h3>
        <p className="mb-5 text-lg text-center">
          With a solid understanding of the Cesium viewer navigation and layer management
          capabilities, you are now ready to embark on an immersive exploration of geospatial flight
          planning charts and data. VFR3D empowers you with the tools and flexibility needed to
          analyze, visualize, and derive meaningful insights from your well known flight planning
          charts.
        </p>
        <Link to="/viewer" className="btn btn-primary w-28">
          Get Started
        </Link>
      </div>
    </section>
  );
};

export default GettingStarted;
