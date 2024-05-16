// RoutePointsStep.tsx
import React from 'react';
import { useSelector } from 'react-redux';
import { AppState } from '../../../redux/store';

export const RoutePointsStep: React.FC = () => {
  const { routePoints } = useSelector((state: AppState) => state.route.route);

  return (
    <div className="flex flex-col w-full max-w-4xl md:flex-row">
      <div className="md:w-1/2 md:pr-8">
        <h4 className="mb-2 text-lg font-bold">How to Add Custom Waypoints:</h4>
        <ol className="list-decimal list-inside">
          <li className="text-lg font-bold">
            NOTE: Your camera must be oriented completely vertical (looking straight down at the
            map.)
          </li>
          <li>
            Click on the route line between two existing waypoints where you want to add a custom
            waypoint.
          </li>
          <li>A context menu will appear at the clicked location.</li>
          <li>Enter a name for the custom waypoint in the input field provided.</li>
          <li>Click the "Add Waypoint" button to add the custom waypoint to the route.</li>
          <li>
            The custom waypoint will be added to the route at the appropriate location based on the
            clicked position.
          </li>
          <li>
            If you want to cancel adding the custom waypoint, click the "Cancel" button in the
            context menu.
          </li>
        </ol>
        <p className="mt-2 text-sm text-warning">
          You must provide a name for the custom waypoint. If you try to add a waypoint without a
          name, an error message will be displayed.
        </p>
      </div>
      <div className="mt-4 md:w-1/2 md:mt-0">
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Name</th>
                <th>Latitude</th>
                <th>Longitude</th>
              </tr>
            </thead>
            <tbody>
              {routePoints.map((point) => (
                <tr key={point.id}>
                  <td>{point.name}</td>
                  <td>{point.latitude.toFixed(6)}</td>
                  <td>{point.longitude.toFixed(6)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
