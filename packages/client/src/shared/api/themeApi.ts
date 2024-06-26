import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from './baseApi';
import { getHostName } from '@/shared/utils';

export const themeApi = createApi({
  reducerPath: 'themeApi',
  baseQuery: axiosBaseQuery({
    baseUrl: `https://${getHostName()}/api/user`,
  }),
  tagTypes: ['theme'],
  endpoints: builder => ({
    getTheme: builder.query<{ theme: string }, void>({
      query: () => ({
        url: '/theme',
        withCredentials: true,
        method: 'GET',
      }),
      providesTags: () => ['theme'],
    }),
    setTheme: builder.mutation<void, { theme: string }>({
      query: data => ({
        url: '/theme',
        withCredentials: true,
        method: 'PUT',
        data,
      }),
      invalidatesTags: ['theme'],
    }),
  }),
});

export const { useGetThemeQuery, useSetThemeMutation } = themeApi;
