import { API_METHOD, TOAST_MSG } from "@/constant/common-constant";
import {
  BaseResponse,
  ResourceState,
  defaultIntialState,
} from "@/interfaces/api";
import { Company } from "@/interfaces/company";
import { getAllRequest } from "@/interfaces/request-interface";
import { apiUtil } from "@/lib/api-util";
import { formatDate } from "@/lib/date-util";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "../store";

const initialState: ResourceState<Company> = defaultIntialState<Company>();

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    fetchResourceStart(state, action: PayloadAction<{ method: string }>) {
      switch (action.payload.method) {
        case API_METHOD.GET:
          state.getAll!.loading = true;
          state.getAll!.success = false;
          break;
        case API_METHOD.GET_KEY:
          state.getKey!.loading = true;
          state.getKey!.success = false;
          break;
        case API_METHOD.POST:
          state.post!.loading = true;
          state.post!.success = false;
          break;
        case API_METHOD.PATCH:
          state.patch!.loading = true;
          state.patch!.success = false;
          break;
        case API_METHOD.PUT:
          state.put!.loading = true;
          state.put!.success = false;
          break;
        case API_METHOD.DELETE:
          state.delete!.loading = true;
          state.delete!.success = false;
          break;
        default:
          break;
      }
    },
    fetchResourceDataList(
      state,
      action: PayloadAction<{ response: BaseResponse<Company[]> }>
    ) {
      state.getAll!.loading = false;
      state.getAll!.success = true;
      state.getAll!.meesage = action.payload.response.message!;
      state.getAll!.dataList = action.payload.response.data!;
      state.getAll!.page = {
        pageNo: action.payload.response.pageNo,
        pageRecords: action.payload.response.pageRecords,
        ttlPages: action.payload.response.ttlPages,
        ttlRecords: action.payload.response.ttlRecords,
      };
    },
    fetchResourceData(
      state,
      action: PayloadAction<{ response: BaseResponse<Company>; method: string }>
    ) {
      switch (action.payload.method) {
        case API_METHOD.GET_KEY:
          state.getKey!.loading = false;
          state.getKey!.success = true;
          state.getKey!.data = action.payload.response.data!;
          state.getKey!.meesage = action.payload.response.message!;
          break;
        case API_METHOD.POST:
          state.post!.loading = false;
          state.post!.success = true;
          state.post!.data = action.payload.response.data!;
          state.post!.meesage = action.payload.response.message!;
          break;
        case API_METHOD.PATCH:
          state.patch!.loading = false;
          state.patch!.success = true;
          state.patch!.data = action.payload.response.data!;
          state.patch!.meesage = action.payload.response.message!;
          break;
        case API_METHOD.PUT:
          state.put!.loading = false;
          state.put!.success = true;
          state.put!.data = action.payload.response.data!;
          state.put!.meesage = action.payload.response.message!;
          break;
        case API_METHOD.DELETE:
          state.delete!.loading = false;
          state.delete!.success = true;
          state.delete!.data = action.payload.response.data!;
          state.delete!.meesage = action.payload.response.message!;
          break;
        default:
          break;
      }
    },
    fetchResourceError(
      state,
      action: PayloadAction<{ error: Company | any; method: string }>
    ) {
      switch (action.payload.method) {
        case API_METHOD.GET:
          state.getAll!.loading = false;
          state.getAll!.error = action.payload.error;
          break;
        case API_METHOD.GET_KEY:
          state.getKey!.loading = false;
          state.getKey!.error = action.payload.error;
          break;
        case API_METHOD.POST:
          state.post!.loading = false;
          state.post!.error = action.payload.error;
          break;
        case API_METHOD.PATCH:
          state.patch!.loading = false;
          state.patch!.error = action.payload.error;
          break;
        case API_METHOD.PUT:
          state.put!.loading = false;
          state.put!.error = action.payload.error;
          break;
        case API_METHOD.DELETE:
          state.delete!.loading = false;
          state.delete!.error = action.payload.error;
          break;
        default:
          break;
      }
    },
    clearGetAll(state) {
      state.getAll = defaultIntialState<Company>().getAll;
    },
    clearGetKey(state) {
      state.getKey = defaultIntialState<Company>().getKey;
    },
    clearPost(state) {
      state.post = defaultIntialState<Company>().post;
    },
    clearPatch(state) {
      state.patch = defaultIntialState<Company>().patch;
    },
    clearPut(state) {
      state.put = defaultIntialState<Company>().put;
    },
    clearDelete(state) {
      state.delete = defaultIntialState<Company>().delete;
    },
  },
});

export const {
  fetchResourceStart,
  fetchResourceDataList,
  fetchResourceData,
  fetchResourceError,
  clearGetAll,
  clearGetKey,
  clearPost,
  clearPatch,
  clearPut,
  clearDelete,
} = userSlice.actions;

export const selectGetAll = (state: RootState) => state.apiCompany.getAll;
export const selectGetKey = (state: RootState) => state.apiCompany.getKey;
export const selectPost = (state: RootState) => state.apiCompany.post;
export const selectPatch = (state: RootState) => state.apiCompany.patch;
export const selectPut = (state: RootState) => state.apiCompany.put;
export const selectDelete = (state: RootState) => state.apiCompany.delete;

export default userSlice.reducer;

export const getCompany =
  (req: getAllRequest): AppThunk =>
  async (dispatch) => {
    dispatch(fetchResourceStart({ method: API_METHOD.GET }));
    try {
      const resp = await apiUtil<Company>({
        endpoint: "Company",
        method: "GET",
        queryParams: {
          page: req.page,
          size: req.size,
          acs: req.asc,
          desc: req.desc,
          filter: req.filter,
        },
        pathParams: req.pathParams,
      });
      dispatch(fetchResourceDataList({ response: resp }));
    } catch (error) {
      dispatch(fetchResourceError({ error: error, method: API_METHOD.GET }));
    }
  };

export const getCompanyByKey =
  (key: number): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(fetchResourceStart({ method: API_METHOD.GET_KEY }));
      const resp = await apiUtil<Company>({
        endpoint: `Company/${key}`,
        method: "GET",
      });
      dispatch(
        fetchResourceData({
          response: resp,
          method: API_METHOD.GET_KEY,
        })
      );
    } catch (error) {
      dispatch(
        fetchResourceError({ error: error, method: API_METHOD.GET_KEY })
      );
    }
  };
export const postCompany =
  (values: Company): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(fetchResourceStart({ method: API_METHOD.POST }));
      const resp = await apiUtil<Company>({
        endpoint: "Company",
        method: "POST",
        body: values,
      });
      if (resp.statusCode == 500) {
        dispatch(
          fetchResourceError({
            error: resp.error ?? resp.message ?? TOAST_MSG.ERR_MSG,
            method: API_METHOD.POST,
          })
        );
      } else if (resp.statusCode == 400) {
        dispatch(
          fetchResourceError({
            error: resp.error ?? resp.message,
            method: API_METHOD.POST,
          })
        );
      } else {
        dispatch(
          fetchResourceData({
            response: resp,
            method: API_METHOD.POST,
          })
        );
      }
    } catch (error) {
      dispatch(fetchResourceError({ error: error, method: API_METHOD.POST }));
    }
  };
export const patchCompany =
  ({ key, values }: { key: number; values: Company }): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(fetchResourceStart({ method: API_METHOD.PATCH }));
      const resp = await apiUtil<Company>({
        endpoint: `Company/${key}`,
        method: "PATCH",
        body: values,
      });
      if (resp.statusCode == 500) {
        dispatch(
          fetchResourceError({
            error: resp.error ?? resp.message ?? TOAST_MSG.ERR_MSG,
            method: API_METHOD.PATCH,
          })
        );
      } else if (resp.statusCode == 400) {
        dispatch(
          fetchResourceError({
            error: resp.error ?? resp.message,
            method: API_METHOD.PATCH,
          })
        );
      } else {
        dispatch(
          fetchResourceData({
            response: resp,
            method: API_METHOD.PATCH,
          })
        );
      }
    } catch (error) {
      fetchResourceError({ error: error, method: API_METHOD.PATCH });
    }
  };
export const deleteCompany =
  (key: number): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(fetchResourceStart({ method: API_METHOD.DELETE }));
      const resp = await apiUtil<Company>({
        endpoint: `Company/${key}`,
        method: "DELETE",
      });
      if (resp.statusCode == 500) {
        dispatch(
          fetchResourceError({
            error: resp.error ?? resp.message ?? TOAST_MSG.ERR_MSG,
            method: API_METHOD.DELETE,
          })
        );
      } else if (resp.statusCode == 400) {
        dispatch(
          fetchResourceError({
            error: resp.error ?? resp.message,
            method: API_METHOD.DELETE,
          })
        );
      } else {
        dispatch(
          fetchResourceData({
            response: resp,
            method: API_METHOD.DELETE,
          })
        );
      }
    } catch (error) {
      fetchResourceError({ error: error, method: API_METHOD.DELETE });
    }
  };
export const deleteCompanyList =
  (dataList: Company[]): AppThunk =>
  async (dispatch) => {
    if (dataList) {
      try {
        dispatch(fetchResourceStart({ method: API_METHOD.DELETE }));
        dataList.map(async (e) => {
          await apiUtil<Company>({
            endpoint: `Company/${e.id}`,
            method: "DELETE",
          });
        });

        dispatch(
          fetchResourceData({
            response: {
              timestamp: formatDate(new Date()),
              message: "Delete List Company Success",
            },
            method: API_METHOD.DELETE,
          })
        );
      } catch (error) {
        fetchResourceError({ error: error, method: API_METHOD.DELETE });
      }
    }
  };
