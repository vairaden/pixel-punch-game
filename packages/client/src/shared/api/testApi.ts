import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '@/shared/api/baseApi';

export const testApi = createApi({
  reducerPath: 'testApi',
  baseQuery: axiosBaseQuery({
    baseUrl: '/',
  }),
  endpoints: builder => ({
    getTestData: builder.query<string, void>({
      query: () => ({ url: '', method: 'get' }),
    }),
  }),
});

export const { useGetTestDataQuery } = testApi;
