import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SelectableEntities, SelectedEntityType } from '../../utility/types';

interface SelectedEntityState {
  entity: SelectedEntityType;
  type: SelectableEntities;
}

const initialState: SelectedEntityState = {
  entity: null,
  type: null,
};

const selectedEntitySlice = createSlice({
  name: 'selectedEntity',
  initialState,
  reducers: {
    setSelectedEntity: (state, action: PayloadAction<SelectedEntityState>) => {
      state.entity = action.payload.entity;
      state.type = action.payload.type;
    },
    clearSelectedEntity: (state) => {
      state.entity = null;
      state.type = null;
    },
  },
});

export const { setSelectedEntity, clearSelectedEntity } = selectedEntitySlice.actions;
export default selectedEntitySlice.reducer;
