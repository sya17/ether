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
  response: BaseResponse<T> | null;
}

export interface RootState<T> {
  api: ApiState<T>;
}
