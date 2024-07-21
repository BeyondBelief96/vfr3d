import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { AppState } from '../../../redux/store';
import { useCalcBearingAndDistanceMutation } from '../../../redux/api/vfr3d/navlog.api';
import { Waypoint, BearingAndDistanceResponseDto } from 'vfr3d-shared';

export const RoutePointsStep: React.FC = () => {
  const { routePoints } = useSelector((state: AppState) => state.route.route);
  const [calcBearingAndDistance] = useCalcBearingAndDistanceMutation();
  const [legData, setLegData] = useState<{ [key: string]: BearingAndDistanceResponseDto }>({});

  useEffect(() => {
    const fetchBearingAndDistance = async (
      startPoint: Waypoint,
      endPoint: Waypoint
    ): Promise<BearingAndDistanceResponseDto> => {
      const response = await calcBearingAndDistance({
        startPoint: startPoint,
        endPoint: endPoint,
      }).unwrap();
      return response;
    };

    const calculateLegs = async () => {
      const data: { [key: string]: BearingAndDistanceResponseDto } = {};
      for (let i = 0; i < routePoints.length - 1; i++) {
        const startPoint = routePoints[i];
        const endPoint = routePoints[i + 1];
        const legKey = `${startPoint.id}~${endPoint.id}`;
        const legResult = await fetchBearingAndDistance(startPoint, endPoint);
        data[legKey] = legResult;
      }
      setLegData(data);
    };

    calculateLegs();
  }, [routePoints, calcBearingAndDistance]);

  return (
    <div className="flex items-center w-full">
      <div className="mt-4">
        <div className="mt-4 overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Leg</th>
                <th>Bearing</th>
                <th>Range (nm)</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(legData).map(([legKey, legResult], index) => {
                const [startPointId, endPointId] = legKey.split('~');
                const startPoint = routePoints.find((point) => point.id === startPointId);
                const endPoint = routePoints.find((point) => point.id === endPointId);
                return (
                  <tr key={index}>
                    <td>{`${startPoint?.name} ➨ ${endPoint?.name}`}</td>
                    <td className="text-center">{legResult?.trueCourse.toFixed(0)}°</td>
                    <td className="text-center">{legResult?.distance.toFixed(1)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
