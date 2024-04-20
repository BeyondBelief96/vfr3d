// components/Features.tsx
import React from 'react';

const Features: React.FC = () => {
  return (
    <section id="features" className="mb-8">
      <h2 className="mb-4 text-2xl font-bold">Features</h2>
      <ul className="space-y-8">
        <li id="search-bar">
          <h3 className="mb-2 text-xl font-bold">Search Bar</h3>
          <p className="mb-4">
            The search bar, located in the top left corner of the viewer page, allows you to quickly
            search for and navigate to specific airports using their ICAO codes.
          </p>
          <div className="ml-4">
            <h4 className="mb-2 text-lg font-semibold">How to use:</h4>
            <ol className="list-decimal list-inside">
              <li>Click on the search bar to activate it.</li>
              <li>Enter the ICAO code of the airport you want to search for.</li>
              <li>Press the Enter key or click the search icon to initiate the search.</li>
            </ol>
          </div>
          <div className="mt-4 ml-4">
            <h4 className="mb-2 text-lg font-semibold">Example:</h4>
            <p>
              To search for the San Francisco International Airport, enter "KSFO" in the search bar
              and press Enter. The viewer will navigate to the airport's location.
            </p>
          </div>
        </li>
        <li id="imagery-controls">
          <h3 className="mb-2 text-xl font-bold">Imagery Controls</h3>
          <p className="mb-4">
            The Imagery Controls, located in the sidebar, allow you to select the current map you
            want to view and adjust its appearance settings.
          </p>
          <div className="ml-4">
            <h4 className="mb-2 text-lg font-semibold">Aviation Chart Layer:</h4>
            <p className="mb-4">
              The Aviation Chart Layer dropdown menu provides a selection of current maps to choose
              from, including:
            </p>
            <ul className="mb-4 ml-6 list-disc">
              <li>VFR Sectional</li>
              <li>TAC Charts</li>
              <li>IFR Lows</li>
              <li>IFR Highs</li>
            </ul>
            <p>
              To change the current map, simply select the desired option from the dropdown menu.
              The map will update automatically to display the selected chart.
            </p>
          </div>
          <div className="mt-4 ml-4">
            <h4 className="mb-2 text-lg font-semibold">Appearance Settings:</h4>
            <p className="mb-4">
              The Imagery Controls also provide sliders to adjust the appearance settings of the
              selected current map:
            </p>
            <ul className="mb-4 ml-6 list-disc">
              <li>
                <strong>Alpha:</strong> Adjusts the transparency of the current map. Drag the slider
                to the left to make the map more transparent or to the right to make it more opaque.
                The current alpha value is displayed next to the slider.
              </li>
              <li>
                <strong>Brightness:</strong> Adjusts the brightness of the current map. Drag the
                slider to the left to decrease the brightness or to the right to increase it. The
                current brightness value is displayed next to the slider.
              </li>
            </ul>
            <p>
              These appearance settings allow you to customize the visibility and clarity of the
              current map to suit your preferences and the{' '}
            </p>
          </div>
        </li>
        <li id="airports">
          <h3 className="mb-2 text-xl font-bold">Airports</h3>
          <p className="mb-4">
            The Airports feature in VFR 3D allows you to visualize and explore airports by state.
            You can toggle the visibility of airports and access detailed information about each
            airport.
          </p>
          <div className="ml-4">
            <h4 className="mb-2 text-lg font-semibold">Toggling Airport Visibility:</h4>
            <p className="mb-4">To display airports on the map, follow these steps:</p>
            <ol className="mb-4 ml-6 list-decimal">
              <li>
                In the Airports section, select the desired state from the "Select State" dropdown
                menu.
              </li>
              <li>Toggle the "Show Airports" switch to the "On" position.</li>
            </ol>
            <p>
              Once the "Show Airports" switch is enabled, the airports for the selected state will
              be displayed on the map as points.
            </p>
          </div>
          <div className="mt-4 ml-4">
            <h4 className="mb-2 text-lg font-semibold">Airport Information (Coming Soon):</h4>
            <p className="mb-4">
              We are actively working on a feature that will allow you to access detailed
              information about each airport by clicking on its point on the map. This information
              may include:
            </p>
            <ul className="mb-4 ml-6 list-disc">
              <li>Airport name</li>
              <li>ICAO code</li>
              <li>Elevation</li>
              <li>Runways</li>
              <li>Frequencies</li>
              <li>Other relevant details</li>
            </ul>
            <p>
              Stay tuned for updates on this exciting feature, which will provide valuable insights
              and data about each airport directly within the VFR 3D application.
            </p>
          </div>
        </li>
        <li id="route-plotting">
          <h3 className="mb-2 text-xl font-bold">Route Plotting</h3>
          <p className="mb-4">
            The Route Plotting feature in VFR 3D allows you to plot routes between two airports and
            customize the appearance of the route line and points.
          </p>
          <div className="ml-4">
            <h4 className="mb-2 text-lg font-semibold">Plotting a Route:</h4>
            <ol className="mb-4 ml-6 list-decimal">
              <li>In the sidebar, locate the "Route Plotting" section.</li>
              <li>
                Enter the ICAO code of the departure airport in the "From Airport" input field.
              </li>
              <li>
                Enter the ICAO code of the destination airport in the "To Airport" input field.
              </li>
              <li>Click the "Plot Route" button to generate the route between the two airports.</li>
            </ol>
            <p>
              The route will be displayed on the map as a line connecting the departure and
              destination airports. The route points will be shown as markers at the airports'
              locations.
            </p>
          </div>
          <div className="mt-4 ml-4">
            <h4 className="mb-2 text-lg font-semibold">Customizing Route Appearance:</h4>
            <p className="mb-4">
              You can customize the appearance of the route line and points using the color pickers
              in the "Route Plotting" section of the sidebar:
            </p>
            <ul className="mb-4 ml-6 list-disc">
              <li>
                <strong>Line Color:</strong> Use the color picker labeled "Line Color" to select the
                desired color for the route line. The changes will be reflected immediately on the
                map.
              </li>
              <li>
                <strong>Route Points Color:</strong> Use the color picker labeled "Route Points
                Color" to select the desired color for the route points (markers) at the airports.
                The changes will be reflected immediately on the map.
              </li>
            </ul>
          </div>
          <div className="mt-4 ml-4">
            <h4 className="mb-2 text-lg font-semibold">Adding Intermediate Points:</h4>
            <p className="mb-4">
              You can add intermediate points to the route by double-clicking or double-tapping on
              the route line:
            </p>
            <ul className="mb-4 ml-6 list-disc">
              <li>
                <strong>Double-click (Desktop):</strong> Double-click on the route line at the
                desired location to add an intermediate point. The point will be added, and the
                route line will be adjusted accordingly.
              </li>
              {/* <li>
                <strong>Double-tap (Mobile):</strong> Double-tap on the route line at the desired
                location to add an intermediate point. The point will be added, and the route line
                will be adjusted accordingly.
              </li> */}
            </ul>
            <p>
              The intermediate points allow you to create more complex routes with multiple
              segments. You can add as many intermediate points as needed to define your desired
              route.
            </p>
          </div>
          <div className="mt-4 ml-4">
            <h4 className="mb-2 text-lg font-semibold">Clearing the Route:</h4>
            <p>
              To clear the current route and remove it from the map, click the "Clear Route" button
              in the "Route Plotting" section of the sidebar. This will remove the route line and
              all associated points from the map.
            </p>
          </div>
        </li>
        <li id="airspace-visualization">
          <h3 className="mb-2 text-xl font-bold">3D Airspace Visualization (Experimental)</h3>
          <p className="mb-4">
            The 3D Airspace Visualization feature in VFR 3D allows you to visualize airspace
            structures in a three-dimensional format. Please note that this feature is currently in
            an experimental stage and may have limitations.
          </p>
          <div className="ml-4">
            <h4 className="mb-2 text-lg font-semibold">Enabling 3D Airspace Visualization:</h4>
            <ol className="mb-4 ml-6 list-decimal">
              <li>
                Open the sidebar by clicking the "Sidebar" button in the top-left corner of the
                screen.
              </li>
              <li>Scroll down to the "Experimental Features" section.</li>
              <li>Toggle the "Show 3D Airspace" switch to the "On" position.</li>
            </ol>
            <p className="mb-4">
              When you enable the 3D Airspace Visualization feature, a loading screen will appear,
              and it may take a few moments for the airspace structures to load and render on the
              map.
            </p>
            <p>
              Once the loading is complete, you will see the airspace structures displayed in a
              three-dimensional format, allowing you to visualize the vertical extent and boundaries
              of different airspace classes.
            </p>
          </div>
          <div className="mt-4 ml-4">
            <h4 className="mb-2 text-lg font-semibold">Interacting with 3D Airspace:</h4>
            <p className="mb-4">
              You can interact with the 3D airspace structures using the standard navigation
              controls in the Cesium viewer:
            </p>
            <ul className="mb-4 ml-6 list-disc">
              <li>
                <strong>Pan:</strong> Click and drag the left mouse button to pan the camera and
                explore the airspace from different angles.
              </li>
              <li>
                <strong>Zoom:</strong> Use the mouse wheel to zoom in and out, allowing you to focus
                on specific airspace areas or get a broader overview.
              </li>
              <li>
                <strong>Rotate:</strong> Hold the right mouse button and drag to rotate the camera
                around the current position, providing a 360-degree view of the airspace.
              </li>
              <li>
                <strong>Tilt:</strong> Hold the middle mouse button (or Ctrl + left mouse button)
                and drag vertically to tilt the camera, allowing you to view the airspace from
                different elevations.
              </li>
            </ul>
          </div>
          <div className="p-4 mt-4 ml-4 rounded-md bg-error">
            <h4 className="mb-2 text-lg font-semibold">Important Notes:</h4>
            <ul className="mb-4 ml-6 list-disc">
              <li>
                The 3D Airspace Visualization feature is currently in an experimental stage and may
                have limitations or inconsistencies.
              </li>
              <li>
                The airspace data used for visualization is sourced from a third-party provider and
                may not be up to date or entirely accurate.
              </li>
              <li>
                Loading times for the airspace structures may vary depending on the complexity and
                size of the data.
              </li>
              <li>
                The visualization may not include all airspace classes or types, and some airspace
                boundaries may be simplified or approximated.
              </li>
            </ul>
            <p>
              We are actively working on enhancing the 3D Airspace Visualization feature and
              appreciate your patience and feedback as we continue to improve its functionality and
              reliability.
            </p>
          </div>
        </li>
      </ul>
    </section>
  );
};

export default Features;
