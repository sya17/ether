import { ApiState, BaseResponse } from "@/interfaces/api";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { formatDate } from "@/lib/date-util";
import { apiUtil } from "@/lib/api-util";
import { User } from "@/interfaces/user";

const initialState: ApiState<any> = {
  loading: false,
  response: null,
};

const createApiThunk = <T>(
  name: string,
  apiFunction: (params: any) => Promise<BaseResponse<T>>
) => createAsyncThunk(`api/${name}`, apiFunction);

export const getUser = createApiThunk(
  "get/user",
  ({ page, size }: { page: number; size: number }) =>
    apiUtil<User>({
      endpoint: "User",
      method: "GET",
      queryParams: { page, size, desc: "createdDate" },
    })
);
export const postUser = createApiThunk("post/user", (value: User) =>
  apiUtil<User>({
    endpoint: "User/register",
    method: "POST",
    body: value,
  })
);
export const patchUser = createApiThunk(
  "patch/user",
  ({ id, value }: { id: number; value: User }) =>
    apiUtil<User>({
      endpoint: "User/:id",
      method: "PATCH",
      pathParams: { id: id },
      body: value,
    })
);
export const deleteUser = createApiThunk("delete/user", (id: number) =>
  apiUtil<User>({
    endpoint: "User/:id",
    method: "DELETE",
    pathParams: { id: id },
  })
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    const handleAsyncAction = (action: any) => {
      builder
        .addCase(action.pending, (state) => {
          state.loading = true;
        })
        .addCase(
          action.fulfilled,
          (state, action: PayloadAction<BaseResponse<any>>) => {
            state.loading = false;
            state.response = action.payload;
          }
        )
        .addCase(action.rejected, (state, action) => {
          state.loading = false;
          state.response = {
            timestamp: formatDate(new Date()),
            error:
              action.payload instanceof Error
                ? action.payload.message
                : action.error,
          };
        });
    };

    handleAsyncAction(getUser);
    handleAsyncAction(postUser);
    handleAsyncAction(patchUser);
    handleAsyncAction(deleteUser);
  },
});

export default userSlice.reducer;
