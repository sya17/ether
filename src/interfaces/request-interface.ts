export interface getAllRequest {
  page: number;
  size: number;
  // sorting?: Record<string, string>;
  asc?: string[];
  desc?: string[];
  pathParams?: Record<string, any>;
  filter?: FilterRequest[];
}

export interface FilterRequest {
  group?: FilterRequest[];
  operator: string;
  connector: string;
  keySearch: string;
  value: any;
}
