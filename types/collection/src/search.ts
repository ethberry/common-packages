import { IPaginationDto } from "./pagination";

export interface ISearchDto extends IPaginationDto {
  query: string;
}

export interface ISearchable {
  title: string;
  description: string;
}
