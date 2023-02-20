import { createAsyncThunk } from '@reduxjs/toolkit';

import { User } from './user-slice';

const baseUrl = process.env.REACT_APP_TASK_MANAGER_API ?? '';

export const getUsers = createAsyncThunk<User[], undefined>(
  'users/getUsers',
  async () => {
    const res = await fetch(`${baseUrl}/v1/users`);
    const json = await res.json();
    return json;
  }
);
