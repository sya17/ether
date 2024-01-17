import { ApiState, BaseResponse } from "@/interfaces/api";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { apiCall } from "../actions/apiActions";
import { formatDate } from "@/lib/date-util";

const initialState: ApiState<any> = {
  loading: false,
  response: null,
};

const apiSlice = createSlice({
  name: "main",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(apiCall.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        apiCall.fulfilled,
        (state, action: PayloadAction<BaseResponse<any>>) => {
          state.loading = false;
          state.response = action.payload;
        }
      )
      .addCase(apiCall.rejected, (state, action) => {
        state.loading = false;
        state.response = {
          timestamp: formatDate(new Date()),
          error:
            action.payload instanceof Error
              ? action.payload.message
              : action.error,
        };
      });
  },
});

export default apiSlice.reducer;
