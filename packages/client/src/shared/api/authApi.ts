import { createApi } from '@reduxjs/toolkit/query/react';
import {
  ILoginData,
  IOAuthYandexLoginData,
  IUser,
} from '../types/auth.interface';
import { axiosBaseQuery } from './baseApi';

const baseAuthUrl = '/auth';
const oAuthYrl = '/oauth/yandex';
export const devRedirectUri = 'http://localhost:3000/oauth';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: axiosBaseQuery(),
  endpoints: builder => ({
    createUser: builder.mutation<{ id: string }, Omit<IUser, 'id'>>({
      query: data => ({
        url: `${baseAuthUrl}/signup`,
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
        url: `${baseAuthUrl}/signin`,
        withCredentials: true,
        method: 'POST',
        data,
        prepareHeaders: (headers: Headers) => {
          headers.set('Content-Type', 'application/json');
          return headers;
        },
      }),
    }),
    loginByYandex: builder.mutation<{ service_id: string }, void>({
      query: () => ({
        url: `${oAuthYrl}/service-id?redirect_uri=${devRedirectUri}`,
        withCredentials: true,
        method: 'GET',
      }),
    }),
    checkIsLoggedInByYandex: builder.mutation<void, IOAuthYandexLoginData>({
      query: data => ({
        url: oAuthYrl,
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
        url: `${baseAuthUrl}/user`,
        withCredentials: true,
        method: 'GET',
      }),
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: `${baseAuthUrl}/logout`,
        withCredentials: true,
        method: 'POST',
      }),
    }),
  }),
});

export const {
  useCreateUserMutation,
  useLoginByLoginMutation,
  useLazyGetUserInfoQuery,
  useLogoutMutation,
  useLoginByYandexMutation,
  useCheckIsLoggedInByYandexMutation,
} = authApi;
