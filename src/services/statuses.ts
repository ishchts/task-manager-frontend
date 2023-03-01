import { createEntityAdapter, createSelector, EntityState } from '@reduxjs/toolkit';
import { RootState } from '../store';

import { baseApi } from './a-base-api';

type Status = {
  id: number
  name: string
};

const statusesAdapter = createEntityAdapter<Status>();

const initialState = statusesAdapter.getInitialState();

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
        return statusesAdapter.setAll(initialState, responce);
      }
    }),
    createStatus: builder.mutation<unknown, Omit<Status, 'id'>>({
      query: (body) => ({
        url: '/v1/statuses',
        method: 'POST',
        body
      }),
      invalidatesTags: ['Statuses']
    }),
    editStatusById: builder.mutation<unknown, Status>({
      query: (body) => ({
        url: `/v1/statuses/${body.id}`,
        method: 'PATCH',
        body
      }),
      invalidatesTags: (res, err, arg) => ([{ type: 'Statuses', id: arg.id }])
    }),
    removeStatus: builder.mutation<unknown, number>({
      query: (id) => ({
        url: `/v1/statuses/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: (res, err, id) => ([{ type: 'Statuses', id }])
    })
  })
});

const selectStatusesResult = statuses.endpoints.getStatuses.select(undefined);

const selectStatusesData = createSelector(
  selectStatusesResult,
  (statusesResult) => statusesResult.data
);

export const {
  selectAll: selectAllStatuses,
  selectById: selectStatusById
} = statusesAdapter.getSelectors((state: RootState) => selectStatusesData(state) ?? initialState);

export const { useGetStatusesQuery, useCreateStatusMutation, useEditStatusByIdMutation, useRemoveStatusMutation } = statuses;
