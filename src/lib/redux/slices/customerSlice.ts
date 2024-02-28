import { ApiState, BaseResponse } from "@/interfaces/api";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { formatDate } from "@/lib/date-util";
import { apiUtil } from "@/lib/api-util";
import { Customer } from "@/interfaces/customer";

const initialState: ApiState<any> = {
  loading: false,
  type: undefined,
  response: null,
};

const createApiThunk = <T>(
  name: string,
  apiFunction: (params: any) => Promise<BaseResponse<T>>
) => createAsyncThunk(`api/${name}`, apiFunction);

export const getCustomer = createApiThunk(
  "get/customer",
  ({ page, size }: { page: number; size: number }) =>
    apiUtil<Customer>({
      endpoint: "Customer",
      method: "GET",
      queryParams: { page, size, desc: "createdDate" },
    })
);
export const postCustomer = createApiThunk("post/customer", (value: Customer) =>
  apiUtil<Customer>({
    endpoint: "Customer",
    method: "POST",
    body: value,
  })
);

export const patchCustomer = createApiThunk(
  "patch/customer",
  ({ id, value }: { id: number; value: Customer }) =>
    apiUtil<Customer>({
      endpoint: "Customer/:id",
      method: "PATCH",
      pathParams: { id: id },
      body: value,
    })
);

export const deleteCustomer = createApiThunk("delete/customer", (id: number) =>
  apiUtil<Customer>({
    endpoint: "Customer/:id",
    method: "DELETE",
    pathParams: { id: id },
  })
);

const customerSlice = createSlice({
  name: "customer",
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

    handleAsyncAction(getCustomer);
    handleAsyncAction(postCustomer);
    handleAsyncAction(patchCustomer);
    handleAsyncAction(deleteCustomer);
  },
});

export default customerSlice.reducer;
