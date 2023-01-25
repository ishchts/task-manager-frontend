import {
  createApi,
  fetchBaseQuery
} from '@reduxjs/toolkit/query/react';

const baseUrl = 'https://fastify-task-manager-api-production.up.railway.app/api/v1';

type User = {
  id: number
  firstName: string
  lastName: string
  email: string
  createdAt: string
};

type Users = User[];

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({
    baseUrl
  }),
  endpoints: (builder) => ({
    // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
    getUsers: builder.query<Users, void>({
      query: () => '/users'
    })
  })
});

export const { useGetUsersQuery } = usersApi;
