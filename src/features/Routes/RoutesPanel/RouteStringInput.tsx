import { useDispatch, useSelector } from 'react-redux';
import { Airport } from '../../../redux/api/faa/faa.interface';
import RouteStringBubbles from './RouteStringBubbles';
import { RootState } from '../../../redux/store';
import { FormEvent, useEffect, useRef, useState } from 'react';
import { useLazyGetAirportByIcaoCodeOrIdentLazyQuery } from '../../../redux/api/faa/faaApi';
import {
  clearRoutePoints,
  clearRouteString,
  setRoutePoints,
  setRouteString,
} from '../../../redux/slices/routeSlice';

export const RouteStringInput: React.FC = () => {
  const dispatch = useDispatch();
  const { routeString, routePoints } = useSelector((state: RootState) => state.route);
  const formRef = useRef<HTMLFormElement>(null);
  const [fetchAirport] = useLazyGetAirportByIcaoCodeOrIdentLazyQuery();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isLastCodeValid, setIsLastCodeValid] = useState(true);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.setSelectionRange(textarea.value.length, textarea.value.length);
    }
  }, [routeString]);

  const handleRouteStringChange = async (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newRouteString = e.target.value;
    const trimmedNewRouteString = newRouteString.trim();
    const codes = trimmedNewRouteString.split(' ');
    const lastCode = codes[codes.length - 1];

    if (isLastCodeValid && (lastCode.length < 3 || isValidCode(lastCode))) {
      dispatch(setRouteString(newRouteString));

      const updatedRoutePoints: Airport[] = [];
      for (const code of codes) {
        if (isValidCode(code)) {
          const airport = await fetchAirportByCode(code);
          if (airport) {
            updatedRoutePoints.push(airport);
          }
        }
      }

      dispatch(setRoutePoints(updatedRoutePoints));
    }
  };

  const handleRouteStringSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Your logic to handle the submitted route string
  };

  const handleRouteStringClear = () => {
    dispatch(clearRouteString());
    dispatch(clearRoutePoints());
    setIsLastCodeValid(true);
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

    // Allow deletion of characters if the last code is invalid
    if (
      (e.key === 'Backspace' || e.key === 'Delete') &&
      (selectionStart !== routeStringLength || selectionEnd !== routeStringLength) &&
      isLastCodeValid
    ) {
      e.preventDefault();
      textarea.setSelectionRange(routeStringLength, routeStringLength);
    }

    // Validate the last code when the space key is pressed
    if (e.key === ' ') {
      const codes = routeString.trim().split(' ');
      const lastCode = codes[codes.length - 1];

      // Prevent space if the last code has less than 3 characters
      if (lastCode.length < 3) {
        e.preventDefault();
        return;
      }

      const isValid = await validateCode(lastCode);
      setIsLastCodeValid(isValid);
      console.log(`Validating code ${lastCode}: ${isValid}`); // Add this line for logging

      if (!isValid) {
        e.preventDefault();
      }
    }

    // Prevent typing if the last code is invalid
    if (!isLastCodeValid) {
      e.preventDefault();
    }
  };

  const isValidCode = (code: string) => {
    return code.length >= 3 && code.length <= 4;
  };

  const validateCode = async (code: string): Promise<boolean> => {
    try {
      const airport = await fetchAirportByCode(code);
      console.log(`Fetched airport for code ${code}:`, airport);
      return !!airport;
    } catch (error) {
      console.error('Error validating code:', error);
      return false;
    }
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
          placeholder="Enter route string"
          value={routeString}
          onChange={handleRouteStringChange}
          onKeyDown={handleKeyDown}
          className="w-full h-32 textarea textarea-primary input input-bordered max-h-40"
        />
      </div>
      <div className="flex flex-col space-y-4">
        <RouteStringBubbles />
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
