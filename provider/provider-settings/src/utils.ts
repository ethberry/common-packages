import { ISettings } from "./interfaces";

export const read = <T extends string>(key: string): ISettings<T> => {
  const data = localStorage.getItem(key);
  return data ? (JSON.parse(data) as ISettings<T>) : {};
};

export const save = <T extends string>(key: string, data: ISettings<T> | null): void => {
  const json = JSON.stringify(data);
  localStorage.setItem(key, json);
};
