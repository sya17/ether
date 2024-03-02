interface ToastState {
  toast: Function;
  duration?: number;
  title?: string;
  description?: string;
  classname?: string;
  action?: React.ReactNode;
}
