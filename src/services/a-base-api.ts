import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { RootState } from '../store';

// const baseUrl = 'https://fastify-task-manager-api-production.up.railway.app/api/v1';
const baseUrl = 'http://localhost:3000/api';

export const baseApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
    timeout: 30000,
    prepareHeaders: (headers, api) => {
      const state: RootState = api.getState() as RootState;
      const token = localStorage.getItem('token');
      if (state.auth.isAuth && token) {
        const parsedToken: Record<string, string> = JSON.parse(token);

        headers.set('authorization', `Bearer ${parsedToken.accessToken}`);
      }
    }
  }),
  tagTypes: ['Users', 'Statuses', 'Labels', 'Tasks'],
  endpoints: () => ({})
});
