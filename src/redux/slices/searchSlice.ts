import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SearchState {
  airportQuery: string;
}

const initialState: SearchState = {
  airportQuery: '',
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchAirportQuery: (state, action: PayloadAction<string>) => {
      state.airportQuery = action.payload;
    },
  },
});

export const { setSearchAirportQuery } = searchSlice.actions;

export default searchSlice.reducer;
