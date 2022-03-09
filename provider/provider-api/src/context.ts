import { createContext } from "react";
import { IJwt } from "@gemunion/types-jwt";

type TMethods = "POST" | "GET" | "PUT" | "DELETE" | "PATCH";

export interface IPayload {
  [key: string]: any;
}

export interface IFetchProps {
  url: string;
  method?: TMethods;
  data?: IPayload | FormData;
}

export interface IApiContext {
  fetchJson: (data: IFetchProps) => Promise<any>;
  fetchFile: (data: IFetchProps) => Promise<void>;
  setToken: (jwt: IJwt | null) => void;
  getToken: () => IJwt | null;
  isAccessTokenExpired: () => boolean;
  isRefreshTokenExpired: () => boolean;
  refreshToken: () => Promise<any> | void;
}

export const ApiContext = createContext<IApiContext>(undefined!);
