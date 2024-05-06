import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ViewerState {
  currentImageryAlpha: number;
  currentImageryBrightness: number;
  selectedImageryLayer: string;
}

const initialState: ViewerState = {
  currentImageryAlpha: 1,
  currentImageryBrightness: 1,
  selectedImageryLayer: 'None',
};

const viewerSlice = createSlice({
  name: 'viewer',
  initialState,
  reducers: {
    setImageryAlpha: (state, action: PayloadAction<number>) => {
      state.currentImageryAlpha = action.payload;
    },
    setImageryBrightness: (state, action: PayloadAction<number>) => {
      state.currentImageryBrightness = action.payload;
    },
    setSelectedLayer: (state, action: PayloadAction<string>) => {
      state.selectedImageryLayer = action.payload;
    },
  },
});

export const { setImageryAlpha, setImageryBrightness, setSelectedLayer } = viewerSlice.actions;

export default viewerSlice.reducer;
