export interface getAllRequest {
  page: number;
  size: number;
  sorting?: Record<string, string>;
  pathParams?: Record<string, any>;
  filters?: Record<string, any>;
}
