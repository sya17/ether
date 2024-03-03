import { User } from "@/interfaces/user";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../store";
import { apiUtil } from "@/lib/api-util";
import {
  BaseResponse,
  ResourceState,
  defaultIntialState,
} from "@/interfaces/api";
import { getAllRequest } from "@/interfaces/request-interface";
import { API_METHOD, TOAST_MSG } from "@/constant/common-constant";
import { STATUS_CODES } from "http";
import { formatDate } from "@/lib/date-util";

const initialState: ResourceState<User> = defaultIntialState<User>();

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
      action: PayloadAction<{ response: BaseResponse<User[]> }>
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
      action: PayloadAction<{ response: BaseResponse<User>; method: string }>
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
      action: PayloadAction<{ error: User | any; method: string }>
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
      state.getAll = defaultIntialState<User>().getAll;
    },
    clearGetKey(state) {
      state.getKey = defaultIntialState<User>().getKey;
    },
    clearPost(state) {
      state.post = defaultIntialState<User>().post;
    },
    clearPatch(state) {
      state.patch = defaultIntialState<User>().patch;
    },
    clearPut(state) {
      state.put = defaultIntialState<User>().put;
    },
    clearDelete(state) {
      state.delete = defaultIntialState<User>().delete;
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

export const selectGetAll = (state: RootState) => state.apiUser.getAll;
export const selectGetKey = (state: RootState) => state.apiUser.getKey;
export const selectPost = (state: RootState) => state.apiUser.post;
export const selectPatch = (state: RootState) => state.apiUser.patch;
export const selectPut = (state: RootState) => state.apiUser.put;
export const selectDelete = (state: RootState) => state.apiUser.delete;

export default userSlice.reducer;

export const getUser =
  (req: getAllRequest): AppThunk =>
  async (dispatch) => {
    dispatch(fetchResourceStart({ method: API_METHOD.GET }));
    try {
      const resp = await apiUtil<User>({
        endpoint: "User",
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

export const getUserByKey =
  (key: number): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(fetchResourceStart({ method: API_METHOD.GET_KEY }));
      const resp = await apiUtil<User>({
        endpoint: `User/${key}`,
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
export const postUser =
  (values: User): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(fetchResourceStart({ method: API_METHOD.POST }));
      const resp = await apiUtil<User>({
        endpoint: "User",
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
export const patchUser =
  ({ key, values }: { key: number; values: User }): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(fetchResourceStart({ method: API_METHOD.PATCH }));
      const resp = await apiUtil<User>({
        endpoint: `User/${key}`,
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
export const deleteUser =
  (key: number): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(fetchResourceStart({ method: API_METHOD.DELETE }));
      const resp = await apiUtil<User>({
        endpoint: `User/${key}`,
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
export const deleteUserList =
  (dataList: User[]): AppThunk =>
  async (dispatch) => {
    if (dataList) {
      try {
        dispatch(fetchResourceStart({ method: API_METHOD.DELETE }));
        dataList.map(async (e) => {
          await apiUtil<User>({
            endpoint: `User/${e.id}`,
            method: "DELETE",
          });
        });

        dispatch(
          fetchResourceData({
            response: {
              timestamp: formatDate(new Date()),
              message: "Delete List User Success",
            },
            method: API_METHOD.DELETE,
          })
        );
      } catch (error) {
        fetchResourceError({ error: error, method: API_METHOD.DELETE });
      }
    }
  };
