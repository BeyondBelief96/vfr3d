// hooks/useAuthenticatedQuery.ts
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { AppState } from '../redux/store';

export function useAuthenticatedQuery() {
  const accessToken = useSelector((state: AppState) => state.auth.accessToken);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (accessToken) {
      setIsAuthenticated(true);
    }
  }, [accessToken]);

  return { isAuthenticated };
}
