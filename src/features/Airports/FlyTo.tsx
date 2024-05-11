import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useCesium } from 'resium';
import { AppState } from '../../redux/store';
import { setSelectedAirport } from '../../redux/slices/airportsSlice';
import { useGetAirportByIcaoCodeOrIdentQuery } from '../../redux/api/faa/faaApi';
import { flyToPoint, mapAirportDataToCartesian3 } from '../../utility/cesiumUtils';

const FlyTo = () => {
  const { viewer } = useCesium();
  const searchQuery = useSelector((state: AppState) => state.search.airportQuery);
  const triggerSearchCount = useSelector((state: AppState) => state.search.triggerSearchCount);
  const routePoints = useSelector((state: AppState) => state.route.routePoints);
  const dispatch = useDispatch();

  const [flyToInitialRoutePoint, setFlyToInitialRoutePoint] = useState(true);

  const { data: airport } = useGetAirportByIcaoCodeOrIdentQuery(searchQuery, {
    skip: !searchQuery,
  });

  // useEffect that handles setting camera position to initial point of route.
  useEffect(() => {
    if (routePoints.length === 0) {
      setFlyToInitialRoutePoint(true);
      return;
    }

    if (flyToInitialRoutePoint) {
      const position = mapAirportDataToCartesian3(routePoints[0]);
      if (position) {
        flyToPoint(viewer, position);

        if (routePoints.length > 1) setFlyToInitialRoutePoint(false);
      }
    }
  }, [routePoints, flyToInitialRoutePoint, viewer]);

  // useEffect that handles setting camera to airport location based on search bar query.
  useEffect(() => {
    if (airport) {
      dispatch(setSelectedAirport(airport));
      const position = mapAirportDataToCartesian3(airport);
      if (position) flyToPoint(viewer, position);
    }
  }, [airport, viewer, dispatch, triggerSearchCount]);

  return null;
};

export default FlyTo;
