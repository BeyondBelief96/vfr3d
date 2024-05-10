import { useState, FormEvent, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import {
  clearRouteString,
  pushRoutePoint,
  setRouteString,
  clearRoutePoints,
  removeRoutePoint,
} from '../../../redux/slices/routeSlice';
import RouteStringBubbles from './RouteString';
import { useGetAirportByIcaoCodeOrIdentQuery } from '../../../redux/api/faa/faaApi';

export const RouteStringInput: React.FC = () => {
  const dispatch = useDispatch();
  const { routeString, routePoints } = useSelector((state: RootState) => state.route);
  console.log(routePoints);
  const [lastCode, setLastCode] = useState('');
  const formRef = useRef<HTMLFormElement>(null);

  const {
    data: airport,
    isError,
    isSuccess,
    refetch,
  } = useGetAirportByIcaoCodeOrIdentQuery(lastCode, {
    skip: lastCode === '',
  });

  useEffect(() => {
    if (airport && !isError && isSuccess) {
      const existingAirport = routePoints.find(
        (point) => point.IDENT === airport.IDENT || point.ICAO_ID === airport.ICAO_ID
      );
      if (!existingAirport) {
        dispatch(pushRoutePoint(airport));
      }
    }
  }, [airport, isError, isSuccess, dispatch, routePoints]);

  const handleRouteStringChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newRouteString = e.target.value;
    dispatch(setRouteString(newRouteString));

    if (newRouteString.trim() === '') {
      dispatch(clearRoutePoints());
      setLastCode('');
    } else {
      handleCodeDeletion(newRouteString);
    }
  };

  const handleCodeDeletion = (value: string) => {
    const codes = value.trim().split(' ');
    const lastCodeInString = codes[codes.length - 1];

    if (lastCodeInString !== lastCode) {
      const deletedCode = lastCode.slice(0, lastCodeInString.length);
      dispatch(removeRoutePoint(deletedCode));
      setLastCode(lastCodeInString);
    }
  };

  const handleRouteStringClear = () => {
    dispatch(clearRouteString());
    dispatch(clearRoutePoints());
    setLastCode('');
  };

  const handleRouteStringSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Your logic to handle the submitted route string
  };

  const parseLastCodeFromRouteString = (routeString: string) => {
    const codes = routeString.trim().split(' ');
    const lastCode = codes[codes.length - 1];
    return lastCode;
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      formRef.current?.requestSubmit();
    } else if (e.key === ' ') {
      const lastCode = parseLastCodeFromRouteString(routeString);
      if (lastCode && lastCode.length >= 3 && lastCode.length <= 4) {
        const existingAirport = routePoints.find(
          (point) => point.IDENT === lastCode || point.ICAO_ID === lastCode
        );
        if (!existingAirport) {
          setLastCode(lastCode);
          refetch();
        }
      }
    }
  };

  return (
    <form ref={formRef} onSubmit={handleRouteStringSubmit}>
      <div className="mb-4 flex min-w-80">
        <textarea
          placeholder="Enter route string"
          value={routeString}
          onChange={handleRouteStringChange}
          onKeyDown={handleKeyDown}
          className="textarea textarea-primary input input-bordered w-full max-h-40 h-32"
        />
      </div>
      <div className="flex flex-col space-y-4">
        <RouteStringBubbles routePoints={routePoints} routeString={routeString} />
        <div className="flex justify-start mb-4 sm:mb-0">
          <button type="submit" className="btn btn-primary mr-2">
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
