import { baseApi } from './a-base-api';

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
};

type Tasks = Task[];

type CreateTask = {
  name: string
  executorId: number | null
  statusId: number
  description?: string
  labelIds?: number[]
};

const taskApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTasks: builder.query<Tasks, undefined>({
      query: () => ({
        url: '/v1/tasks'
      }),
      providesTags: ['Tasks']
    }),
    createTask: builder.mutation<unknown, CreateTask>({
      query: (body) => ({
        url: '/v1/tasks',
        method: 'POST',
        body
      }),
      invalidatesTags: ['Tasks']
    })
  })
});

export const {
  useGetTasksQuery,
  useCreateTaskMutation
} = taskApi;
