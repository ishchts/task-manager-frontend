import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

import { RootState } from '../../';

import { getUsers } from './async-actions';

export type User = {
  id: number
  firstName: string
  lastName: string
  email: string
  createdAt: string
};

const usersAdapter = createEntityAdapter<User>();

const users = createSlice({
  name: 'users',
  initialState: {
    loading: 'idle',
    data: usersAdapter.getInitialState()
  },
  reducers: {
    userAdded: (state) => {
      usersAdapter.addOne(state.data, {
        id: 12,
        firstName: 'test',
        lastName: 'lastname',
        email: 'email@mail.ru',
        createdAt: new Date().toLocaleDateString()
      });
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getUsers.fulfilled, (state, { payload }) => {
      state.data = usersAdapter.setAll(usersAdapter.getInitialState(), payload);
    });
  }
});

export const booksSelectors = usersAdapter.getSelectors<RootState>(
  (state) => state.users.data
);

export const { userAdded } = users.actions;

export default users.reducer;
