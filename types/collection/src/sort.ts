export enum SortDirection {
  asc = "asc",
  desc = "desc",
}

export interface ISortDto<T> {
  field: keyof T;
  sort: SortDirection;
}

export interface IMuiSortDto<T> {
  order?: Array<ISortDto<T>>;
}
