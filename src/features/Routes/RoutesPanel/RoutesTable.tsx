import React from 'react';

const dummyData = [
  {
    OBJECTID: 1,
    GLOBAL_ID: '1234567890',
    IDENT: 'KJWN',
    NAME: 'John Wayne Airport',
    LATITUDE: '33.6774',
    LONGITUDE: '-117.87',
    ELEVATION: 56,
    ICAO_ID: 'KSNA',
    TYPE_CODE: 'AIRPORT',
    SERVCITY: 'Santa Ana',
    STATE: 'CA',
    COUNTRY: 'United States',
    OPERSTATUS: 'Operational',
    PRIVATEUSE: 0,
  },
  {
    OBJECTID: 2,
    GLOBAL_ID: '0987654321',
    IDENT: 'KBWG',
    NAME: 'Brownwood Regional Airport',
    LATITUDE: '31.7963',
    LONGITUDE: '-98.9615',
    ELEVATION: 1352,
    ICAO_ID: 'KBWD',
    TYPE_CODE: 'AIRPORT',
    SERVCITY: 'Brownwood',
    STATE: 'TX',
    COUNTRY: 'United States',
    OPERSTATUS: 'Operational',
    PRIVATEUSE: 0,
  },
  {
    OBJECTID: 3,
    GLOBAL_ID: '5678901234',
    IDENT: 'KBNA',
    NAME: 'Nashville International Airport',
    LATITUDE: '36.1241',
    LONGITUDE: '-86.6782',
    ELEVATION: 599,
    ICAO_ID: 'KBNA',
    TYPE_CODE: 'AIRPORT',
    SERVCITY: 'Nashville',
    STATE: 'TN',
    COUNTRY: 'United States',
    OPERSTATUS: 'Operational',
    PRIVATEUSE: 0,
  },
];

export const RoutesTable: React.FC = () => {
  return (
    <div className="overflow-x-auto rounded-lg shadow-md">
      <table className="table w-full table-auto">
        <thead>
          <tr>
            <th className="bg-info text-base-content font-semibold">#</th>
            <th className="bg-info text-base-content font-semibold">Airport Code</th>
            <th className="bg-info text-base-content font-semibold">Name</th>
            <th className="bg-info text-base-content font-semibold">City</th>
            <th className="bg-info text-base-content font-semibold">State</th>
            <th className="bg-info text-base-content font-semibold">Country</th>
            <th className="bg-info text-base-content font-semibold">Latitude</th>
            <th className="bg-info text-base-content font-semibold">Longitude</th>
            <th className="bg-info text-base-content font-semibold">Elevation</th>
            <th className="bg-info text-base-content font-semibold">ICAO ID</th>
            <th className="bg-info text-base-content font-semibold">Type Code</th>
            <th className="bg-info text-base-content font-semibold">Operational Status</th>
            <th className="bg-info text-base-content font-semibold">Private Use</th>
          </tr>
        </thead>
        <tbody>
          {dummyData.map((airport, index) => (
            <tr
              key={airport.OBJECTID}
              className="odd:bg-base-100 even:bg-base-200 hover:bg-primary hover:text-primary-content transition-colors duration-200"
            >
              <td className="px-4 py-2 border-r border-base-300">{index + 1}</td>
              <td className="px-4 py-2 border-r border-base-300">{airport.IDENT}</td>
              <td className="px-4 py-2 border-r border-base-300">{airport.NAME}</td>
              <td className="px-4 py-2 border-r border-base-300">{airport.SERVCITY}</td>
              <td className="px-4 py-2 border-r border-base-300">{airport.STATE}</td>
              <td className="px-4 py-2 border-r border-base-300">{airport.COUNTRY}</td>
              <td className="px-4 py-2 border-r border-base-300">{airport.LATITUDE}</td>
              <td className="px-4 py-2 border-r border-base-300">{airport.LONGITUDE}</td>
              <td className="px-4 py-2 border-r border-base-300">{airport.ELEVATION}</td>
              <td className="px-4 py-2 border-r border-base-300">{airport.ICAO_ID}</td>
              <td className="px-4 py-2 border-r border-base-300">{airport.TYPE_CODE}</td>
              <td className="px-4 py-2 border-r border-base-300">{airport.OPERSTATUS}</td>
              <td className="px-4 py-2 border-r border-base-300">{airport.PRIVATEUSE}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
