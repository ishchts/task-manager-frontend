import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../index';

const initialState = {
  isAuth: false
};

const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
    }
  }
});

export const isAuth = (state: RootState) => (state.auth.isAuth);
export default auth.reducer;
