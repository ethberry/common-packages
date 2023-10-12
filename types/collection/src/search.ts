import { IPaginationDto } from "./pagination";
import { IIdDateBase } from "./base";

export interface ISearchDto extends IPaginationDto {
  query: string;
}

export interface ISearchableDto {
  title: string;
  description: string;
}

export interface ISearchable extends ISearchableDto, IIdDateBase {}

export enum InputType {
  awaited = "awaited",
}
