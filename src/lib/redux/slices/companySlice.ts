import { ApiState, BaseResponse } from "@/interfaces/api";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { formatDate } from "@/lib/date-util";
import { apiUtil } from "@/lib/api-util";
import { Company } from "@/interfaces/company";

const initialState: ApiState<any> = {
  loading: false,
  response: null,
};

const createApiThunk = <T>(
  name: string,
  apiFunction: (params: any) => Promise<BaseResponse<T>>
) => createAsyncThunk(`api/${name}`, apiFunction);

export const getCompany = createApiThunk(
  "get/company",
  ({ page, size }: { page: number; size: number }) =>
    apiUtil<Company>({
      endpoint: "Company",
      method: "GET",
      queryParams: { page, size, desc: "createdDate" },
    })
);
export const postCompany = createApiThunk("post/company", (value: Company) =>
  apiUtil<Company>({
    endpoint: "Company/register",
    method: "POST",
    body: value,
  })
);

export const patchCompany = createApiThunk(
  "patch/company",
  ({ id, value }: { id: number; value: Company }) =>
    apiUtil<Company>({
      endpoint: "Company/:id",
      method: "PATCH",
      pathParams: { id: id },
      body: value,
    })
);

export const deleteCompany = createApiThunk("delete/company", (id: number) =>
  apiUtil<Company>({
    endpoint: "Company/:id",
    method: "DELETE",
    pathParams: { id: id },
  })
);

const companySlice = createSlice({
  name: "company",
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

    handleAsyncAction(getCompany);
    handleAsyncAction(postCompany);
    handleAsyncAction(patchCompany);
    handleAsyncAction(deleteCompany);
  },
});

export default companySlice.reducer;
