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

export function successToast({
  toast,
  duration,
  description,
  title,
}: ToastState) {
  toast({
    title: title ? title : "Success!",
    description: description ?? "",
    duration: duration ?? 3000,
    variant: "success",
  });
}
export function errorToast({
  toast,
  duration,
  description,
  title,
}: ToastState) {
  toast({
    title: title ? title : "Error!",
    description: description ?? "",
    duration: duration ?? 3000,
    variant: "danger",
  });
}

export function warningToast({
  toast,
  duration,
  description,
  title,
}: ToastState) {
  toast({
    title: title ? title : "Warning!",
    description: description ?? "",
    duration: duration ?? 3000,
    variant: "warning",
  });
}

export function infoToast({ toast, duration, description, title }: ToastState) {
  toast({
    title: title ? title : "Info!",
    description: description ?? "",
    duration: duration ?? 3000,
    variant: "info",
  });
}

export function defaultToast({
  toast,
  duration,
  description,
  title,
}: ToastState) {
  toast({
    title: title ? title : "Default!",
    description: description ?? "",
    duration: duration ?? 3000,
    variant: "default",
  });
}

export function actionToast({
  toast,
  duration,
  description,
  title,
  action,
}: ToastState) {
  toast({
    title: title ? title : "Action!",
    description: description ?? "",
    duration: duration ?? 3000,
    variant: "default",
    action: action,
  });
}
