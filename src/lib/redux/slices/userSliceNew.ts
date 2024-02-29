import { User } from "@/interfaces/user";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../store";
import { apiUtil } from "@/lib/api-util";
import { BaseResponse, ResourceState } from "@/interfaces/api";
import { getAllRequest } from "@/interfaces/request-interface";

const initialState: ResourceState<User> = {
  page: {},
  dataList: [],
  selectedResource: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    fetchResourceStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchResourceSuccess(state, action: PayloadAction<BaseResponse<User[]>>) {
      state.loading = false;
      state.dataList = action.payload.data!;
      state.page = {
        pageNo: action.payload.pageNo,
        pageRecords: action.payload.pageRecords,
        ttlPages: action.payload.ttlPages,
        ttlRecords: action.payload.ttlRecords,
      };
    },
    fetchResourceFailure(state, action: PayloadAction<any>) {
      state.loading = false;
      state.error = action.payload;
    },
    setSelectedResource(state, action: PayloadAction<User>) {
      state.selectedResource = action.payload;
    },
    clearSelectedResource(state) {
      state.selectedResource = null;
    },
    // Tambahkan reducers lain untuk operasi CRUD lainnya
  },
});

export const {
  fetchResourceStart,
  fetchResourceSuccess,
  fetchResourceFailure,
  setSelectedResource,
  clearSelectedResource,
  // Tambahkan nama reducers lainnya di sini
} = userSlice.actions;

export const selectResourceData = (state: RootState) => state.apiUser.dataList;
export const selectResourcePage = (state: RootState) => state.apiUser.page;
export const selectSelectedResource = (state: RootState) =>
  state.apiUser.selectedResource;
export const selectResourceLoading = (state: RootState) =>
  state.apiUser.loading;
export const selectResourceError = (state: RootState) => state.apiUser.error;

export default userSlice.reducer;

export const getUser =
  (req: getAllRequest): AppThunk =>
  async (dispatch) => {
    try {
      const resp = await apiUtil<User>({
        endpoint: "User",
        method: "GET",
        queryParams: {
          page: req.page,
          size: req.size,
          sorting: req.sorting,
          filters: req.filters,
        },
        pathParams: req.pathParams,
      });
      dispatch(fetchResourceSuccess(resp));
    } catch (error) {
      dispatch(fetchResourceFailure(error));
    }
  };

export const getUserByKey =
  (key: number): AppThunk =>
  async (dispatch) => {
    try {
      const resp = await apiUtil<User>({
        endpoint: `User/${key}`,
        method: "GET",
      });
      dispatch(setSelectedResource(resp.data));
    } catch (error) {
      dispatch(fetchResourceFailure(error));
    }
  };
export const postUser =
  (values: User): AppThunk =>
  async (dispatch) => {
    try {
      const resp = await apiUtil<User>({
        endpoint: "User",
        method: "POST",
        body: values,
      });
    } catch (error) {
      dispatch(fetchResourceFailure(error));
    }
  };
export const patchUser =
  ({ key, values }: { key: number; values: User }): AppThunk =>
  async (dispatch) => {
    try {
      const resp = await apiUtil<User>({
        endpoint: `User/${key}`,
        method: "PATCH",
        body: values,
      });
    } catch (error) {
      dispatch(fetchResourceFailure(error));
    }
  };
export const deleteUser =
  (key: number): AppThunk =>
  async (dispatch) => {
    try {
      const resp = await apiUtil<User>({
        endpoint: `User/${key}`,
        method: "DELETE",
      });
    } catch (error) {
      dispatch(fetchResourceFailure(error));
    }
  };
