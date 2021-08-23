import { createContext } from "react";

type TMethods = "POST" | "GET" | "PUT" | "DELETE" | "PATCH";

export interface IPayload {
  [key: string]: any;
}

export interface IFetchProps {
  url: string;
  method?: TMethods;
  data?: IPayload | FormData;
}

export interface IApiContext<T extends any> {
  fetchJson: (data: IFetchProps) => Promise<any>;
  fetchFile: (data: IFetchProps) => Promise<void>;
  setToken: (jwt: T | null) => void;
  getToken: () => T | null;
}

export const ApiContext = createContext<IApiContext<any>>(undefined!);
