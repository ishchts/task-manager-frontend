import { baseApi } from './a-base-api';

import { Label } from './labels';

type Task = {
  id: number
  name: string
  creator: {
    firstName: string
    lastName: string
  }
  executor: {
    firstName: string
    lastName: string
  } | null
  createdAt: string
  updatedAt: string
  labels: Label[]
  description?: string
};

type Tasks = Task[];

export type TaskQueryParams = {
  status?: number
  executor?: number
  label?: number
  isCreator: boolean
};

export type TaskDetail = {
  id: number
  name: string
  description: string
  statusId: number
  creatorId: number
  executorId: number
  labels: Label[]
  createdAt: string
  updatedAt: string
};

type CreateTask = {
  name: string
  statusId: number
  executorId: number | null
  description?: string
  labelIds?: number[]
};

export type EditTaskBody = CreateTask & {
  id: number
};

const taskApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTasks: builder.query<Tasks, TaskQueryParams>({
      query: (params) => ({
        url: '/v1/tasks',
        params
      }),
      providesTags: (result) => {
        const newResult = result
          ? result.map(({ id }) => ({ type: 'Tasks' as const, id }))
          : [];

        return [...newResult, { type: 'Tasks', id: 'LIST' }];
      }
    }),
    getTaskById: builder.query<TaskDetail, string>({
      query: (id) => ({
        url: `/v1/tasks/${id}`
      }),
      providesTags: (result) => {
        return [{ type: 'Tasks' as const, id: result?.id }];
      }
    }),
    createTask: builder.mutation<unknown, CreateTask>({
      query: (body) => ({
        url: '/v1/tasks',
        method: 'POST',
        body
      }),
      invalidatesTags: ['Tasks']
    }),
    editTaskById: builder.mutation<unknown, EditTaskBody>({
      query: ({ id, ...rest }) => ({
        url: `/v1/tasks/${id}`,
        method: 'PATCH',
        body: rest
      }),
      async onQueryStarted (arg, api) {
        const { id, ...body } = arg;
        const { dispatch, queryFulfilled } = api;

        const updateResult = dispatch(
          taskApi.util.updateQueryData('getTaskById', String(id), (draft) => {
            Object.assign(draft, body);
          })
        );

        try {
          await queryFulfilled;
        } catch {
          updateResult.undo();
        }
        /**
         * Alternatively, on failure you can invalidate the corresponding cache tags
         * to trigger a re-fetch:
         * dispatch(api.util.invalidateTags(['Post']))
         */
      }
      // invalidatesTags: (res, err, args) => ([{ type: 'Tasks', id: args.id }])
    }),
    removeTaskById: builder.mutation<unknown, Task['id']>({
      query: (id) => ({
        url: `/v1/tasks/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: (res, err, id) => ([{ type: 'Tasks' as const, id }])
    })
  })
});

export const {
  useGetTasksQuery,
  useGetTaskByIdQuery,
  useCreateTaskMutation,
  useEditTaskByIdMutation,
  useRemoveTaskByIdMutation
} = taskApi;
