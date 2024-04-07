import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from './baseApi';

export const themeApi = createApi({
  reducerPath: 'themeApi',
  baseQuery: axiosBaseQuery({
    baseUrl: `http://localhost:${__SERVER_PORT__}/api/user`,
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
