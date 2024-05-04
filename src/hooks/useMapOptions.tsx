// useMapOptions.ts
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import {
  setImageryAlpha,
  setImageryBrightness,
  setSelectedLayer,
} from '../redux/slices/ViewerSlice';

const useMapOptions = () => {
  const dispatch = useDispatch();
  const { selectedImageryLayer } = useSelector((state: RootState) => state.viewer);

  const handleLayerChange = (layer: string) => {
    dispatch(setSelectedLayer(layer));
  };

  const handleAlphaChange = (alpha: number) => {
    dispatch(setImageryAlpha(alpha));
  };

  const handleBrightnessChange = (brightness: number) => {
    dispatch(setImageryBrightness(brightness));
  };

  return {
    selectedImageryLayer,
    handleLayerChange,
    handleAlphaChange,
    handleBrightnessChange,
  };
};

export default useMapOptions;
