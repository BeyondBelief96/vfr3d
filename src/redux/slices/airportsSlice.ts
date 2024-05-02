import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getAirportsByState, getAllAirports } from '../../api/faa-api/faa.api';
import { Airport } from '../../api/faa-api/faa.dto';
import { states } from '../../utility/states';

interface AirportState {
  visibleAirports: Airport[];
  showAirports: boolean;
  selectedState: string;
  selectedAirport: Airport | null;
  loading: boolean;
  error: string | null;
}

const initialState: AirportState = {
  visibleAirports: [],
  showAirports: false,
  selectedState: states[0],
  selectedAirport: null,
  loading: false,
  error: '',
};

export const fetchAirportsByState = createAsyncThunk(
  'airport/fetchAirportsByState',
  async (selectedState: string, { rejectWithValue }) => {
    try {
      const airportsData = await getAirportsByState(selectedState);
      return airportsData;
    } catch (error: unknown) {
      return rejectWithValue(error as string);
    }
  }
);

export const fetchAllAirports = createAsyncThunk(
  'airport/fetchAllAirports',
  async (_, { rejectWithValue }) => {
    try {
      const airportsData = await getAllAirports();
      return airportsData;
    } catch (error: unknown) {
      return rejectWithValue(error as string);
    }
  }
);

const airportSlice = createSlice({
  name: 'airport',
  initialState,
  reducers: {
    toggleShowAirports: (state) => {
      state.showAirports = !state.showAirports;
    },
    setSelectedState: (state, action: PayloadAction<string>) => {
      state.selectedState = action.payload;
    },
    setSelectedAirport: (state, action: PayloadAction<Airport | null>) => {
      state.selectedAirport = action.payload;
    },
    clearVisibleAirports: (state) => {
      state.visibleAirports = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAirportsByState.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAirportsByState.fulfilled, (state, action: PayloadAction<Airport[]>) => {
        state.loading = false;
        state.visibleAirports = []; // Clear the visibleAirports array
        state.visibleAirports = action.payload; // Update with new data
      })
      .addCase(fetchAirportsByState.rejected, (state) => {
        state.loading = false;
        state.error = 'Error occured when attempting to fetch airport data';
      });
  },
});

export const { toggleShowAirports, setSelectedState, setSelectedAirport, clearVisibleAirports } =
  airportSlice.actions;

export default airportSlice.reducer;
