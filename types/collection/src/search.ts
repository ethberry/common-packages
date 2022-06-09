import { IPaginationDto } from "./pagination";
import { IIdDateBase } from "./base";

export interface ISearchDto extends IPaginationDto {
  query: string;
}

export interface ISearchable extends IIdDateBase {
  title: string;
  description: string;
}
