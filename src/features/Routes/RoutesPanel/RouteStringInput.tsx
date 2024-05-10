import { useState, FormEvent, useRef } from 'react';

export const RouteStringInput: React.FC = () => {
  const [routeString, setRouteString] = useState('');
  const formRef = useRef<HTMLFormElement>(null);

  const handleRouteStringChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setRouteString(e.target.value);
  };

  const handleRouteStringClear = () => {
    setRouteString('');
  };

  const handleRouteStringSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('SUBMITTED!', routeString);
    // Add your logic to handle the submitted route string here
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      formRef.current?.requestSubmit();
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
      <div className="flex justify-start mb-4 sm:mb-0">
        <button type="submit" className="btn btn-primary mr-2">
          Plot Route
        </button>
        <button type="button" className="btn btn-primary" onClick={handleRouteStringClear}>
          Clear Route
        </button>
      </div>
    </form>
  );
};
