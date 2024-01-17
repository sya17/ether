import { Api, BaseResponse } from "@/interfaces/api";
import { formatDate } from "@/lib/date-util";
import { createAsyncThunk } from "@reduxjs/toolkit";

type ApiCallPayload<T> = { config: Api<T>; rejectWithValue: any };

// export const apiCall = async <T>(config: Api<T>): Promise<BaseResponse<T>> => {
//   try {
//     let baseUrl = "http://localhost:8008/api/v1/";
//     // let baseUrl = process.env.BASE_URL;

//     const url = new URL(baseUrl + config.endpoint);

//     // Set path parameters
//     Object.keys(config.pathParams || {}).forEach((key) => {
//       url.pathname = url.pathname.replace(`:${key}`, config.pathParams![key]);
//     });

//     // Set query parameters
//     Object.keys(config.queryParams || {}).forEach((key) => {
//       url.searchParams.append(key, config.queryParams![key]);
//     });

//     console.log("url ", url.toString());
//     console.log("method ", config.method);
//     console.log("headers ", config.headers);
//     console.log("body ", config.body ?? JSON.stringify(config.body));
//     const response = await fetch(url.toString(), {
//       method: config.method,
//       headers: config.headers,
//       body: config.body ? JSON.stringify(config.body) : undefined,
//     });

//     const data = await response.json();
//     console.log("data ", data);

//     if (!response.ok) {
//       throw new Error(data.error || "Failed to fetch data");
//     }

//     const apiResponse: BaseResponse<any> = {
//       timestamp: data.timestamp,
//       statusCode: data.statusCode,
//       error: data.error,
//       message: data.message,
//       ttlRecords: data.ttlRecords,
//       ttlPages: data.ttlPages,
//       pageNo: data.pageNo,
//       pageRecords: data.pageRecords,
//       data: data.data,
//     };
//     return apiResponse;
//   } catch (error: any) {
//     return {
//       timestamp: formatDate(new Date()),
//       error: error,
//     };
//   }
// };

export const apiCall = createAsyncThunk(
  "api/call",
  async (config: Api<any>, { rejectWithValue }) => {
    try {
      let baseUrl = "http://localhost:8008/api/v1/";
      // let baseUrl = process.env.BASE_URL;

      const url = new URL(baseUrl + config.endpoint);

      // Set path parameters
      Object.keys(config.pathParams || {}).forEach((key) => {
        url.pathname = url.pathname.replace(`:${key}`, config.pathParams![key]);
      });

      // Set query parameters
      Object.keys(config.queryParams || {}).forEach((key) => {
        url.searchParams.append(key, config.queryParams![key]);
      });
      // Set the media type header
      config.headers = {
        ...config.headers,
        "Content-Type": "application/json", // Change this based on your media type
      };

      console.log("url ", url.toString());
      console.log("params ", url.searchParams);
      console.log("pathname ", url.pathname);
      console.log("method ", config.method);
      console.log("headers ", config.headers);
      console.log("body ", config.body ?? JSON.stringify(config.body));
      const response = await fetch(url.toString(), {
        method: config.method,
        headers: config.headers,
        body: config.body ? JSON.stringify(config.body) : undefined,
      });

      const data = await response.json();
      console.log("data ", data);

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch data");
      }

      const apiResponse: BaseResponse<any> = {
        timestamp: data.timestamp,
        statusCode: data.statusCode,
        error: data.error,
        message: data.message,
        ttlRecords: data.ttlRecords,
        ttlPages: data.ttlPages,
        pageNo: data.pageNo,
        pageRecords: data.pageRecords,
        data: data.data,
      };
      return apiResponse;
    } catch (error: any) {
      return rejectWithValue({
        data: null,
        error: error.message || "An error occurred",
      });
    }
  }
);
