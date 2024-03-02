import { Api, BaseResponse } from "@/interfaces/api";
import { formatDate } from "./date-util";
import { FilterRequest } from "@/interfaces/request-interface";
import { URLSearchParams } from "url";
import { OPERATORS } from "@/constant/common-constant";

export const apiUtil: <T extends object>(
  config: Api<T>
) => Promise<BaseResponse<any>> = async <T extends object>(config: Api<T>) => {
  try {
    let baseUrl = "http://localhost:8008/api/v1/";
    // let baseUrl = process.env.BASE_URL;

    const url = new URL(baseUrl + config.endpoint);

    // Set path parameters
    Object.keys(config.pathParams || {}).forEach((key) => {
      console.log("config.pathParams ", config.pathParams);

      url.pathname = url.pathname.replace(`:${key}`, config.pathParams![key]);
    });

    // Set query parameters
    Object.keys(config.queryParams || {}).forEach((key) => {
      console.log(`key: ${key} , val: ${config.queryParams![key]}`);
      if (key == "filter" && config.queryParams![key]) {
        const { keySearch, search } = buildFilter(config.queryParams![key]);
        if (search && keySearch) url.searchParams.append(keySearch, search);
      } else {
        url.searchParams.append(key, config.queryParams![key]);
      }
    });
    // Set the media type header
    config.headers = {
      ...config.headers,
      "Content-Type": "application/json",
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

    // if (!response.ok) {
    //   throw new Error(data.error || "Failed to fetch data");
    // }

    const apiResponse: BaseResponse<T> = {
      timestamp: data.timestamp,
      statusCode: data.statusCode ?? response.status,
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
    const apiResponse: BaseResponse<T> = {
      timestamp: formatDate(new Date()),
      statusCode: error.statusCode,
      error: error,
      message: error.message,
    };
    return apiResponse;
  }
};

const buildFilter = (
  filters: FilterRequest[]
): { keySearch: string; search: string | undefined } => {
  // console.log("INI FILTER YAA", filters);
  let filterRequest: string | undefined;
  filters.map((e) => {
    // console.log("e connector ", e.connector);
    if (e.group) {
    } else {
      filterRequest = `:${e.connector}:`;
      filterRequest += `${e.keySearch}`;
      // filterRequest += `${e.operator}`;
      filterRequest += parseOperator(e.operator);

      if (e.operator.includes(OPERATORS.LIKE)) {
        filterRequest += `%${e.value}%`;
      } else {
        filterRequest += `${e.value}`;
      }
    }
  });

  // console.log("filterRequest ", filterRequest);

  // one
  // :AND:Name=User

  // multiple
  // :GROUP_AND:Name=User:OR:Desc=deskripsi

  return {
    keySearch: "filter",
    search: filterRequest,
  };
};

const parseOperator = (operator: string): string => {
  switch (operator) {
    case OPERATORS.LIKE:
      return OPERATORS.EQUALS;
    default:
      return operator;
  }
};
