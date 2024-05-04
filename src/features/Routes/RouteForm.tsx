import { Color } from 'cesium';
import { useState } from 'react';
import { HuePicker } from 'react-color';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearRoute,
  setEndPointColor,
  setLineColor,
  setRoute,
} from '../../redux/slices/routeSlice';
import { AppDispatch, RootState } from '../../redux/store';
import { Route } from './Route';
import { useGetAirportByIcaoCodeOrIdentQuery } from '../../redux/api/faa/faaApi';

interface RouteFormProps {}

const RouteForm: React.FC<RouteFormProps> = () => {
  const { lineColor, pointColor: endPointColor } = useSelector((state: RootState) => state.route);
  const dispatch = useDispatch<AppDispatch>();
  const [fromIcaoCode, setFromIcaoCode] = useState('');
  const [toIcaoCode, setToIcaoCode] = useState('');
  const [fromAirportError, setFromAirportError] = useState('');
  const [toAirportError, setToAirportError] = useState('');

  const { data: fromAirportData, isError: isFromAirportError } =
    useGetAirportByIcaoCodeOrIdentQuery(fromIcaoCode, {
      skip: !fromIcaoCode,
    });

  const { data: toAirportData, isError: isToAirportError } = useGetAirportByIcaoCodeOrIdentQuery(
    toIcaoCode,
    {
      skip: !toIcaoCode,
    }
  );

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
    setFromAirportError('');
  };

  const handleToIcaoCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setToIcaoCode(e.target.value);
    setToAirportError('');
  };

  const handleRouteSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (isFromAirportError) {
      setFromAirportError('Invalid ICAO code');
    } else if (isToAirportError) {
      setToAirportError('Invalid ICAO code');
    } else if (fromAirportData && toAirportData) {
      const newRoute: Route = {
        id: Date.now(), // Generate a unique ID for the new route
        fromAirport: fromAirportData,
        toAirport: toAirportData,
      };

      dispatch(setRoute(newRoute));
      setFromIcaoCode('');
      setToIcaoCode('');
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
          className={`w-full input input-bordered ${
            isFromAirportError || fromAirportError ? 'input-error' : ''
          }`}
          onChange={handleFromIcaoCodeChange}
          placeholder="Enter ICAO code"
        />
        {fromAirportError && <p className="mt-1 text-error">{fromAirportError}</p>}
      </div>
      <div className="mb-4">
        <label htmlFor="to-icao-code" className="block mb-2">
          To Airport (ICAO Code)
        </label>
        <input
          id="to-icao-code"
          type="text"
          value={toIcaoCode}
          className={`w-full input input-bordered ${
            isToAirportError || toAirportError ? 'input-error' : ''
          }`}
          onChange={handleToIcaoCodeChange}
          placeholder="Enter ICAO code"
        />
        {toAirportError && <p className="mt-1 text-error">{toAirportError}</p>}
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
