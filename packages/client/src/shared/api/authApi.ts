import { createApi } from '@reduxjs/toolkit/query/react';
import { ILoginData, IUser } from '../types/auth.interface';
import { axiosBaseQuery } from './baseApi';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: axiosBaseQuery(),
  endpoints: builder => ({
    createUser: builder.mutation<{ id: string }, Omit<IUser, 'id'>>({
      query: data => ({
        url: '/auth/signup',
        withCredentials: true,
        method: 'POST',
        data,
        prepareHeaders: (headers: Headers) => {
          headers.set('Content-Type', 'application/json');
          return headers;
        },
      }),
    }),
    loginByLogin: builder.mutation<ILoginData, unknown>({
      query: data => ({
        url: '/auth/signin',
        withCredentials: true,
        method: 'POST',
        data,
        prepareHeaders: (headers: Headers) => {
          headers.set('Content-Type', 'application/json');
          return headers;
        },
      }),
    }),
    getUserInfo: builder.query<IUser, void>({
      query: () => ({
        url: '/auth/user',
        withCredentials: true,
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useCreateUserMutation,
  useLoginByLoginMutation,
  useLazyGetUserInfoQuery,
} = authApi;
