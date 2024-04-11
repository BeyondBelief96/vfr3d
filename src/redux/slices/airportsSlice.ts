import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getAirportsByState, getAllAirports } from '../../api/faa-airports';
import { Airport } from '../../api/types';

interface AirportState {
  airports: Airport[];
  visibleAirports: Airport[];
  showAirports: boolean;
  selectedStateAirports: string;
  loading: boolean;
  error: string | null;
}

const initialState: AirportState = {
  airports: [],
  visibleAirports: [],
  showAirports: false,
  selectedStateAirports: '',
  loading: false,
  error: '',
};

export const fetchAirportsByState = createAsyncThunk(
  'airport/fetchAirportsByState',
  async (selectedState: string, { rejectWithValue }) => {
    try {
      const airportsData =
        selectedState === '' ? await getAllAirports() : await getAirportsByState(selectedState);
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
    setAirports: (state, action: PayloadAction<Airport[]>) => {
      state.airports = action.payload;
    },
    toggleShowAirports: (state) => {
      state.showAirports = !state.showAirports;
    },
    setSelectedStateAirports: (state, action: PayloadAction<string>) => {
      state.selectedStateAirports = action.payload;
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
        state.visibleAirports = action.payload;
      })
      .addCase(fetchAirportsByState.rejected, (state) => {
        state.loading = false;
        state.error = 'Error occured when attempting to fetch airport data';
      })
      .addCase(fetchAllAirports.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllAirports.fulfilled, (state, action: PayloadAction<Airport[]>) => {
        state.loading = false;
        state.airports = action.payload;
      })
      .addCase(fetchAllAirports.rejected, (state) => {
        state.loading = false;
        state.error = 'Error occured when attempting to fech airport data';
      });
  },
});

export const { setAirports, toggleShowAirports, setSelectedStateAirports } = airportSlice.actions;

export default airportSlice.reducer;
