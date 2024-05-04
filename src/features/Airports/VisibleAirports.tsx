import {
  Entity,
  ScreenSpaceEventHandler,
  ScreenSpaceEventType,
  Color,
  ConstantProperty,
  PointGraphics,
} from 'cesium';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useCesium } from 'resium';
import {
  clearVisibleAirports,
  fetchAirportsByState,
  setSelectedAirport,
} from '../../redux/slices/airportsSlice';
import { AppDispatch, RootState } from '../../redux/store';
import { mapAirportDataToCartesian3 } from '../../utility/utils';
import { MetarDTO } from 'vfr3d-shared';
import { getMetarsByState } from '../../api/vfr3d-api/vfr3d.api';

const VisibleAirports: React.FC = () => {
  const { showAirports, visibleAirports, selectedState } = useSelector(
    (state: RootState) => state.airport
  );
  const dispatch = useDispatch<AppDispatch>();
  const { viewer } = useCesium();
  const entityRefs = useRef<Record<string, Entity>>({});

  useEffect(() => {
    if (showAirports) {
      dispatch(fetchAirportsByState(selectedState));
    } else {
      dispatch(clearVisibleAirports());
    }
  }, [dispatch, selectedState, showAirports]);

  useEffect(() => {
    if (!viewer) return;

    // Remove existing entities
    Object.values(entityRefs.current).forEach((entity) => viewer.entities.remove(entity));
    entityRefs.current = {};

    if (!showAirports) return;

    // Add new entities
    visibleAirports.forEach((airport) => {
      const position = mapAirportDataToCartesian3(airport);
      if (!position) return;

      const entity = viewer.entities.add({
        position,
        point: new PointGraphics({
          pixelSize: new ConstantProperty(10),
        }),
        id: airport.GLOBAL_ID,
      });

      entityRefs.current[airport.GLOBAL_ID] = entity;
    });
  }, [showAirports, viewer, visibleAirports]);

  useEffect(() => {
    const fetchMetarData = async (): Promise<MetarDTO[]> => {
      try {
        const metarData = await getMetarsByState(selectedState);
        return metarData;
      } catch (error) {
        console.error('Error fetching METARs:', error);
        return [];
      }
    };

    const updateAirportColors = async () => {
      if (!viewer) return;

      const metarData = await fetchMetarData();
      const metarMap = new Map(metarData.map((metar) => [metar.stationId, metar]));

      visibleAirports.forEach((airport) => {
        const position = mapAirportDataToCartesian3(airport);
        if (!position) return;

        const icaoId = airport.ICAO_ID;
        const ident = airport.IDENT;
        let metar: MetarDTO | undefined;

        if (icaoId) {
          metar = metarMap.get(icaoId);
        }

        if (!metar && ident) {
          const stationIdWithoutPrefix =
            ident.startsWith('K') || ident.startsWith('P') ? ident : `K${ident}`;
          metar = metarMap.get(stationIdWithoutPrefix);
        }

        let color = Color.WHITE; // Default color for VFR
        if (metar) {
          switch (metar.flightCategory) {
            case 'VFR':
              color = Color.GREEN;
              break;
            case 'MVFR':
              color = Color.BLUE;
              break;
            case 'IFR':
              color = Color.RED;
              break;
            case 'LIFR':
              color = Color.PURPLE;
              break;
          }
        }

        const entity = viewer.entities.getById(airport.GLOBAL_ID);
        if (entity) {
          if (!entity.point) {
            entity.point = new PointGraphics({
              color: new ConstantProperty(color),
              pixelSize: new ConstantProperty(10),
            });
          } else {
            entity.point.color = new ConstantProperty(color);
            entity.point.pixelSize = new ConstantProperty(10);
          }
        }
      });
    };

    if (showAirports) {
      updateAirportColors();
    }
  }, [showAirports, viewer, visibleAirports, selectedState]);

  useEffect(() => {
    const handleClickAirport = (event: ScreenSpaceEventHandler.PositionedEvent) => {
      const pickedObject = viewer?.scene.pick(event.position);
      if (pickedObject && pickedObject.id) {
        const airportEntity = pickedObject.id as Entity;
        const airportEntityId = airportEntity.id;
        if (entityRefs.current[airportEntityId]) {
          const airport = visibleAirports.find((airport) => airport.GLOBAL_ID === airportEntityId);
          dispatch(setSelectedAirport(airport || null));
        } else {
          dispatch(setSelectedAirport(null));
        }
      }
    };

    viewer?.screenSpaceEventHandler.setInputAction(
      handleClickAirport,
      ScreenSpaceEventType.LEFT_CLICK
    );

    return () => {
      viewer?.screenSpaceEventHandler.removeInputAction(ScreenSpaceEventType.LEFT_CLICK);
    };
  }, [viewer, visibleAirports, dispatch]);

  return null;
};

export default VisibleAirports;
