import { createSelector, createEntityAdapter, EntityState } from '@reduxjs/toolkit';

import { RootState } from '../store';
import { baseApi } from './a-base-api';

export type User = {
  id: number
  firstName: string
  lastName: string
  email: string
  createdAt: string
};

type Users = User[];

type CreateNewUser = Omit<User, 'id' | 'createdAt'> & {
  password: string
};

const usersAdapter = createEntityAdapter<User>();

const initialState: EntityState<User> = usersAdapter.getInitialState();

export const usersApi = baseApi.injectEndpoints({
  endpoints: (builder) => {
    return ({
      getUsers: builder.query<EntityState<User>, undefined>({
        query: () => '/v1/users',
        providesTags: (result, err, arg) => {
          const newResult = result?.entities
            ? result?.ids.map((id) => ({ type: 'Users' as const, id }))
            : [];

          return [
            { type: 'Users', id: 'LIST' },
            ...newResult
          ];
        },
        transformResponse: (responceData: Users, meta, arg) => {
          const users: EntityState<User> = usersAdapter.setAll(initialState, responceData);
          return users;
        }
      }),
      createNewUser: builder.mutation<Omit<User, 'id' | 'createdAt'>, CreateNewUser>({
        query: (body) => ({
          url: '/v1/users',
          method: 'POST',
          body
        }),
        invalidatesTags: ['Users']
      }),
      editUser: builder.mutation<Omit<User, 'id' | 'createdAt'>, User>({
        query: (params) => ({
          url: `/v1/users/${params.id}`,
          method: 'PATCH',
          body: params
        }),
        invalidatesTags: (result, err, arg) => {
          return [{ type: 'Users', id: arg.id }];
        }
      })
    });
  }
});

export const selectUsersResult = usersApi.endpoints.getUsers.select(undefined);

export const selectUsersData = createSelector(
  selectUsersResult,
  usersResult => {
    return usersResult?.data;
  }
);

export const {
  selectAll: selectAllUsers,
  selectEntities: selectUserEntities,
  selectById: selectUserById
} = usersAdapter.getSelectors((state: RootState) => {
  return selectUsersData(state) ?? initialState;
});

// export const selectUserById = createSelector(
//   selectUserEntities,
//   (state: RootState, userId: number) => {
//     return userId;
//   },
//   (users, userId) => {
//     if (userId in users?.entities) {
//       return users?.entities[userId];
//     }
//   }
// );

export const {
  useGetUsersQuery,
  useCreateNewUserMutation,
  useEditUserMutation
} = usersApi;
