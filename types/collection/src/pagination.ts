export interface IPaginationDto {
  skip: number;
  take: number;
}

export interface IPaginationResult<T> {
  rows: Array<T>;
  count: number;
}
