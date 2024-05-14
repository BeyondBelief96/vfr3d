// useMapOptions.ts
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import {
  setImageryAlpha,
  setImageryBrightness,
  setSelectedLayer,
} from '../redux/slices/ViewerSlice';
import { AppState } from '../redux/store';

const selectSelectedImageryLayer = createSelector(
  (state: AppState) => state.viewer.selectedImageryLayer,
  (selectedImageryLayer) => selectedImageryLayer
);

const useMapOptions = () => {
  const dispatch = useDispatch();
  const selectedImageryLayer = useSelector(selectSelectedImageryLayer);

  const handleLayerChange = useCallback(
    (layer: string) => {
      dispatch(setSelectedLayer(layer));
    },
    [dispatch]
  );

  const handleAlphaChange = useCallback(
    (alpha: number) => {
      dispatch(setImageryAlpha(alpha));
    },
    [dispatch]
  );

  const handleBrightnessChange = useCallback(
    (brightness: number) => {
      dispatch(setImageryBrightness(brightness));
    },
    [dispatch]
  );

  return {
    selectedImageryLayer,
    handleLayerChange,
    handleAlphaChange,
    handleBrightnessChange,
  };
};

export default useMapOptions;
