import { useDispatch, useSelector } from 'react-redux';
import { Airport } from '../../../redux/api/faa/faa.interface';
import RouteStringBubbles from './RouteStringBubbles';
import { AppState } from '../../../redux/store';
import { FormEvent, useRef, useState } from 'react';
import { useLazyGetAirportByIcaoCodeOrIdentLazyQuery } from '../../../redux/api/faa/faaApi';
import {
  clearRoutePoints,
  clearRouteString,
  setRoutePoints,
  setRouteString,
} from '../../../redux/slices/routeSlice';

export const RouteStringInput: React.FC = () => {
  const dispatch = useDispatch();
  const { routeString } = useSelector((state: AppState) => state.route);
  const formRef = useRef<HTMLFormElement>(null);
  const [fetchAirport] = useLazyGetAirportByIcaoCodeOrIdentLazyQuery();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isLastCodeValid, setIsLastCodeValid] = useState<boolean | null>(null);

  const handleRouteStringChange = async (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newRouteString = e.target.value;
    const trimmedNewRouteString = newRouteString.trim();
    const codes = trimmedNewRouteString.split(' ');
    const lastCode = codes[codes.length - 1];

    if (lastCode.length < 3 || isValidCode(lastCode)) {
      dispatch(setRouteString(newRouteString));

      const updatedRoutePoints: Airport[] = [];
      const seenCodes = new Set<string>();

      for (const code of codes) {
        if (isValidCode(code)) {
          if (!seenCodes.has(code)) {
            seenCodes.add(code);
            const airport = await fetchAirportByCode(code);
            if (airport) {
              updatedRoutePoints.push(airport);
            }
          }
        }
      }

      dispatch(setRoutePoints(updatedRoutePoints));
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

      const uniqueCodes = Array.from(new Set(codes));
      const newRouteString = uniqueCodes.join(' ');

      if (newRouteString !== routeString) {
        e.preventDefault();
        dispatch(setRouteString(newRouteString));

        const updatedRoutePoints: Airport[] = [];
        for (const code of uniqueCodes) {
          if (isValidCode(code)) {
            const airport = await fetchAirportByCode(code);
            if (airport) {
              updatedRoutePoints.push(airport);
            }
          }
        }

        dispatch(setRoutePoints(updatedRoutePoints));
      }
    }

    // Prevent typing if the last code is invalid, except for backspace and delete
    if (!isLastCodeValid && e.key !== 'Backspace' && e.key !== 'Delete') {
      e.preventDefault();
      setIsLastCodeValid(true);
    }
  };

  const handleRouteStringSubmit = (
    e: FormEvent<HTMLFormElement> | FormEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    // Your logic to handle the submitted route string
  };

  const handleRouteStringClear = () => {
    dispatch(clearRouteString());
    dispatch(clearRoutePoints());
    setIsLastCodeValid(null);
  };

  const isValidCode = (code: string) => {
    return code.length >= 3 && code.length <= 4;
  };

  const fetchAirportByCode = async (code: string): Promise<Airport | undefined> => {
    try {
      const { data: airport } = await fetchAirport(code);
      return airport;
    } catch (error) {
      console.error('Error fetching airport:', error);
      return undefined;
    }
  };

  return (
    <form ref={formRef} onSubmit={handleRouteStringSubmit}>
      <div className="flex mb-4 min-w-80">
        <textarea
          ref={textareaRef}
          placeholder="Enter route string (e.g. KJWN KBWG KCLT)"
          value={routeString}
          onChange={handleRouteStringChange}
          onKeyDown={handleKeyDown}
          className="w-full border-4 rounded-lg h-28 textarea textarea-primary input input-bordered max-h-40"
        />
      </div>
      <div className="flex flex-col space-y-4">
        <RouteStringBubbles />
        <div className="flex justify-start gap-2 mb-4 sm:mb-0">
          <button type="button" className="btn btn-primary" onClick={handleRouteStringClear}>
            Clear Route
          </button>
          <button type="submit" className="btn btn-primary" onSubmit={handleRouteStringSubmit}>
            Generate Nav Log
          </button>
        </div>
      </div>
    </form>
  );
};
