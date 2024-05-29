import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../../redux/store';
import {
  setPlannedCruisingAltitude,
  setTimeOfDepartureUtc,
} from '../../../redux/slices/navlogSlice';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';

export const NavlogControls: React.FC = () => {
  const dispatch = useDispatch();
  const { plannedCruisingAltitude, timeOfDepartureUtc } = useSelector(
    (state: AppState) => state.navlog
  );

  const handlePlannedCruisingAltitudeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const altitude = Number(e.target.value);
    dispatch(setPlannedCruisingAltitude(altitude));
  };

  const handleDateChange = (date: Date | null) => {
    if (date) {
      dispatch(setTimeOfDepartureUtc(date));
    }
  };
  return (
    <div className="flex flex-col items-center space-y-4 md:flex-row md:space-x-4 md:space-y-0">
      <div className="flex flex-col gap-2">
        <label htmlFor="plannedCruisingAltitude" className="text-sm">
          Planned Cruise Alt:
        </label>
        <input
          type="text"
          id="plannedCruisingAltitude"
          value={plannedCruisingAltitude}
          onChange={handlePlannedCruisingAltitudeChange}
          className={`p-2 mb-2 border rounded w-28 border-base-content`}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="timeOfDepartureUtc" className="text-sm">
          Time of Departure:
        </label>
        <DatePicker
          id="timeOfDepartureUtc"
          selected={timeOfDepartureUtc ? new Date(timeOfDepartureUtc) : null}
          onChange={handleDateChange}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={15}
          dateFormat="MMMM d, h:mm aa"
          className={`w-40 p-2 mb-2 border rounded border-base-content`}
        />
      </div>
    </div>
  );
};
