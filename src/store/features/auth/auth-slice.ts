import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../index';

import { authApi } from '../../../services/auth';

const token = localStorage.getItem('token');

const initialState = {
  isAuth: !!token
};

const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
    },
    logout: (state) => {
      state.isAuth = false;
      localStorage.removeItem('token');
    }
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.signUp.matchFulfilled,
      (state, { payload }) => {
        state.isAuth = true;
        localStorage.setItem('token', JSON.stringify(payload));
      }
    );
  }
});

export const isAuth = (state: RootState) => (state.auth.isAuth);

export const { logout } = auth.actions;

export default auth.reducer;
