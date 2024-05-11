import { FormEvent, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import {
  clearRouteString,
  setRouteString,
  clearRoutePoints,
  pushRoutePoint,
  removeRoutePoint,
} from '../../../redux/slices/routeSlice';
import RouteStringBubbles from './RouteStringBubbles';
import { useLazyGetAirportByIcaoCodeOrIdentLazyQuery } from '../../../redux/api/faa/faaApi';

export const RouteStringInput: React.FC = () => {
  const dispatch = useDispatch();
  const { routeString, routePoints } = useSelector((state: RootState) => state.route);
  const formRef = useRef<HTMLFormElement>(null);
  const [fetchAirport] = useLazyGetAirportByIcaoCodeOrIdentLazyQuery();
  const prevRouteStringRef = useRef('');

  useEffect(() => {
    if (routeString !== prevRouteStringRef.current) {
      const currentCodes = routeString.trim().split(' ');
      const prevCodes = prevRouteStringRef.current.trim().split(' ');
      const removedCodes = prevCodes.filter((code) => !currentCodes.includes(code));
      removedCodes.forEach((code) => {
        dispatch(removeRoutePoint(code));
      });
      prevRouteStringRef.current = routeString;
    }
  }, [routeString, dispatch]);

  const handleRouteStringChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newRouteString = e.target.value;
    dispatch(setRouteString(newRouteString));
  };

  const handleRouteStringSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Your logic to handle the submitted route string
  };

  const handleRouteStringClear = () => {
    dispatch(clearRouteString());
    dispatch(clearRoutePoints());
  };

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === ' ') {
      const codes = routeString.trim().split(' ');
      const lastCode = codes[codes.length - 1];
      if (lastCode.length >= 3 && lastCode.length <= 4) {
        const { data: airport } = await fetchAirport(lastCode);
        if (airport) {
          const existingAirport = routePoints.find(
            (point) => point.IDENT === airport.IDENT || point.ICAO_ID === airport.ICAO_ID
          );
          if (!existingAirport) {
            dispatch(pushRoutePoint(airport));
          }
        }
      }
    }
  };

  return (
    <form ref={formRef} onSubmit={handleRouteStringSubmit}>
      <div className="flex mb-4 min-w-80">
        <textarea
          placeholder="Enter route string"
          value={routeString}
          onChange={handleRouteStringChange}
          onKeyDown={handleKeyDown}
          className="w-full h-32 textarea textarea-primary input input-bordered max-h-40"
        />
      </div>
      <div className="flex flex-col space-y-4">
        <RouteStringBubbles routeString={routeString} />
        <div className="flex justify-start mb-4 sm:mb-0">
          <button type="submit" className="mr-2 btn btn-primary">
            Plot Route
          </button>
          <button type="button" className="btn btn-primary" onClick={handleRouteStringClear}>
            Clear Route
          </button>
        </div>
      </div>
    </form>
  );
};
