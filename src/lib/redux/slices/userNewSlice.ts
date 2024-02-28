import { ApiState, BaseResponse } from "@/interfaces/api";
import { User } from "@/interfaces/user";
import { apiUtil } from "@/lib/api-util";
import {
  Draft,
  PayloadAction,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";

export enum ActionTypes {
  GET_ALL_REQUEST = "GET_ALL_REQUEST",
  GET_ALL_SUCCESS = "GET_ALL_SUCCESS",
  GET_ALL_FAILURE = "GET_ALL_FAILURE",
  GET_BY_ID_REQUEST = "GET_BY_ID_REQUEST",
  GET_BY_ID_SUCCESS = "GET_BY_ID_SUCCESS",
  GET_BY_ID_FAILURE = "GET_BY_ID_FAILURE",
}

const initialState: ApiState<any> = {
  loading: false,
  type: undefined,
  response: null,
};

const createApiThunk = <T>(
  name: string,
  apiFunction: (params: any) => Promise<BaseResponse<T>>
) => createAsyncThunk(`api/${name}`, apiFunction);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getAll: (
      state: Draft<typeof initialState>,
      action: PayloadAction<typeof initialState.response>
    ) => {
      state.loading = true;
      const getAll = ({
        page,
        size,
        sorting,
        pathParams,
        filters,
      }: {
        page: number;
        size: number;
        sorting: Record<string, string>;
        pathParams?: Record<string, any>;
        filters?: Record<string, any>;
      }) => {
        apiUtil<User>({
          endpoint: "User",
          method: "GET",
          queryParams: { page, size, sorting, filters },
          pathParams: pathParams,
        })
          .then((resp) => {
            state.loading = false;
            state.response = resp;
          })
          .catch((resp) => {
            state.loading = false;
            state.response = resp;
          });
      };
    },
  },
});

export const { getAll } = userSlice.actions;

export default userSlice.reducer;
