import { Entity, IonResource, KmlDataSource } from 'cesium';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useCesium } from 'resium';
import { updateCurrentAirspaceEntityIds } from '../../redux/slices/entitiesSlice';
import { AppDispatch, RootState } from '../../redux/store';

interface AirspaceComponentProps {
  setIsLoading: (isLoading: boolean) => void;
}

const AirspaceComponent: React.FC<AirspaceComponentProps> = ({ setIsLoading }) => {
  const { viewer } = useCesium();
  const dispatch = useDispatch<AppDispatch>();
  const { airspace3dEnabled } = useSelector((state: RootState) => state.airspace);
  const entityRefs = useRef<Record<string, Entity>>({});

  useEffect(() => {
    if (!viewer) {
      dispatch(updateCurrentAirspaceEntityIds([]));
      return;
    }

    const kmlDataSource = new KmlDataSource();

    const loadKML = async () => {
      try {
        setIsLoading(true); // Set loading state to true
        console.log('REACHED CODE');

        const ionKmlResource = await IonResource.fromAssetId(2528900);
        await kmlDataSource.load(ionKmlResource.url);

        viewer.dataSources.add(kmlDataSource);

        const newEntityIds: string[] = [];
        const entities = kmlDataSource.entities.values;

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
      viewer.dataSources.remove(kmlDataSource);
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
