'use client';
import {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from './../../node_modules/axios/index.d';
import axios, { AxiosRequestConfig } from 'axios';
import { getCookie } from '../utils/getCookie';
import { setCookie } from '../utils/setCookie';
import { ENDPOINTS } from '../consts/endpoints/endpoints';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';

export const createAxiosInstance = ({ baseUrl }: { baseUrl: string }) => {
  // Check for access token in localStorage (or other storage mechanisms like sessionStorage)
  const accessToken = getCookie('accessToken');

  // Prepare headers with Bearer token if available
  const finalHeaders = {
    ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
  };

  // Create Axios instance with base URL
  const axiosInstance = axios.create({
    baseURL: baseUrl,
    headers: finalHeaders,
  });

  // Request Interceptor
  axiosInstance.interceptors.request.use(
    (config) => {
      const token = getCookie('accessToken');
      if (token) {
        config = {
          ...config,
          headers: {
            ...config.headers,
            Authorization: `Bearer ${token}`,
          },
        } as InternalAxiosRequestConfig;
      }
      return config;
    },
    (error) => {
      // Handle request error
      console.error('Request error:', error);
      return Promise.reject(error);
    },
  );

  // Response Interceptor
  axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => {
      if (response.data?.data?.accessToken) {
        setCookie('accessToken', response.data?.data?.accessToken, 1);
      }
      if (response.data?.data?.refreshToken) {
        setCookie('refreshToken', response.data?.data?.refreshToken, 1);
      }
      if (response.data?.data?.user) {
        setCookie('user', JSON.stringify(response.data?.data?.user), 1);
      }

      return response;
    },
    (error: AxiosError) => {
      // Handle response error globally
      if (error.response?.status === 401) {
        if (window.location.pathname === '/401') {
          // Do nothing or display a custom error message
          return;
        } else {
          // window.location.href = "/401";
        }

        // Handle token refresh, logout, etc.
      } else if (error.response?.status === 500) {
        // Example: Show a generic error message for server issues
        // console.error("Server error, please try again later.");
      }
      return Promise.reject(error);
    },
  );

  return axiosInstance;
};

export const baseAxiosInstance = createAxiosInstance({
  baseUrl: ENDPOINTS.API,
});

export const axiosBaseQuery =
  ({ baseUrl }: { baseUrl?: string } = { baseUrl: ENDPOINTS.API }) =>
  async ({ url, method, data, params, headers }: AxiosRequestConfig) => {
    const axiosInstance = createAxiosInstance({
      baseUrl: baseUrl ? baseUrl : '',
    });

    try {
      const result = await axiosInstance({
        url,
        method,
        data,
        params,
        headers, // You can pass additional headers if needed
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

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
