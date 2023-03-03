export enum SortDirection {
  asc = "asc",
  desc = "desc",
}

export interface ISortDto<T> {
  sort: SortDirection;
  sortBy: keyof T;
}
