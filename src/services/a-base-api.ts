import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

// const baseUrl = 'https://fastify-task-manager-api-production.up.railway.app/api/v1';
const baseUrl = 'http://localhost:3000/api';

export const baseApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({
    baseUrl
  }),
  tagTypes: ['Users'],
  endpoints: () => ({})
});
