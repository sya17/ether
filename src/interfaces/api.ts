import { SerializedError } from "@reduxjs/toolkit";

export interface Api<T> {
  endpoint: string;
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  headers?: Record<string, string>;
  body?: Record<string, any>;
  pathParams?: Record<string, any>;
  queryParams?: Record<string, any>;
}

export interface BaseResponse<T> {
  timestamp: string;
  statusCode?: number;
  error?: string | undefined | SerializedError;
  message?: string;
  ttlRecords?: number;
  ttlPages?: number;
  pageNo?: number;
  pageRecords?: number;
  data?: T;
}

export interface ApiState<T> {
  loading: boolean;
  type: string | undefined;
  response: BaseResponse<T> | undefined | null;
}

export interface RootState<T> {
  api: ApiState<T>;
}

export interface pagination<T> {
  ttlRecords?: number;
  ttlPages?: number;
  pageNo?: number;
  pageRecords?: number;
}

export interface ResourceState<T> {
  getAll?: GetAllState<T>;
  getKey?: GetKeyState<T>;
  post?: PostState<T>;
  patch?: PatchState<T>;
  put?: PutState<T>;
  delete?: DeleteState<T>;
}

export interface GetAllState<T> {
  loading: boolean;
  dataList: T[];
  page: pagination<T>;
  meesage: string | null;
  success: boolean;
  error: any;
}

export interface GetKeyState<T> {
  loading: boolean;
  data: T | null;
  meesage: string | null;
  success: boolean;
  error: any;
}

export interface PostState<T> {
  loading: boolean;
  data: T | null;
  meesage: string | null;
  success: boolean;
  error: any;
}

export interface PatchState<T> {
  loading: boolean;
  data: T | null;
  meesage: string | null;
  success: boolean;
  error: any;
}

export interface PutState<T> {
  loading: boolean;
  data: T | null;
  meesage: string | null;
  success: boolean;
  error: any;
}

export interface DeleteState<T> {
  loading: boolean;
  data: T | null;
  meesage: string | null;
  success: boolean;
  error: any;
}

export const defaultIntialState = <T extends object>(): ResourceState<T> => {
  return {
    getAll: {
      loading: false,
      dataList: [],
      page: {},
      meesage: null,
      success: false,
      error: undefined,
    },
    getKey: {
      loading: false,
      data: null,
      meesage: null,
      success: false,
      error: undefined,
    },
    post: {
      loading: false,
      data: null,
      meesage: null,
      success: false,
      error: undefined,
    },
    patch: {
      loading: false,
      data: null,
      meesage: null,
      success: false,
      error: undefined,
    },
    put: {
      loading: false,
      data: null,
      meesage: null,
      success: false,
      error: undefined,
    },
    delete: {
      loading: false,
      data: null,
      meesage: null,
      success: false,
      error: undefined,
    },
  };
};
