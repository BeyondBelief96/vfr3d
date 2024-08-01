import { useDispatch, useSelector } from 'react-redux';
import RouteStringBubbles from './RouteStringBubbles';
import { AppState } from '../../../redux/store';
import { useRef, useState } from 'react';
import {
  clearRoutePoints,
  clearRouteString,
  setRoutePoints,
  setRouteString,
} from '../../../redux/slices/routeSlice';
import { mapAirportToRoutePoint } from '../../../utility/utils';
import { setSelectedState, setShowAirports } from '../../../redux/slices/airportsSlice';
import { RoutePoint } from '../route.types';
import { useLazyGetAirportByIcaoCodeOrIdentQuery } from '../../../redux/api/vfr3d/airportsSlice';
import { AirportDTO } from 'vfr3d-shared';
export const RouteStringInput: React.FC = () => {
  const dispatch = useDispatch();
  const { routeString } = useSelector((state: AppState) => state.route);
  const formRef = useRef<HTMLFormElement>(null);
  const [fetchAirport] = useLazyGetAirportByIcaoCodeOrIdentQuery();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isLastCodeValid, setIsLastCodeValid] = useState(true);

  const handleRouteStringChange = async (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newRouteString = e.target.value.toUpperCase();
    const trimmedNewRouteString = newRouteString.trim();
    const codes = trimmedNewRouteString.split(' ');
    const lastCode = codes[codes.length - 1];

    if (lastCode.length < 3 || isValidLength(lastCode)) {
      dispatch(setRouteString(newRouteString));
    }
  };

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const textarea = e.currentTarget;
    const selectionStart = textarea.selectionStart;
    const selectionEnd = textarea.selectionEnd;
    const routeStringLength = routeString.length;

    // Prevent cursor movement using arrow keys
    if (
      e.key === 'ArrowLeft' ||
      e.key === 'ArrowRight' ||
      e.key === 'ArrowUp' ||
      e.key === 'ArrowDown'
    ) {
      e.preventDefault();
      textarea.setSelectionRange(routeStringLength, routeStringLength);
    }

    // Prevent deletion of characters in route string except for the end. Moves
    // cursor to end of route string if deletion is attempted anywhere else.
    if (
      (e.key === 'Backspace' || e.key === 'Delete') &&
      (selectionStart !== routeStringLength || selectionEnd !== routeStringLength)
    ) {
      e.preventDefault();
      textarea.setSelectionRange(routeStringLength, routeStringLength);
    }

    // Handle duplicate codes when the space key is pressed
    if (e.key === ' ') {
      const codes = routeString.trim().split(' ');
      const lastCode = codes[codes.length - 1];
      // Prevent space if the last code has less than 3 characters
      if (lastCode.length < 3) {
        e.preventDefault();
        return;
      }

      // Makes the airports show up for the state their first airport code is in.
      if (codes.length === 1) {
        const airport = await fetchAirportByCode(codes[0]);
        if (airport) {
          dispatch(setSelectedState(airport.stateCode));
          dispatch(setShowAirports(true));
        }
      }

      const uniqueCodes = Array.from(new Set(codes));
      const newRouteString = uniqueCodes.join(' ');

      if (newRouteString !== routeString) {
        e.preventDefault();
        dispatch(setRouteString(newRouteString));
      }

      const updatedRoutePoints: RoutePoint[] = [];
      let isValid = true;
      for (const code of uniqueCodes) {
        if (isValidLength(code)) {
          const airport = await fetchAirportByCode(code);
          if (airport) {
            updatedRoutePoints.push(mapAirportToRoutePoint(airport));
          } else {
            isValid = false;
            break;
          }
        }
      }

      setIsLastCodeValid(isValid);
      if (!isValid) {
        e.preventDefault();
        return;
      }

      dispatch(setRoutePoints(updatedRoutePoints));
    }

    // Allow typing if the textarea is empty or if the user is deleting or correcting an invalid code
    if (routeString.trim() === '' || !isLastCodeValid) {
      if (!isLastCodeValid && e.key !== 'Backspace' && e.key !== 'Delete') {
        e.preventDefault();
      } else {
        setIsLastCodeValid(true);
      }
    }
  };

  const handleRouteStringClear = () => {
    dispatch(clearRouteString());
    dispatch(clearRoutePoints());
  };

  const isValidLength = (code: string) => {
    return code.length >= 3 && code.length <= 4;
  };

  const fetchAirportByCode = async (code: string): Promise<AirportDTO | undefined> => {
    try {
      const { data: airport } = await fetchAirport(code);
      return airport;
    } catch (error) {
      console.error('Error fetching airport:', error);
      return undefined;
    }
  };

  return (
    <form ref={formRef}>
      <RouteStringBubbles />
      <div className="flex mt-2 mb-4 w-95 sm:w-96 min-w-80">
        <textarea
          ref={textareaRef}
          placeholder="Enter route string (e.g. KJWN KBWG KCLT)"
          value={routeString}
          onChange={handleRouteStringChange}
          onKeyDown={handleKeyDown}
          className="w-full border-4 rounded-lg h-28 textarea textarea-primary text-primary-content input input-bordered max-h-40"
        />
      </div>
      <div className="flex justify-start gap-2 mb-4 sm:mb-0">
        {routeString !== '' ? (
          <button type="button" className="btn btn-error" onClick={handleRouteStringClear}>
            Clear Route
          </button>
        ) : (
          <></>
        )}
      </div>
    </form>
  );
};
