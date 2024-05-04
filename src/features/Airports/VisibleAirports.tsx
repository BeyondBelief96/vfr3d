// VisibleAirports.tsx
import { Entity, ScreenSpaceEventHandler, ScreenSpaceEventType } from 'cesium';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useCesium } from 'resium';
import { setSelectedAirport } from '../../redux/slices/airportsSlice';
import { AppDispatch, RootState } from '../../redux/store';
import AirportEntity from './AirportEntity';
import useMetarDataByState from '../../hooks/useMetarDataByState';
import { getMetarStationIdFromAirport } from '../../utility/utils';
import { useGetAirportsByStateQuery } from '../../redux/api/faa/faaApi';

const VisibleAirports: React.FC = () => {
  const { showAirports, selectedState } = useSelector((state: RootState) => state.airport);
  const dispatch = useDispatch<AppDispatch>();
  const { viewer } = useCesium();
  const metarData = useMetarDataByState(selectedState);

  const { data: visibleAirports = [] } = useGetAirportsByStateQuery(selectedState, {
    skip: !showAirports,
  });

  useEffect(() => {
    const handleClickAirport = (event: ScreenSpaceEventHandler.PositionedEvent) => {
      const pickedObject = viewer?.scene.pick(event.position);
      if (pickedObject && pickedObject.id) {
        const airportEntity = pickedObject.id as Entity;
        const airport = visibleAirports.find((airport) => airport.GLOBAL_ID === airportEntity.id);
        console.log(airport);
        dispatch(setSelectedAirport(airport || null));
      } else {
        dispatch(setSelectedAirport(null));
      }
    };

    if (showAirports) {
      viewer?.screenSpaceEventHandler.setInputAction(
        handleClickAirport,
        ScreenSpaceEventType.LEFT_CLICK
      );
    } else {
      viewer?.screenSpaceEventHandler.removeInputAction(ScreenSpaceEventType.LEFT_CLICK);
    }

    return () => {
      viewer?.screenSpaceEventHandler.removeInputAction(ScreenSpaceEventType.LEFT_CLICK);
    };
  }, [viewer, visibleAirports, dispatch, showAirports]);

  const metarMap = new Map(metarData.map((metar) => [metar.stationId, metar]));

  if (!showAirports) {
    return null;
  }

  return (
    <>
      {visibleAirports.map((airport) => {
        const stationId = getMetarStationIdFromAirport(airport);
        let metar;
        if (stationId) {
          metar = metarMap.get(stationId);
        }
        return <AirportEntity key={airport.GLOBAL_ID} airport={airport} metar={metar} />;
      })}
    </>
  );
};

export default VisibleAirports;
