import { Color } from 'cesium';
import { useState } from 'react';
import { HuePicker } from 'react-color';
import { useDispatch, useSelector } from 'react-redux';
import { getAirportByIcaoCode } from '../../api/faa-airports';
import {
  clearRoute,
  setEndPointColor,
  setLineColor,
  setRoute,
} from '../../redux/slices/routeSlice';
import { AppDispatch, RootState } from '../../redux/store';
import { Route } from './Route';

interface RouteFormProps {}

const RouteForm: React.FC<RouteFormProps> = () => {
  const { lineColor, endPointColor } = useSelector((state: RootState) => state.route);
  const dispatch = useDispatch<AppDispatch>();
  const [fromIcaoCode, setFromIcaoCode] = useState('');
  const [toIcaoCode, setToIcaoCode] = useState('');
  const [fromAirportError, setFromAirportError] = useState(false);
  const [toAirportError, setToAirportError] = useState(false);

  const handleLineColorChange = (color: Color) => {
    const colorString = `rgba(${color.red * 255}, ${color.green * 255}, ${color.blue * 255}, ${color.alpha})`;
    dispatch(setLineColor(colorString));
  };

  const handleEndPointColorChange = (color: Color) => {
    const colorString = `rgba(${color.red * 255}, ${color.green * 255}, ${color.blue * 255}, ${color.alpha})`;
    dispatch(setEndPointColor(colorString));
  };

  const handleFromIcaoCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFromIcaoCode(e.target.value);
    setFromAirportError(false);
  };

  const handleToIcaoCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setToIcaoCode(e.target.value);
    setToAirportError(false);
  };

  const handleRouteSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const fromAirportData = await getAirportByIcaoCode(fromIcaoCode);
      const toAirportData = await getAirportByIcaoCode(toIcaoCode);

      if (!fromAirportData) {
        setFromAirportError(true);
      } else if (!toAirportData) {
        setToAirportError(true);
      } else {
        const newRoute: Route = {
          id: Date.now(), // Generate a unique ID for the new route
          fromAirport: fromAirportData,
          toAirport: toAirportData,
        };

        dispatch(setRoute(newRoute));
        setFromIcaoCode('');
        setToIcaoCode('');
      }
    } catch (error) {
      console.error('Error fetching airport data:', error);
    }
  };

  const handleClearRoute = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(clearRoute());
  };

  return (
    <form className="mt-6">
      <h2 className="mb-4 text-lg font-semibold">Route Plotting</h2>
      <div className="mb-4">
        <label htmlFor="from-icao-code" className="block mb-2">
          From Airport (ICAO Code)
        </label>
        <input
          id="from-icao-code"
          type="text"
          value={fromIcaoCode}
          className={`w-full input input-bordered`}
          onChange={handleFromIcaoCodeChange}
          placeholder="Enter ICAO code"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="to-icao-code" className="block mb-2">
          To Airport (ICAO Code)
        </label>
        <input
          id="to-icao-code"
          type="text"
          value={toIcaoCode}
          className={`w-full input input-bordered`}
          onChange={handleToIcaoCodeChange}
          placeholder="Enter ICAO code"
        />
      </div>
      <div className="flex space-x-4">
        <button onClick={handleRouteSubmit} type="submit" className="btn btn-primary">
          Plot Route
        </button>
        <button onClick={handleClearRoute} type="submit" className="btn btn-primary">
          Clear Route
        </button>
      </div>
      <div className="mt-4 mr-4">
        <label htmlFor="line-color" className="block mb-2">
          Line Color
        </label>
        {/* Add a color picker or input field */}
        <HuePicker
          color={lineColor}
          onChange={(color) => handleLineColorChange(Color.fromCssColorString(color.hex))}
        />
      </div>

      <div className="mr-4">
        <label htmlFor="end-point-color" className="block mb-2">
          Route Points Color
        </label>
        {/* Add a color picker or input field */}
        <HuePicker
          width="10"
          color={endPointColor}
          onChangeComplete={(color) =>
            handleEndPointColorChange(Color.fromCssColorString(color.hex))
          }
        />
      </div>
    </form>
  );
};

export default RouteForm;
