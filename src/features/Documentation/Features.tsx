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
        <li id="vfr-navigation-log">
          <h3 className="mb-2 text-xl font-bold">VFR Navigation Log</h3>
          <p className="mb-4">
            The VFR Navigation Log feature in VFR 3D allows you to create a detailed flight plan and
            generate a navigation log for your route. You can enter your route, add custom
            waypoints, configure aircraft performance settings, and specify altitude and departure
            time to generate a comprehensive navigation log.
          </p>
          <div className="ml-4">
            <h4 className="mb-2 text-lg font-semibold">Creating a Navigation Log:</h4>
            <ol className="mb-4 ml-6 list-decimal">
              <li>
                Open the Route Planner by clicking the "Open Route Planner" button in the sidebar.
              </li>
              <li>
                In the "Route" step, enter your route using the route string input. You can enter
                airport codes separated by spaces (e.g., KJFK KLAX KSFO). The route will be
                displayed on the map.
              </li>
              <li>
                In the "Add Waypoints" step, you can add custom waypoints to your route by clicking
                on the route line between existing waypoints. A context menu will appear, allowing
                you to enter a name for the custom waypoint. Click "Add Waypoint" to add it to the
                route.
              </li>
              <li>
                In the "Performance" step, fill out the aircraft performance information, such as
                climb true airspeed, climb fuel burn, cruise true airspeed, and more. This
                information will be used to calculate the navigation log.
              </li>
              <li>
                In the "Altitude & Time" step, select your planned cruising altitude and the time of
                departure for your flight.
              </li>
              <li>
                Click the "Calculate Nav Log" button to generate the navigation log based on your
                route, custom waypoints, aircraft performance, and flight details.
              </li>
            </ol>
          </div>
          <div className="mt-4 ml-4">
            <h4 className="mb-2 text-lg font-semibold">Navigation Log Table:</h4>
            <p className="mb-4">
              Once the navigation log is generated, it will be displayed in a table format. The
              table includes the following information for each leg of your route:
            </p>
            <ul className="mb-4 ml-6 list-disc">
              <li>Leg start and end points</li>
              <li>Leg distance and remaining distance</li>
              <li>True course, magnetic course, and magnetic heading</li>
              <li>Ground speed</li>
              <li>Wind direction, wind speed, and temperature</li>
              <li>Leg start and end times</li>
              <li>Estimated fuel burn and remaining fuel</li>
            </ul>
            <p>
              The navigation log table provides a detailed breakdown of your flight, allowing you to
              plan and execute your VFR flight with precision.
            </p>
          </div>
          <div className="mt-4 ml-4">
            <h4 className="mb-2 text-lg font-semibold">Exporting the Navigation Log:</h4>
            <p>
              After generating the navigation log, you can export it as a PDF document by clicking
              the "Download PDF" button. The PDF will include all the relevant information from the
              navigation log table, making it easy to print or share with others.
            </p>
          </div>
        </li>
      </ul>
    </section>
  );
};

export default Features;
