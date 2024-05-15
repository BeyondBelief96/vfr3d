import { useSelector } from 'react-redux';
import { TableHeaderCell } from '../../../ui/ReusableComponents/Table/TableHeader';
import { AppState } from '../../../redux/store';
import { TableCell } from '../../../ui/ReusableComponents/Table/TableCell';

export const NavLogTable: React.FC = () => {
  const navlog = useSelector((state: AppState) => state.navlog.navlog);

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleTimeString();
  };

  return (
    <div className="rounded-lg shadow-md">
      <div className="overflow-y-auto max-h-48 md:max-h-80">
        <table className="table text-xs" style={{ tableLayout: 'fixed' }}>
          <thead className="sticky top-0 font-semibold text-center text-primary-content bg-primary">
            <tr>
              <TableHeaderCell rowSpan={2} width={120}>
                Checkpoints
              </TableHeaderCell>
              <TableHeaderCell rowSpan={2} width={60}>
                Distance
              </TableHeaderCell>
              <TableHeaderCell rowSpan={2} width={60}>
                Remaining
              </TableHeaderCell>
              <TableHeaderCell rowSpan={2} width={60}>
                TC
              </TableHeaderCell>
              <TableHeaderCell rowSpan={2} width={60}>
                MC
              </TableHeaderCell>
              <TableHeaderCell rowSpan={2} width={60}>
                MH
              </TableHeaderCell>
              <TableHeaderCell rowSpan={2} width={60}>
                GS
              </TableHeaderCell>
              <TableHeaderCell colSpan={2} width={120} bar={true}>
                Leg Times
              </TableHeaderCell>
              <TableHeaderCell colSpan={2} width={120} bar={true}>
                Fuel
              </TableHeaderCell>
            </tr>
            <tr>
              <TableHeaderCell width={60}>Start</TableHeaderCell>
              <TableHeaderCell width={60}>End</TableHeaderCell>
              <TableHeaderCell width={60}>Burn</TableHeaderCell>
              <TableHeaderCell width={60}>Remaining</TableHeaderCell>
            </tr>
          </thead>
          <tbody>
            {navlog.legs.map((leg, index) => (
              <tr key={index}>
                <TableCell>
                  {leg.legStartPoint?.name} ➨ {leg.legEndPoint?.name}
                </TableCell>
                <TableCell>{leg.legDistance.toFixed(1)}</TableCell>
                <TableCell>{leg.distanceRemaining.toFixed(1)}</TableCell>
                <TableCell>{leg.trueCourse.toFixed(0)}</TableCell>
                <TableCell>{leg.magneticCourse.toFixed(0)}</TableCell>
                <TableCell>{leg.magneticHeading.toFixed(0)}</TableCell>
                <TableCell>{leg.groundSpeed.toFixed(0)}</TableCell>
                <TableCell>{formatDate(leg.startLegTime.toString())}</TableCell>
                <TableCell>{formatDate(leg.endLegTime.toString())}</TableCell>
                <TableCell>{leg.legFuelBurnGals.toFixed(1)}</TableCell>
                <TableCell>{leg.remainingFuelGals.toFixed(1)}</TableCell>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
