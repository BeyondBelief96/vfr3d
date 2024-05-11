import { useSelector } from 'react-redux';
import { InputCell } from '../../../ui/ReusableComponents/Table/InputCell';
import { TableHeaderCell } from '../../../ui/ReusableComponents/Table/TableHeader';
import { AppState } from '../../../redux/store';
import { Airport } from '../../../redux/api/faa/faa.interface';
import { NavLog } from '../../../redux/api/navlog/navlog.interface';

function mapAirportToNavLog(airport: Airport): NavLog {
  return {
    NAME: airport.ICAO_ID || airport.IDENT,
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
}

export const NavLogTable: React.FC = () => {
  const { routePoints } = useSelector((state: AppState) => state.route);
  const navLogPoints = routePoints.map((airport) => mapAirportToNavLog(airport));

  return (
    <div className="overflow-x-auto rounded-lg shadow-md">
      <div className="overflow-y-auto max-h-96">
        <table className="table w-full text-xs" style={{ tableLayout: 'fixed' }}>
          <thead className="sticky top-0 font-semibold text-center text-primary-content bg-primary">
            <tr>
              <TableHeaderCell rowSpan={2} width={80}>
                Check Points <br /> (Fixes)
              </TableHeaderCell>
              <TableHeaderCell rowSpan={2} width={60}>
                Ident
              </TableHeaderCell>
              <TableHeaderCell rowSpan={2} width={60}>
                Course <br /> (Radio)
              </TableHeaderCell>
              <TableHeaderCell rowSpan={2} width={60}>
                Altitude
              </TableHeaderCell>
              <TableHeaderCell colSpan={3} width={180}>
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
              <TableHeaderCell colSpan={2} width={120}>
                Dist
              </TableHeaderCell>
              <TableHeaderCell rowSpan={2} width={60}>
                GS
              </TableHeaderCell>
              <TableHeaderCell colSpan={3} width={180}>
                Time Off
              </TableHeaderCell>
              <TableHeaderCell colSpan={2} width={120}>
                GPH
              </TableHeaderCell>
              <TableHeaderCell colSpan={2} width={120}>
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
            {navLogPoints.map((navPoint, index) => (
              <tr key={index}>
                <InputCell defaultValue={navPoint.NAME} width={120} />
                <InputCell width={60} />
                <InputCell width={80} />
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
