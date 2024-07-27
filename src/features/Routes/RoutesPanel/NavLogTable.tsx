import React from 'react';
import { useSelector } from 'react-redux';
import { AppState } from '../../../redux/store';
import { useMediaQuery } from 'react-responsive';

export const NavLogTable: React.FC = () => {
  const navlog = useSelector((state: AppState) => state.navlog.navlog);
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleTimeString();
  };

  const formatTotalRouteTime = (timeInHours: number): string => {
    if (timeInHours < 1) {
      const minutes = Math.round(timeInHours * 60);
      return `${minutes} min`;
    } else {
      const hours = Math.floor(timeInHours);
      const minutes = Math.round((timeInHours - hours) * 60);
      return `${hours} hr ${minutes} min`;
    }
  };

  const formatData = (data: number | undefined): string => {
    return data ? data.toFixed(0) : '---';
  };

  const formatWind = () => {
    const headwindComponent = navlog.averageWindComponent;
    if (headwindComponent < 0)
      return `Average Tailwind: ${Math.abs(navlog.averageWindComponent).toFixed(1)} knots`;
    else return `Average Headwind: ${navlog.averageWindComponent.toFixed(1)} knots`;
  };

  return (
    <div className="max-w-full">
      {isMobile ? (
        <div className="rounded-lg shadow-md">
          {navlog.legs.map((leg, index) => (
            <div key={index} className="p-4 border-b border-primary-content last:border-none">
              <h3 className="text-lg font-semibold">
                {leg.legStartPoint?.name} ➨ {leg.legEndPoint?.name}
              </h3>
              <div className="grid grid-cols-2 gap-4 mt-2">
                <div>
                  <p>Distance: {leg.legDistance.toFixed(1)} nm</p>
                  <p>Remaining: {leg.distanceRemaining.toFixed(1)} nm</p>
                  <p>TC: {leg?.trueCourse.toFixed(0)}</p>
                  <p>MC: {leg?.magneticCourse.toFixed(0)}</p>
                  <p>MH: {leg?.magneticHeading.toFixed(0)}</p>
                  <p>GS: {leg?.groundSpeed.toFixed(0)} knots</p>
                  <p>Wind Dir: {formatData(leg.windDir)}</p>
                  <p>Wind Speed: {formatData(leg.windSpeed)} kts</p>
                </div>
                <div>
                  <p>Temp (C): {formatData(leg?.tempC)}</p>
                  <p>Start: {formatDate(leg?.startLegTime.toString())}</p>
                  <p>End: {formatDate(leg?.endLegTime.toString())}</p>
                  <p>Burn: {leg?.legFuelBurnGals.toFixed(1)} gals</p>
                  <p>Remaining: {leg?.remainingFuelGals.toFixed(1)} gals</p>
                </div>
              </div>
            </div>
          ))}
          <div className="mt-4">
            <p>Total Route Time: {formatTotalRouteTime(navlog.totalRouteTimeHours)}</p>
            <p>Total Distance: {navlog.totalRouteDistance.toFixed(1)} nm</p>
            <p>Total Fuel Used: {navlog.totalFuelUsed.toFixed(1)} gals</p>
            <p>{formatWind()}</p>
          </div>
        </div>
      ) : (
        <div className="overflow-auto rounded-lg shadow-md">
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-center ">
              <thead className="sticky font-semibold text-primary-content bg-primary">
                <tr>
                  <th className="px-2 py-1">Checkpoints</th>
                  <th className="px-2 py-1">Distance (nm)</th>
                  <th className="px-2 py-1">Remaining (nm)</th>
                  <th className="px-2 py-1 ">TC</th>
                  <th className="px-2 py-1">MC</th>
                  <th className="px-2 py-1 ">MH</th>
                  <th className="px-2 py-1 ">GS (knots)</th>
                  <th className="px-2 py-1 ">WD</th>
                  <th className="px-2 py-1 ">WS</th>
                  <th className="px-2 py-1 ">Temp</th>
                  <th className="py-1 border-l border-primary-content ">
                    <div className="flex justify-around">
                      <span>Start</span>
                      <span>End</span>
                    </div>
                    Leg Times
                  </th>
                  <th className="py-1 border-l border-base-content min-w-[100px]">
                    <div className="flex justify-around">
                      <span>Burn</span>
                      <span>Rem</span>
                    </div>
                    gals
                  </th>
                </tr>
              </thead>
              <tbody>
                {navlog.legs.map((leg, index) => (
                  <tr key={index}>
                    <td className="px-2 py-1 border-b min-w-25">
                      {leg?.legStartPoint?.name} ➨ {leg.legEndPoint?.name}
                    </td>
                    <td className="px-2 py-1 border-b border-l border-r">
                      {leg?.legDistance?.toFixed(1)}
                    </td>
                    <td className="px-2 py-1 border-b border-l border-r">
                      {leg?.distanceRemaining?.toFixed(1)}
                    </td>
                    <td className="px-2 py-1 border-b border-l border-r">
                      {formatData(leg?.trueCourse)}
                    </td>
                    <td className="px-2 py-1 border-b border-l border-r">
                      {formatData(leg?.magneticCourse)}
                    </td>
                    <td className="px-2 py-1 border-b border-l border-r">
                      {formatData(leg?.magneticHeading)}
                    </td>
                    <td className="px-2 py-1 border-b border-l border-r">
                      {formatData(leg?.groundSpeed)}
                    </td>
                    <td className="px-2 py-1 border-b border-l border-r">
                      {formatData(leg?.windDir)}
                    </td>
                    <td className="px-2 py-1 border-b border-l border-r">
                      {formatData(leg?.windSpeed)}
                    </td>
                    <td className="px-2 py-1 border-b border-l border-r">
                      {formatData(leg?.tempC)}
                    </td>
                    <td className="px-2 py-1 border-b border-l min-w-40">
                      <div className="flex justify-around">
                        <span>{formatDate(leg.startLegTime.toString())}</span>
                        <span>{formatDate(leg.endLegTime.toString())}</span>
                      </div>
                    </td>
                    <td className="py-1 border-b border-l min-w-[100px]">
                      <div className="flex justify-around">
                        <span>{leg?.legFuelBurnGals.toFixed(1)}</span>
                        <span>{leg?.remainingFuelGals.toFixed(1)}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-center">
              <td colSpan={1} className="px-2 py-1 text-sm font-semibold">
                Total Route Time: {formatTotalRouteTime(navlog.totalRouteTimeHours)}
              </td>
              <td colSpan={1} className="px-2 py-1 text-sm font-semibold">
                Total Distance: {navlog.totalRouteDistance.toFixed(1)} nm
              </td>
              <td colSpan={1} className="px-2 py-1 text-sm font-semibold">
                Total Fuel Used: {navlog.totalFuelUsed.toFixed(1)} gals
              </td>
              <td colSpan={1} className="px-2 py-1 text-sm font-semibold">
                {formatWind()}
              </td>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
