import { AppState } from '@auth0/auth0-react';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  accessToken: string | null;
  // Add other relevant state properties if needed
}

const initialState: AuthState = {
  accessToken: null,
  // Initialize other state properties
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },
  },
});

export const { setAccessToken } = authSlice.actions;

export const getAccessToken = (state: AppState) => state.auth.accessToken;

export default authSlice.reducer;
