// hooks/useSelectedEntity.ts
import { useSelector } from 'react-redux';
import { AppState } from '../redux/store';

export function useSelectedEntity() {
  const { entity: selectedEntity, type } = useSelector((state: AppState) => state.selectedEntity);

  function isAirport() {
    return type === 'Airport';
  }

  function isPirep() {
    return type === 'Pirep';
  }

  function isAirsigmet() {
    return type === 'Airsigmet';
  }

  return {
    selectedEntity,
    type,
    isAirport,
    isPirep,
    isAirsigmet,
  };
}
