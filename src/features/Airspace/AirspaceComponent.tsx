import { Entity, IonResource, KmlDataSource } from 'cesium';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useCesium } from 'resium';
import { updateCurrentAirspaceEntityIds } from '../../redux/slices/entitiesSlice';
import { AppDispatch, AppState } from '../../redux/store';

interface AirspaceComponentProps {
  setIsLoading: (isLoading: boolean) => void;
}

const AirspaceComponent: React.FC<AirspaceComponentProps> = ({ setIsLoading }) => {
  const { viewer } = useCesium();
  const dispatch = useDispatch<AppDispatch>();
  const { airspace3dEnabled } = useSelector((state: AppState) => state.airspace);
  const entityRefs = useRef<Record<string, Entity>>({});
  const kmlDataSourceRef = useRef<KmlDataSource>(new KmlDataSource());

  useEffect(() => {
    if (!viewer) {
      dispatch(updateCurrentAirspaceEntityIds([]));
      return;
    }

    const loadKML = async () => {
      try {
        setIsLoading(true);
        const ionKmlResource = await IonResource.fromAssetId(2537586, {
          accessToken: import.meta.env.VITE_CESIUM_API_KEY,
        });
        await kmlDataSourceRef.current.load(ionKmlResource);
        viewer?.dataSources?.add(kmlDataSourceRef.current);
        const newEntityIds: string[] = [];
        const entities = kmlDataSourceRef.current.entities.values;

        entities.forEach((entity) => {
          const entityId = entity.id;
          newEntityIds.push(entityId);
          entityRefs.current[entityId] = entity;
          entity.show = airspace3dEnabled;
        });

        dispatch(updateCurrentAirspaceEntityIds(newEntityIds));
      } catch (error) {
        console.error('Error loading KML file:', error);
      } finally {
        setIsLoading(false); // Set loading state to false after loading is complete
      }
    };

    if (airspace3dEnabled) {
      loadKML();
    }

    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      viewer?.dataSources?.remove(kmlDataSourceRef.current);
    };
  }, [viewer, dispatch, airspace3dEnabled, setIsLoading]);

  useEffect(() => {
    // Toggle visibility of airspace entities based on the showAirspaceEntities state
    Object.values(entityRefs.current).forEach((entity) => {
      if (entity) {
        entity.show = airspace3dEnabled;
      }
    });
  }, [airspace3dEnabled]);

  return null;
};

export default AirspaceComponent;
