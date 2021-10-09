import { IPaginationDto } from "./pagination";

export interface ISearchDto extends IPaginationDto {
  query: string;
}
