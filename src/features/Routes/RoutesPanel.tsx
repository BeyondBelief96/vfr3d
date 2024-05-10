import React, { useState } from 'react';

const ROUTE_PLANNER_TEXT = {
  open: 'Open Route Planner',
  close: 'Close Route Planner',
};

export const RoutesPanel: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [routeString, setRouteString] = useState('');

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  const handleContentClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
  };

  const handleRouteStringChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setRouteString(e.target.value);
  };

  const dummyData = [
    { airport: 'KJWN', name: 'John Wayne Airport', city: 'Santa Ana, CA' },
    { airport: 'KBWG', name: 'Brownwood Regional Airport', city: 'Brownwood, TX' },
    { airport: 'KBNA', name: 'Nashville International Airport', city: 'Nashville, TN' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0">
      <div
        className={`bg-base-100 opacity-80 rounded-t-lg cursor-pointer transition-all duration-300 ${
          isExpanded ? 'h-96' : 'h-8'
        }`}
        onClick={toggleExpansion}
      >
        <div className="flex items-center justify-center h-8">
          <span className="text-primary-content">
            {isExpanded ? ROUTE_PLANNER_TEXT['close'] : ROUTE_PLANNER_TEXT['open']}
          </span>
          <span className={`ml-2 transition-transform ${isExpanded ? 'rotate-180' : ''}`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </div>
        {isExpanded && (
          <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4" onClick={handleContentClick}>
            <div>
              <h2 className="text-2xl font-bold mb-4">Route Planner</h2>
              <div className="mb-4">
                <textarea
                  placeholder="Enter route string"
                  value={routeString}
                  onChange={handleRouteStringChange}
                  className="textarea textarea-primary input input-bordered w-96 h-32"
                />
              </div>
              <div className="flex justify-start">
                <button className="btn btn-primary">Clear Route</button>
              </div>
            </div>
            <div className="h-48 overflow-y-auto">
              <table className="table w-full">
                <thead>
                  <tr>
                    <th>Airport Code</th>
                    <th>Name</th>
                    <th>City</th>
                  </tr>
                </thead>
                <tbody>
                  {dummyData.map((airport, index) => (
                    <tr key={index}>
                      <td>{airport.airport}</td>
                      <td>{airport.name}</td>
                      <td>{airport.city}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
