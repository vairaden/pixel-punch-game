import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { BaseQueryFn } from '@reduxjs/toolkit/query';
import { getHostName } from '@/shared/utils';

export const BASE_URL = `http://localhost:${__SERVER_PORT__}/api/v2`;

export const axiosInstance = axios.create({
  baseURL: `http://${getHostName()}:${__SERVER_PORT__}`,
  timeout: 5000,
});

export const axiosBaseQuery =
  (
    { baseUrl }: { baseUrl: string } = {
      baseUrl: BASE_URL,
    }
  ): BaseQueryFn<
    {
      url: string;
      method: AxiosRequestConfig['method'];
      data?: AxiosRequestConfig['data'];
      params?: AxiosRequestConfig['params'];
      headers?: AxiosRequestConfig['headers'];
      withCredentials?: AxiosRequestConfig['withCredentials'];
    },
    unknown,
    unknown
  > =>
  async ({ url, method, data, params, headers, withCredentials }) => {
    try {
      const result = await axiosInstance({
        url: baseUrl + url,
        method,
        data,
        params,
        headers,
        withCredentials,
      });
      return { data: result.data };
    } catch (axiosError) {
      const err = axiosError as AxiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };
