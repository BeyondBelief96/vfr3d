import { useSelector } from 'react-redux';
import { InputCell } from '../../../ui/ReusableComponents/Table/InputCell';
import { TableHeaderCell } from '../../../ui/ReusableComponents/Table/TableHeader';
import { AppState } from '../../../redux/store';
import { NavigationLeg } from '../../../redux/api/navlog/navlog.interface';
import { TableCell } from '../../../ui/ReusableComponents/Table/TableCell';
import { Waypoint } from 'vfr3d-shared';

function mapWaypointsToNavLegs(waypoints: Waypoint[]): NavigationLeg[] {
  const navLogs: NavigationLeg[] = [];

  for (let i = 0; i < waypoints.length - 1; i++) {
    const leg: NavigationLeg = {
      from_point: waypoints[i],
      to_point: waypoints[i + 1],
      altitude: 1000,
      wind_direction: 90,
      wind_velocity: 12,
      temp_c: 15,
      calibrated_air_speed: 108,
      true_air_speed: 110,
      true_course: 230,
      true_heading: 225,
      magnetic_heading: 227,
      leg_distance: 48,
      distance_remaining: 120,
      ground_speed: 100,
      estimated_time_enroute: new Date(),
      estimated_time_arrival: new Date(),
      actual_time_arrival: new Date(),
      gallons_per_hour_act: 0,
      gallons_per_hour_est: 10,
      fuel_burned: 6,
      fuel_remaining: 28,
    };

    navLogs.push(leg);
  }

  return navLogs;
}

export const NavLogTable: React.FC = () => {
  const routePoints = useSelector((state: AppState) => state.route.route?.routePoints);
  const navLegPoints = mapWaypointsToNavLegs(routePoints);

  return (
    <div className="rounded-lg shadow-md ">
      <div className="overflow-y-auto max-h-48 md:max-h-80">
        <table className="table text-xs" style={{ tableLayout: 'fixed' }}>
          <thead className="sticky top-0 font-semibold text-center text-primary-content bg-primary">
            <tr>
              <TableHeaderCell rowSpan={2} width={120}>
                Legs
              </TableHeaderCell>
              <TableHeaderCell rowSpan={2} width={70}>
                Altitude
              </TableHeaderCell>
              <TableHeaderCell colSpan={3} width={180} bar={true}>
                Wind
              </TableHeaderCell>
              <TableHeaderCell rowSpan={2} width={60}>
                CAS
              </TableHeaderCell>
              <TableHeaderCell rowSpan={2} width={60}>
                TAS
              </TableHeaderCell>
              <TableHeaderCell rowSpan={2} width={60}>
                TC
              </TableHeaderCell>
              <TableHeaderCell rowSpan={2} width={60}>
                TH <br /> -L/+R <br /> WCA <br />
              </TableHeaderCell>
              <TableHeaderCell rowSpan={2} width={60}>
                MH <br /> -E/+W <br />
              </TableHeaderCell>
              <TableHeaderCell rowSpan={2} width={60}>
                CH <br /> MH ± Dev <br />
              </TableHeaderCell>
              <TableHeaderCell colSpan={2} width={120} bar={true}>
                Dist
              </TableHeaderCell>
              <TableHeaderCell rowSpan={2} width={60}>
                GS
              </TableHeaderCell>
              <TableHeaderCell colSpan={3} width={300} bar={true}>
                Leg Times
              </TableHeaderCell>
              <TableHeaderCell colSpan={2} width={120} bar={true}>
                GPH
              </TableHeaderCell>
              <TableHeaderCell colSpan={2} width={120} bar={true}>
                Fuel
              </TableHeaderCell>
            </tr>
            <tr>
              <TableHeaderCell width={60}>Dir</TableHeaderCell>
              <TableHeaderCell width={60}>Vel</TableHeaderCell>
              <TableHeaderCell width={60}>Temp</TableHeaderCell>
              <TableHeaderCell width={60}>Leg</TableHeaderCell>
              <TableHeaderCell width={60}>Rem</TableHeaderCell>
              <TableHeaderCell width={60}>ETE</TableHeaderCell>
              <TableHeaderCell width={60}>ETA</TableHeaderCell>
              <TableHeaderCell width={60}>ATA</TableHeaderCell>
              <TableHeaderCell width={60}>Est</TableHeaderCell>
              <TableHeaderCell width={60}>Act</TableHeaderCell>
              <TableHeaderCell width={60}>Fuel</TableHeaderCell>
              <TableHeaderCell width={60}>Rem</TableHeaderCell>
            </tr>
          </thead>
          <tbody>
            {navLegPoints.map((leg, index) => (
              <tr key={index}>
                <TableCell>
                  {leg.from_point.name} ➨ {leg.to_point.name}
                </TableCell>
                <InputCell defaultValue={leg.altitude.toString()} />
                <InputCell defaultValue={leg.wind_direction.toString()} />
                <InputCell defaultValue={leg.wind_velocity.toString()} />
                <InputCell defaultValue={leg.temp_c.toString()} />
                <InputCell defaultValue={leg.calibrated_air_speed.toString()} />
                <InputCell defaultValue={leg.true_air_speed.toString()} />
                <InputCell defaultValue={leg.true_course.toString()} />
                <InputCell defaultValue={leg.true_heading.toString()} />
                <InputCell defaultValue={leg.magnetic_heading.toString()} />
                <InputCell defaultValue={leg.magnetic_heading.toString()} />
                <InputCell defaultValue={leg.leg_distance.toString()} />
                <InputCell defaultValue={leg.distance_remaining?.toString()} />
                <InputCell defaultValue={leg.ground_speed.toString()} />
                <InputCell defaultValue={leg.estimated_time_enroute.toString()} />
                <InputCell defaultValue={leg.estimated_time_arrival.toString()} />
                <InputCell defaultValue={leg.actual_time_arrival.toString()} />
                <InputCell defaultValue={leg.gallons_per_hour_est.toString()} />
                <InputCell defaultValue={leg.gallons_per_hour_act.toString()} />
                <InputCell defaultValue={leg.fuel_burned.toString()} />
                <InputCell defaultValue={leg.fuel_remaining.toString()} />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
