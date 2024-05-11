import React from 'react';
import { useSelector } from 'react-redux';
import { AppState } from '../../../redux/store';

export const RoutesTable: React.FC = () => {
  const { routePoints } = useSelector((state: AppState) => state.route);

  return (
    <div className="overflow-x-auto rounded-lg shadow-md">
      <div className="overflow-y-auto max-h-96">
        <table className="table w-full table-auto">
          <thead className="sticky top-0 text-sm font-semibold text-center text-primary-content bg-primary">
            <tr>
              <th>#</th>
              <th className="">Airport Code</th>
              <th>Name</th>
              <th>City</th>
              <th>State</th>
              <th>Country</th>
              <th>Latitude</th>
              <th>Longitude</th>
              <th>Elevation</th>
              <th>ICAO ID</th>
              <th>FAA Identifier</th>
              <th>Type Code</th>
              <th>Operational Status</th>
            </tr>
          </thead>
          <tbody>
            {routePoints.map((airport, index) => (
              <tr
                key={airport.OBJECTID}
                className="transition-colors duration-200 odd:bg-base-100 even:bg-base-200 hover:bg-secondary-content hover:text-primary-content"
              >
                <td className="px-4 py-2 text-center border-r border-base-300">{index + 1}</td>
                <td className="px-4 py-2 text-center border-r border-base-300">{airport.IDENT}</td>
                <td className="px-4 py-2 text-center border-r border-base-300">{airport.NAME}</td>
                <td className="px-4 py-2 text-center border-r border-base-300">
                  {airport.SERVCITY}
                </td>
                <td className="px-4 py-2 text-center border-r border-base-300">{airport.STATE}</td>
                <td className="px-4 py-2 text-center border-r border-base-300">
                  {airport.COUNTRY}
                </td>
                <td className="px-4 py-2 text-center border-r border-base-300">
                  {airport.LATITUDE}
                </td>
                <td className="px-4 py-2 text-center border-r border-base-300">
                  {airport.LONGITUDE}
                </td>
                <td className="px-4 py-2 text-center border-r border-base-300">
                  {airport.ELEVATION}
                </td>
                <td className="px-4 py-2 text-center border-r border-base-300">
                  {airport.ICAO_ID}
                </td>
                <td className="px-4 py-2 text-center border-r border-base-300">{airport.IDENT}</td>
                <td className="px-4 py-2 text-center border-r border-base-300">
                  {airport.TYPE_CODE}
                </td>
                <td className="px-4 py-2 text-center border-r border-base-300">
                  {airport.OPERSTATUS}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
