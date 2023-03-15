import { baseApi } from './a-base-api';

type Label = {
  id: number
  name: string
  createAt: string
  updatedAt: string
};

export type Labels = Label[];

const labelApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getLabels: builder.query<Labels, undefined>({
      query: () => ({
        url: '/v1/labels'
      }),
      providesTags: (res, err, arg) => {
        const newTags = res
          ? res.map(({ id }) => ({ type: 'Labels' as const, id }))
          : [];

        return [...newTags, { type: 'Labels', id: 'LIST' }];
      }
    }),
    getLabelById: builder.query<Label, Pick<Label, 'id'>>({
      query: (params) => ({
        url: `v1/labels/${params.id}`
      }),
      providesTags: (res, err, args) => ([{ type: 'Labels', id: args.id }])
    }),
    createLabel: builder.mutation<unknown, Pick<Label, 'name'>>({
      query: (name) => ({
        url: 'v1/labels',
        method: 'POST',
        body: name
      }),
      invalidatesTags: ['Labels']
    }),
    editLabel: builder.mutation<unknown, Pick<Label, 'name' | 'id'>>({
      query: ({ id, name }) => ({
        url: `/v1/labels/${id}`,
        method: 'PATCH',
        body: { name }
      }),
      invalidatesTags: (res, err, args) => ([{ type: 'Labels', id: args.id }])
    }),
    deleteLabel: builder.mutation<unknown, Label['id']>({
      query: (id) => ({
        url: `/v1/labels/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: (res, err, id) => ([{ type: 'Labels', id }])
    })
  })
});

export const {
  useGetLabelsQuery,
  useCreateLabelMutation,
  useGetLabelByIdQuery,
  useEditLabelMutation,
  useDeleteLabelMutation
} = labelApi;
