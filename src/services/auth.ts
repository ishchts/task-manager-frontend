import { baseApi } from './a-base-api';

import { User } from './users';

type SignUpParam = Pick<User, 'email'> & {
  password: string
};

export type SignUpParamResult = {
  accessToken: string
  refreshToken: string
};

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    signUp: builder.mutation<SignUpParamResult, SignUpParam>({
      query: (params) => ({
        url: '/v1/auth/sign-up',
        method: 'POST',
        body: params
      })
    })
  })
});

export const { useSignUpMutation } = authApi;
