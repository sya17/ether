// import { ApiState, BaseResponse } from "@/interfaces/api";
// import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { formatDate } from "@/lib/date-util";
// import { apiUtil } from "@/lib/api-util";
// import { User } from "@/interfaces/user";
// import { API_TYPE } from "@/constant/common-constant";
// // import { setResponseApi } from "@/lib/utils";

// // const initialState: ApiState<any> = {
// //   loading: false,
// //   type: undefined,
// //   response: null,
// // };

// const initialState: ApiState<any> = {
//   loading: false,
//   type: undefined,
//   // response: null,
//   error: undefined,
//   data: undefined,
//   dataList: [],
//   page: {
//     pageNo: undefined,
//     pageRecords: undefined,
//     ttlPages: undefined,
//     ttlRecords: undefined,
//   },
// };

// const createApiThunk = <T>(
//   name: string,
//   apiFunction: (params: any) => Promise<BaseResponse<T>>
// ) => createAsyncThunk(`user/${name}`, apiFunction);

// export const getUser = createApiThunk(
//   API_TYPE.GET,
//   ({
//     page,
//     size,
//     sorting,
//     pathParams,
//     filters,
//   }: {
//     page: number;
//     size: number;
//     sorting: Record<string, string>;
//     pathParams?: Record<string, any>;
//     filters?: Record<string, any>;
//   }) =>
//     apiUtil<User>({
//       endpoint: "User",
//       method: "GET",
//       queryParams: { page, size, sorting, filters },
//       pathParams,
//     })
// );
// export const getUserById = createApiThunk(
//   API_TYPE.GET_KEY,
//   ({ id }: { id?: number }) =>
//     apiUtil<User>({
//       endpoint: `User/${id}`,
//       method: "GET",
//     })
// );
// export const postUser = createApiThunk(API_TYPE.POST, (value: User) =>
//   apiUtil<User>({
//     endpoint: "User",
//     method: "POST",
//     body: value,
//   })
// );
// export const patchUser = createApiThunk(
//   API_TYPE.PATCH,
//   ({ id, value }: { id: number; value: User }) =>
//     apiUtil<User>({
//       endpoint: `User/${id}`,
//       method: "PATCH",
//       body: value,
//     })
// );
// export const deleteUser = createApiThunk(API_TYPE.DELETE, (id: number) =>
//   apiUtil<User>({
//     endpoint: `User/${id}`,
//     method: "DELETE",
//   })
// );

// const userSlice = createSlice({
//   name: "user",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addMatcher(
//         (action) =>
//           [getUser, getUserById, postUser, patchUser, deleteUser].some(
//             (thunk) => thunk.pending.match(action)
//           ),
//         (state) => {
//           state.loading = true;
//         }
//       )
//       .addMatcher(
//         (action) => getUser.fulfilled.match(action),
//         (state, action: PayloadAction<BaseResponse<any>>) => {
//           state.loading = false;
//           state.type = action.type.split("/")[1];
//           state.dataList = action.payload.data;
//           state.page = {
//             pageNo: action.payload.pageNo,
//             pageRecords: action.payload.pageRecords,
//             ttlPages: action.payload.ttlPages,
//             ttlRecords: action.payload.ttlRecords,
//           };
//         }
//       )
//       .addMatcher(
//         (action) => getUserById.fulfilled.match(action),
//         (state, action: PayloadAction<BaseResponse<any>>) => {
//           state.loading = false;
//           state.type = action.type.split("/")[1];
//           state.data = action.payload.data;
//           state.page = {
//             pageNo: action.payload.pageNo,
//             pageRecords: action.payload.pageRecords,
//             ttlPages: action.payload.ttlPages,
//             ttlRecords: action.payload.ttlRecords,
//           };
//         }
//       )
//       .addMatcher(
//         (action) => postUser.fulfilled.match(action),
//         (state, action: PayloadAction<BaseResponse<any>>) => {
//           state.loading = false;
//           state.type = action.type.split("/")[1];
//           state.data = action.payload.data;
//           state.page = {
//             pageNo: action.payload.pageNo,
//             pageRecords: action.payload.pageRecords,
//             ttlPages: action.payload.ttlPages,
//             ttlRecords: action.payload.ttlRecords,
//           };
//         }
//       )
//       .addMatcher(
//         (action) => patchUser.fulfilled.match(action),
//         (state, action: PayloadAction<BaseResponse<any>>) => {
//           state.loading = false;
//           state.type = action.type.split("/")[1];
//           state.data = action.payload.data;
//           state.page = {
//             pageNo: action.payload.pageNo,
//             pageRecords: action.payload.pageRecords,
//             ttlPages: action.payload.ttlPages,
//             ttlRecords: action.payload.ttlRecords,
//           };
//         }
//       )
//       .addMatcher(
//         (action) => deleteUser.fulfilled.match(action),
//         (state, action: PayloadAction<BaseResponse<any>>) => {
//           state.loading = false;
//           state.type = action.type.split("/")[1];
//           state.data = action.payload.data;
//           state.page = {
//             pageNo: action.payload.pageNo,
//             pageRecords: action.payload.pageRecords,
//             ttlPages: action.payload.ttlPages,
//             ttlRecords: action.payload.ttlRecords,
//           };
//         }
//       )
//       .addMatcher(
//         (action) =>
//           [getUser, getUserById, postUser, patchUser, deleteUser].some(
//             (thunk) => thunk.rejected.match(action)
//           ),
//         (state, action: PayloadAction<BaseResponse<any>>) => {
//           state.loading = false;
//           state.type = action.type.split("/")[1];
//           state.error = {
//             timestamp: formatDate(new Date()),
//             error:
//               action.payload instanceof Error
//                 ? action.payload.message
//                 : action.payload.error,
//           };
//         }
//       );
//   },
// });

// export default userSlice.reducer;
