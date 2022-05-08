import { IPaginationDto } from "./pagination";
import { IIdBase } from "./base";

export interface ISearchDto extends IPaginationDto {
  query: string;
}

export interface ISearchable extends IIdBase {
  title: string;
  description: string;
}
