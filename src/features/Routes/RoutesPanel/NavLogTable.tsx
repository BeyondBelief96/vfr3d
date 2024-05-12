import { useSelector } from 'react-redux';
import { InputCell } from '../../../ui/ReusableComponents/Table/InputCell';
import { TableHeaderCell } from '../../../ui/ReusableComponents/Table/TableHeader';
import { AppState } from '../../../redux/store';
import { Airport } from '../../../redux/api/faa/faa.interface';
import { NavLog } from '../../../redux/api/navlog/navlog.interface';
import { TableCell } from '../../../ui/ReusableComponents/Table/TableCell';

function mapAirportToNavLog(airports: Airport[]): NavLog[] {
  const navLogs: NavLog[] = [];

  for (let i = 0; i < airports.length - 1; i++) {
    const leg: NavLog = {
      FROM_FIX: airports[i].ICAO_ID || airports[i].IDENT,
      TO_FIX: airports[i + 1].ICAO_ID || airports[i + 1].IDENT,
      VOR_IDENT: '',
      VOR_COURSE: '',
      VOR_DIST: '',
      WIND_DIR: '',
      WIND_VEL: '',
      CAS: '',
      TAS: '',
      TC: '',
      TH: '',
      MH: '',
      DIST_LEG: '',
      DIST_REM: '',
      GS: '',
      ETE: '',
      ETA: '',
      ATA: '',
      GPH_ACT: '',
      GPH_EST: '',
      GPH_FUEL: '',
      GPH_REM: '',
    };

    navLogs.push(leg);
  }

  return navLogs;
}

export const NavLogTable: React.FC = () => {
  const { routePoints } = useSelector((state: AppState) => state.route);
  const navLogLegs = mapAirportToNavLog(routePoints);

  return (
    <div className="rounded-lg shadow-md ">
      <div className="overflow-y-auto max-h-96">
        <table className="table text-xs" style={{ tableLayout: 'fixed' }}>
          <thead className="sticky top-0 font-semibold text-center text-primary-content bg-primary">
            <tr>
              <TableHeaderCell rowSpan={2} width={120}>
                Legs
              </TableHeaderCell>
              <TableHeaderCell rowSpan={2} width={60}>
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
              <TableHeaderCell colSpan={3} width={180} bar={true}>
                Time Off
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
              <TableHeaderCell width={60}>Act</TableHeaderCell>
              <TableHeaderCell width={60}>Est</TableHeaderCell>
              <TableHeaderCell width={60}>Fuel</TableHeaderCell>
              <TableHeaderCell width={60}>Rem</TableHeaderCell>
            </tr>
          </thead>
          <tbody>
            {navLogLegs.map((leg, index) => (
              <tr key={index}>
                <TableCell width={120}>
                  {leg.FROM_FIX} ➨ {leg.TO_FIX}
                </TableCell>
                <InputCell width={60} />
                <InputCell width={60} />
                <InputCell width={60} />
                <InputCell width={80} />
                <InputCell width={80} />
                <InputCell width={80} />
                <InputCell width={80} />
                <InputCell width={80} />
                <InputCell width={60} />
                <InputCell width={60} />
                <InputCell width={80} />
                <InputCell width={60} />
                <InputCell width={60} />
                <InputCell width={60} />
                <InputCell width={60} />
                <InputCell width={60} />
                <InputCell width={60} />
                <InputCell width={60} />
                <InputCell width={60} />
                <InputCell width={60} />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
