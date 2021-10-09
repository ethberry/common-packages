import { ISearchDto } from "./search";

export enum SortDirection {
  asc = "asc",
  desc = "desc",
}

export interface ISortDto<T> extends ISearchDto {
  sort: SortDirection;
  sortBy: keyof T;
}
