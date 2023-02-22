import { createEntityAdapter, EntityState } from '@reduxjs/toolkit';

import { baseApi } from './a-base-api';

type Status = {
  id: number
  name: string
};

const initialState = createEntityAdapter<Status>();

const statuses = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getStatuses: builder.query<EntityState<Status>, undefined>({
      query: () => ({
        url: '/v1/statuses'
      }),
      providesTags: (result) => {
        const newResult = result
          ? result.ids.map((id) => ({ type: 'Statuses' as const, id }))
          : [];

        return [
          ...newResult,
          { type: 'Statuses', id: 'LIST' }
        ];
      },
      transformResponse: (responce: Status[]) => {
        return initialState.setAll(initialState.getInitialState(), responce);
      }
    }),
    createStatus: builder.mutation<unknown, Omit<Status, 'id'>>({
      query: (body) => ({
        url: '/v1/statuses',
        method: 'POST',
        body
      }),
      invalidatesTags: ['Statuses']
    })
  })
});

export const { useGetStatusesQuery, useCreateStatusMutation } = statuses;
