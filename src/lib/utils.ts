import { ApiState, BaseResponse } from "@/interfaces/api";
import { PayloadAction } from "@reduxjs/toolkit";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
// export const setResponseApi = (
//   action: PayloadAction<BaseResponse<any>>
// ): ApiState<any> => {
//   return {
//     loading: false,
//     type: action.type.split("/")[1],
//     response: action.payload,
//   };
// };
